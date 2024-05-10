const express = require("express");
const upload = require("./../utils/multer");

const invoiceController = require("./../controllers/invoiceController");
const authController = require("../controllers/authController");

const router = express.Router();

router.route("/pdf").post(authController.protect, upload.single('file'), invoiceController.generatePDF);

router.route("/").get(authController.protect, invoiceController.getInvoices).post(authController.protect, authController.restrict('vendor'), invoiceController.addInvoice);

router
  .route("/:invoice_id")
  .get(authController.protect, invoiceController.getInvoice)
  .patch(authController.protect, invoiceController.updateInvoice)
  .delete(authController.protect, invoiceController.deleteInvoice);

module.exports = router;
