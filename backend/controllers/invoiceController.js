const { db } = require("../models/connection");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const CustomError = require("../utils/customError");
const getInvoice = require("./../utils/getInvoiceNumber");
const getTransaction = require("./../utils/getTransactionId");
const { Op, where } = require("sequelize");
const apiFeatures = require("../utils/apiFeatures");
const nodemailer = require("nodemailer");

const {
  Invoice,
  Order,
  Customer,
  connectDB,
  invoiceOrder,
  customerAddress,
  Address,
  Product,
  VendorCustomer,
  VendorProduct,
} = db;

// ================== FOR GETTING ALL INVOCIES ==========
exports.getInvoices = asyncErrorHandler(async (req, res, next) => {
  let status = [];
  if (!req.query.status) {
    status = ["paid", "due", "overdue"];
  } else {
    status = [req.query.status];
  }

  let orderBy;
  let orderByCustomer;
  let limitFields = null;
  let offset = null;
  const limit = req.query.limit || 10;
  let search = req.query.search || "%";
  if (req.query.sort) {
    orderBy = apiFeatures.sorting(req.query.sort);
  } else {
    orderBy = apiFeatures.sorting("-updatedAt");
  }
  if (req.query.fields) {
    limitFields = apiFeatures.limitFields(req.query.fields);
  }
  if (req.query.page) {
    offset = apiFeatures.paginate(req.query.page, limit, next);
  }
  if (req.query.search) {
    search = apiFeatures.search(search);
  }

  if (orderBy[0][0].startsWith("Customer")) {
    orderByCustomer = [["firstName", ["DESC"]]];
    orderBy = undefined;
  }

  // const attributes = limitFields ? limitFields : ["id", "invoice_no", "transaction_no", "due_date", "purchase_date", "status", "total"];
  const invoices = await Invoice.findAll({
    include: [
      {
        model: Order,
        as: "Order_Details",
      },
      {
        model: Customer,
        paranoid: false,
        include: [
          {
            model: Address,
            as: "Address_Details",
          },
        ],
        order: orderByCustomer,
      },
    ],
    where: {
      status: {
        [Op.in]: status,
      },
      invoice_no: {
        [Op.iLike]: "#" + search,
      },
      VendorId: req.vendor.id,
    },
    order: orderBy,
    attributes: limitFields,
    offset: offset,
    limit: limit,
  });

  const totalRows = await Invoice.findAndCountAll({
    where: {
      status: {
        [Op.in]: status,
      },
      invoice_no: {
        [Op.iLike]: "#" + search,
      },
      VendorId: req.vendor.id,
    },
  });

  res.status(200).json({
    status: "success",
    count: invoices.length,
    data: {
      invoices,
      totalRows,
    },
  });
});

// ===================== FOR GETTING INVOICE BY ID ==========
exports.getInvoice = asyncErrorHandler(async (req, res, next) => {
  let invoice = await Invoice.findOne({
    where: {
      id: req.params.invoice_id,
    },
    include: [
      {
        model: Order,
        as: "Order_Details",
      },
      {
        model: Customer,
      },
    ],
  });

  if (!invoice) {
    const err = new CustomError(
      `Invoice with Id ${req.params.invoice_id} is not found`,
      404
    );
    return next(err);
  }

  const address = await Address.findOne({
    where: {
      role: "customer",
      roleId: invoice.Customer.id,
    },
  });

  const id = invoice.dataValues.Order_Details.productId;

  const products = await Product.findAll({
    where: {
      id: {
        [Op.in]: id,
      },
    },
  });

  invoice.dataValues["Address"] = address.dataValues;
  invoice.dataValues["Products"] = products.map((product) => {
    return product.dataValues;
  });

  res.status(200).json({
    status: "success",
    data: {
      invoice: invoice,
    },
  });
});

// ================= FOR CREATING A NEW INVOICE ===============

