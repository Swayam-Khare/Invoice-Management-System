const { db } = require("../models/connection");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const CustomError = require("../utils/customError");
const { Op } = require("sequelize");
const apiFeatures = require("../utils/apiFeatures");
const Invoice = db.Invoice;

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

//
