const express = require("express");
const vendorController = require("../controllers/vendorController");
const authController = require("../controllers/authController");

const router = express.Router();

router.route("/").get(authController.protect,authController.restrict("admin"), vendorController.getAllVendors).post(vendorController.createVendor);

router
  .route("/:id")
  .get(
    authController.protect,
    authController.restrict("admin"),
    vendorController.getASpecificVendor
  )
  .delete(authController.protect, vendorController.deleteVendor)
  .patch(authController.protect, authController.restrict("vendor"), vendorController.updateVendor);

router
  .route("/updatepassword/:id")
  .patch(authController.protect, vendorController.updatePassword);

module.exports = router;
