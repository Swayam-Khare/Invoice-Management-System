const express = require("express");
const vendorController = require("../controllers/vendorController");
const router = express.Router();

router.route("/vendors").
post(vendorController.createVendor)
.get(vendorController.getAllVendors);

router.route('/vendor/:id').
get(vendorController.getASpecificVendor)
.delete(vendorController.deleteVendor)
.patch(vendorController.updateVendor);
module.exports = router;
