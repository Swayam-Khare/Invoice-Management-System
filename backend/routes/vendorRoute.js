const express = require("express");
const vendorController = require("../controllers/vendorController");
const authController = require("../controllers/authController");

const router = express.Router();

router.route("/").post(vendorController.createVendor).get(vendorController.getAllVendors);

router.route("/:id").get(vendorController.getASpecificVendor).delete(vendorController.deleteVendor).patch(vendorController.updateVendor);
module.exports = router;
