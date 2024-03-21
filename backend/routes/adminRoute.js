const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const authController = require("../controllers/authController");

router.route("/:id").patch(adminController.updateAdmin);

router.route("/updatepassword/:id").patch(authController.protect, authController.restrict('admin'), adminController.updatePassword);

module.exports = router;
