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
    const Invoice = await Invoice.create(req.body);
  
    res.status(201).json({
      status: "success",
      data: {
        Invoice,
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