<<<<<<< HEAD
const express = require("express");
const vendorController = require("../controllers/vendorController");
const authController = require("../controllers/authController");

const router = express.Router();

router.route("/").get(authController.protect,authController.restrict("admin"), vendorController.getAllVendors).post(authController.protect,authController.restrict("admin"),vendorController.createVendor);

router
  .route("/:id")
  .get(authController.protect, authController.restrict("admin"), vendorController.getASpecificVendor)

  .delete(authController.protect, vendorController.deleteVendor)
  .patch(authController.protect, vendorController.updateVendor);

router.route("/updatepassword/:id").patch(authController.protect, authController.restrict("vendor"), vendorController.updatePassword);
module.exports = router;
=======
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
>>>>>>> 98c522425a87afb7117a101f54363058e16cec6e
