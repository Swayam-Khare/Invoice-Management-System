const express = require("express");

// const invoiceController = require("./../controllers/invoiceController");
const dashboardController = require("./../controllers/dashboardController");
const authController = require("../controllers/authController");

const router = express.Router();

router.route("/totalIncome").get(authController.protect, dashboardController.getTotalIncome_paidInvoices);
router.route("/totalInvoices").get(authController.protect, dashboardController.getTotalInvoice_dueAndOvedueInvoices);
// .post(authController.protect, authController.restrict('vendor'), invoiceController.addInvoice);

// router
//   .route("/:invoice_id")
//   .get(authController.protect, invoiceController.getInvoice)
//   .patch(authController.protect, invoiceController.updateInvoice)
//   .delete(authController.protect, invoiceController.deleteInvoice);

module.exports = router;
