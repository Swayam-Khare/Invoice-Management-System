const express = require("express");
const authController = require("./../controllers/authController");

const router = express.Router();
// Role is passed as params either (admin or vendor)
router.route("/login/:role").post(authController.login);
router.route("/logout/:role").get(authController.logout);
router.route("/forgotPassword").post(authController.forgotPassword);
router.route("/resetPassword/:token").patch(authController.resetPassword);

module.exports = router;
