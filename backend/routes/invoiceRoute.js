const express = require('express');

const invoiceController = require('./../controllers/invoiceController');


const router = express.Router();


router.route('/')
    .get(invoiceController.getInvoices)
    .post(invoiceController.addInvoice);

router.route('/:invoice_id')
    .get(invoiceController.getInvoice)
    .patch(invoiceController.updateInvoice)
    .delete(invoiceController.deleteInvoice);

module.exports = router;