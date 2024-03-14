const express = require("express");
const addressController = require("./../controllers/addressController");

const router = express.Router();

router
  .route("/")
  .get(addressController.getAddresses)
  .post(addressController.addAddress);

router
  .route("/:addressId")
  .get(addressController.getAddress)
  .patch(addressController.updateAddress)
  .delete(addressController.deleteAddress);

router.route("/:role/:roleId")
  .get(addressController.getAddressByRole);
