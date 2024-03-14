const express = require('express')
const productController = require('../controllers/productController')

const router = express.Router()

router.route('/')
      .get(productController.readProducts)
      .post(productController.addProduct)

router.route('/:productId')
      .get(productController.readProductById)
      .patch(productController.updateProduct)
      .delete(productController.deleteProduct)

module.exports = router