const { db } = require("../models/connection");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const CustomError = require("../utils/customError");
const getInvoice = require("./../utils/getInvoiceNumber");
const getTransaction = require("./../utils/getTransactionId");


const Invoice = db.Invoice;

// ================== FOR GETTING ALL INVOCIES ==========
exports.getInvoices = asyncErrorHandler(async (req, res, next) => {
  const invoices = await Invoice.findAll({});

  res.status(200).json({
    status: "success",
    count: invoices.length,
    data: {
      invoices,
    },
  });
});

// ===================== FOR GETTING INVOICE BY ID ==========
exports.getInvoice = asyncErrorHandler(async (req, res, next) => {
  const invoice = await Invoice.findOne({
    where: {
      invoice_id: req.params.invoice_id,
    },
  });

  if (!invoice) {
    const err = new CustomError(
      `Invoice with Id ${req.params.invoice_id} is not found`,
      404
    );
    return next(err);
  }

  res.status(200).json({
    status: "success",
    data: {
      invoice,
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
    const result = await db.connectDB.transaction(async (t) => {

      const existingCustomer = await db.Customer.findOne({
        where: {
          email: customer_details.email,
        }
      });

      let customer;

      if (!existingCustomer) {
        customer = await db.Customer.create({
          firstName: customer_details.firstName,
          lastName: customer_details.lastName,
          email: customer_details.email,
          contact: customer_details.contact,
          Address_Details,

        }, {
          include: [db.customerAddress],
          transaction: t
        });
      }
      else {
        customer = { id: existingCustomer.id }
      }





      const invoice = await db.Invoice.create({
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
          quantity: order_details.quantity
        }
      }, {
        include: [db.invoiceOrder],
        transaction: t
      })

    });
  } catch (err) {
    const error = new CustomError(err.message, 400);
    next(error);
  }

  return res.status(201).json({
    status: "success",
    data: {
      invoice_no,
    },
  });
});

// =============== FOR UPDATING STATUS THE INVOICE OF THE GIVEN ID ===========

exports.updateInvoice = asyncErrorHandler(async (req, res, next) => {

  const status = req.body.status;
  let transaction_no;
  if (status.toLowerCase() === 'paid') {
    transaction_no = getTransaction.uniqueTransaction();
  } else {
    transaction_no = null;
  }

  const updatedInvoice = await Invoice.update({ status: req.body.status, transaction_no }, {
    where: {
      id: req.params.invoice_id,
      VendorId: req.vendor.id,
    },
  });

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
