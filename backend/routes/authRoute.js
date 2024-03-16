const express = require("express");
const authController = require("./../controllers/authController");

const router = express.Router();
// vivek-----------
// Role is passed as params either (admin or vendor)
router.route("/login/:role").post(authController.login);
// router.route('/signup').post(authController.signup);

router.route("/forgotPassword").post(authController.forgotPassword);
router.route("/resetPassword/:token").patch(authController.resetPassword);

module.exports = router;
