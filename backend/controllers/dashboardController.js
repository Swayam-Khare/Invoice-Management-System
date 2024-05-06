const { db } = require("../models/connection");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const CustomError = require("../utils/customError");
const { Op } = require("sequelize");
const apiFeatures = require("../utils/apiFeatures");
// const Invoice = db.Invoice;
const { Invoice, Order, Customer, Address } = db;
// ====================================== for getting total income ==================================[]
exports.getTotalIncome_paidInvoices = asyncErrorHandler(async (req, res, next) => {
  let status = ["paid"];
  let invoices;
  let paidInvoices;
  try {
    invoices = await Invoice.findAll({
      where: {
        status: {
          [Op.in]: status,
        },
        VendorId: req.vendor.id,
      },
    });
    paidInvoices = invoices.length;
  } catch (err) {
    next(new CustomError("Something went wrong!", 404));
  }
  const grandTotal = invoices.reduce((sum, invoice) => {
    return sum + parseFloat(invoice.total);
  }, 0);
  res.status(200).json({
    status: "success",
    data: {
      paidInvoices,
      grandTotal,
    },
  });
});

// ======================================================

exports.getRecentInvoices = asyncErrorHandler(async (req, res, next) => {
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

// ===================================== getting total invoices and Due and Overdue============================

exports.getTotalInvoice_dueAndOvedueInvoices = asyncErrorHandler(async (req, res, next) => {
  let status = ["due", "overdue", "paid"];
  try {
    totalInvoices = await Invoice.findAll({
      where: {
        status: {
          [Op.in]: status,
        },
        VendorId: req.vendor.id,
      },
    });
    let filterdue = ["due"];
    dueInvoices = await Invoice.findAll({
      where: {
        status: {
          [Op.in]: filterdue,
        },
        VendorId: req.vendor.id,
      },
    });
    let filteroverdue = ["overdue"];
    overdueInvoices = await Invoice.findAll({
      where: {
        status: {
          [Op.in]: filteroverdue,
        },
        VendorId: req.vendor.id,
      },
    });
  } catch (err) {
    next(new CustomError("Something went wrong!", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      totalInvoices: totalInvoices.length,
      dueInvoices: dueInvoices.length,
      overdueInvoices: overdueInvoices.length,
    },
  });
});
