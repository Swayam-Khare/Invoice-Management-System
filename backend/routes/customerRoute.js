const express = require("express");
const customerController = require("../controllers/customerController");
const authController = require("../controllers/authController");

const router = express.Router();

router
    .route("/")
    .post(authController.protect, authController.restrict("vendor"), customerController.createCustomer)
    .get(authController.protect, authController.restrict("vendor"), customerController.getAllCustomers)

router
    .route("/:id")
    .get(authController.protect, authController.restrict("vendor"), customerController.getCustomer)
    .patch(authController.protect, authController.restrict("vendor"), customerController.updateCustomer)
    .delete(authController.protect, authController.restrict("vendor"), customerController.deleteCustomer);

module.exports = router;