exports.addInvoice = asyncErrorHandler(async (req, res, next) => {
  const {
    // invoice_no,
    customer_details,
    Address_Details,
    due_date,
    purchase_date,
    // transaction_no,
    tax,
    delivery_charge,
    status,
    subtotal,
    total,
    penalty,
    notes,
    discount,
    order_details,
  } = req.body;

  const vendor = req.vendor;

  // -------- Invoice Number created -----------------//

  let transaction_no;
  const invoice_no = getInvoice.uniqueInvoice();

  // Generating unique transaction Id for paid bills
  if (status.toLowerCase() === "paid") {
    transaction_no = getTransaction.uniqueTransaction();
  } else {
    transaction_no = null;
  }

  try {
    const result = await connectDB.transaction(async (t) => {
      const existingCustomer = await Customer.findOne({
        where: {
          email: customer_details.email,
        },
        paranoid: false,
      });

      let customer;

      if (!existingCustomer) {
        customer = await Customer.create(
          {
            firstName: customer_details.firstName,
            lastName: customer_details.lastName,
            email: customer_details.email,
            contact: customer_details.contact,
            Address_Details,
          },
          {
            include: [customerAddress],
            transaction: t,
          }
        );
        const venCust = await VendorCustomer.create(
          {
            VendorId: req.vendor.id,
            CustomerId: customer.id,
          },
          {
            transaction: t,
          }
        );
      } else {
        // check if deleted then restore
        if (existingCustomer.deletedAt) {
          await Customer.restore({
            where: {
              id: existingCustomer.id,
            },
            transaction: t,
          });
          await Address.restore({
            where: {
              [Op.and]: {
                roleId: existingCustomer.id,
                role: "customer",
              },
            },
            transaction: t,
          });
          await VendorCustomer.restore({
            where: {
              VendorId: req.vendor.id,
              CustomerId: existingCustomer.id,
            },
            transaction: t,
          });
        }
        customer = { id: existingCustomer.id };
      }

      const oldStock = await VendorProduct.findAll({
        where: {
          VendorId: req.vendor.id,
          ProductId: order_details.productId,
        },
      });

      for (let index = 0; index < order_details.productId.length; index++) {
        const indexOfQuantity = order_details.productId.findIndex(
          (t) => t === oldStock[index].ProductId
        );
        oldStock[index].stock -= order_details.quantity[indexOfQuantity];
      }

      let updateStock;
      for (let index = 0; index < order_details.productId.length; index++) {
        updateStock = await VendorProduct.update(
          { stock: oldStock[index].stock },
          {
            where: {
              ProductId: oldStock[index].ProductId,
            },
            transaction: t,
          }
        );
      }

      const invoice = await Invoice.create(
        {
          invoice_no,
          transaction_no,
          due_date,
          purchase_date,
          tax,
          delivery_charge,
          status,
          subtotal,
          total,
          penalty,
          notes,
          discount,
          VendorId: req.vendor.id,
          CustomerId: customer.id,
          Order_Details: {
            invoiceNo: invoice_no,
            productId: order_details.productId,
            quantity: order_details.quantity,
          },
        },
        {
          include: [invoiceOrder],
          transaction: t,
        }
      );
    });
  } catch (err) {
    const error = new CustomError(err.message, 400);
    return next(error);
  }

  return res.status(201).json({
    status: "success",
    message: "Invoice has been created successfully with ID: " + invoice_no,
    data: {
      invoice_no,
    },
  });
});

// =============== FOR UPDATING STATUS THE INVOICE OF THE GIVEN ID ===========

exports.updateInvoice = asyncErrorHandler(async (req, res, next) => {
  const status = req.body.status;
  let transaction_no;
  if (status.toLowerCase() === "paid") {
    transaction_no = getTransaction.uniqueTransaction();
  } else {
    transaction_no = null;
  }

  const updatedInvoice = await Invoice.update(
    { status: req.body.status, transaction_no },
    {
      where: {
        id: req.params.invoice_id,
        VendorId: req.vendor.id,
      },
    }
  );

  if (updatedInvoice === 0) {
    const err = new CustomError(
      `Invoice with Id ${req.params.invoice_id} is not found`,
      404
    );
    return next(err);
  }

  const invoice = await Invoice.findByPk(req.params.invoice_id);

  res.status(200).json({
    status: "success",
    data: {
      invoice,
    },
  });
});

// ==================== FOR DELETING THE INVOICE OF THE GIVEN ID  =================

exports.deleteInvoice = asyncErrorHandler(async (req, res, next) => {
  const deletedInvoice = await Invoice.destroy({
    where: {
      id: req.params.invoice_id,
    },
  });

  if (deletedInvoice === 0) {
    const err = new CustomError(
      `Invoice with Id ${req.params.invoice_id} is not found`,
      404
    );
    return next(err);
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});

// ==================== FOR GENERATING PDF OF THE INVOICE =================

exports.generatePDF = asyncErrorHandler(async (req, res, next) => {
  const email = req.body.email;
  const name = req.body.name;

  // CREATE A TRANSPORTER
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // DEFINE EMAIL OPTIONS
    const emailOptions = {
      from: "IMS support<support@ims.com>",
      to: email,
      subject: "Invoice pdf file",
      text: `Dear ${name}!,\n\n PFA your invoice pdf file`,
      attachments: [
        {
          filename: req.file.filename,
          path: `${__dirname}\\..\\${req.file.path}`,
          contentType: "application/pdf",
        },
      ],
    };
    await transporter.sendMail(emailOptions);
  } catch (error) {
    return next(new CustomError("Email could not be sent", 500));
  }

  res.status(200).json({
    status: "success",
    message: "Mail sent successfully",
  });
});
