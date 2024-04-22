const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const authController = require("../controllers/authController");

router.route("/updatepassword").patch(authController.protect, authController.restrict("admin"), adminController.updatePassword);
router.route("/vendorstatus/:id").patch(authController.protect, authController.restrict("admin"), adminController.approveVendor);
router.route("/:id").patch(adminController.updateAdmin);


module.exports = router;
