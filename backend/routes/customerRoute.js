const express = require("express");
const customerController = require("../controllers/customerController");
const authController = require("../controllers/authController");

const router = express.Router();

router
    .route("/")
    .post(authController.protect, customerController.createCustomer)
    .get(authController.protect, customerController.getAllCustomers)

router
    .route("/:id")
    .get(authController.protect, customerController.getCustomer)
    .patch(authController.protect, customerController.updateCustomer)
    .delete(authController.protect, customerController.deleteCustomer);

module.exports = router;