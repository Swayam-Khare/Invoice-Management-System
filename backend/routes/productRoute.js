const express = require("express");
const productController = require("../controllers/productController");

const router = express.Router();
const authctrl = require("../controllers/authController");

router.route("/").get(authctrl.protect, productController.readProducts).post(authctrl.protect, productController.addProduct);

router
  .route("/:productId")
  .get(authctrl.protect, productController.readProductById)
  .patch(authctrl.protect, productController.updateProduct)
  .delete(authctrl.protect, productController.deleteProduct);

module.exports = router;
