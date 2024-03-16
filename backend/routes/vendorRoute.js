const express = require("express");
const vendorController = require("../controllers/vendorController");
const authController = require("../controllers/authController");

const router = express.Router();

router.route("/").post(vendorController.createVendor).get(vendorController.getAllVendors);

router
  .route("/:id")
  .get(vendorController.getASpecificVendor)
  .delete(authController.protect, vendorController.deleteVendor)
  .patch(authController.protect, vendorController.updateVendor)
  .patch(authController.protect, vendorController.updatePassword);
module.exports = router;
