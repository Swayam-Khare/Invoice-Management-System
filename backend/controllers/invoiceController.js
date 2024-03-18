const { db } = require("../models/connection");
const asyncErrorHandler = require('../utils/asyncErrorHandler');
const CustomError = require('../utils/customError');

const Invoice = db.Invoice;


// ================== FOR GETTING ALL INVOCIES ==========
exports.getInvoices = asyncErrorHandler(async (req, res, next) => {

  const invoices = await Invoice.findAll({});

  res.status(200).json({
    status: 'success',
    count: invoices.length,
    data: {
      invoices
    }
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

  // ------------- CREATING INVOICE NUMBER ------------- //

  const { customer_details } = req.body;
  const vendor = req.vendor;

  // 1. creating invoice id
  const invoice_id = '#' + vendor.firstName[0].toUpperCase() + vendor.lastName[0].toUpperCase() + customer_details.firstName[0].toUpperCase() + customer_details.lastName[0].toUpperCase()

  // 2. creating invoice no
  const lastInvoiceDetails = await Invoice.findOne({
    attributes: [[db.Sequelize.fn('MAX', db.Sequelize.col('invoice_no')), 'max_inv_no']]
  })

  const lastInvoiceNo = lastInvoiceDetails.dataValues.max_inv_no
  const unstructured_invoice_no = String((lastInvoiceNo * 1) + 1);

  const invoice_no = unstructured_invoice_no.padStart(7, '0');
  // -------- Invoice Number created -----------------//

  // const Invoice = await Invoice.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      invoice_id,
      invoice_no
    },
  });
});

// =============== FOR UPDATING THE INVOICE OF THE GIVEN ID ===========

exports.updateInvoice = asyncErrorHandler(async (req, res, next) => {
  const [updatedInvoice] = await Invoice.update(req.body, {
    where: {
      id: req.params.invoice_id,
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