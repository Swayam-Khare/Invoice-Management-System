const express = require("express");
const addressController = require("./../controllers/addressController");

const router = express.Router();

router.route("/").get(authController.protect, addressController.getAddresses).post(authController.protect, addressController.addAddress);

router
  .route("/:addressId")
  .get(authController.protect, addressController.getAddress)
  .patch(authController.protect, addressController.updateAddress)
  .delete(authController.protect, addressController.deleteAddress);

router.route("/:role/:roleId").get(authController.protect, addressController.getAddressByRole);
