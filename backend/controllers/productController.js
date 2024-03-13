const { db }= require('../models/connection.js')
const asyncErrorHandler = require('../utils/asyncErrorHandler.js')
const CustomError = require('../utils/customError.js')
const Product =  db.Product


// CREATE OPERATION
exports.addProduct = asyncErrorHandler(
    async (req, res, next) => {
        const product = await Product.create(req.body)
        res.status(201).json({
            status: 'Success',
            data: {
                product
            }
        })
    }
)

// READ OPERATION
exports.readProducts = asyncErrorHandler(
    async (req, res, next) => {
        const products = await Product.findAll()
        res.status(200).json({
            status: 'Success',
            count: products.length,
            data: {
                products
            }
        })
    }
)

// READ PRODUCT BY ID
exports.readProductById = asyncErrorHandler(
    async (req, res, next) => {
        const product = await Product.findOne({
            where: {
                id: req.params.productId
            }
        })
        if(!product){
            const error = new CustomError(`Product with ID '${req.params.productId}' is not found`, 404)
            return next(error)
        }
        res.status(200).json({
            status: 'Success',
            data: {
                product
            }
        })
    }
)

// UPDATE PRODUCT
exports.updateProduct = asyncErrorHandler(
    async (req, res, next) => {
        const [ updatedRows ] = await Product.update(
            req.body,
            {
                where: {
                    id: req.params.productId
                }
            }
        )
        if(updatedRows === 0){
            const error = new CustomError(`Product with ID '${req.params.productId}' is not found`, 404)
            return next(error)
        }
        const product = await Product.findByPk(req.params.productId)
        res.status(200).json({
            status: 'Success',
            data: {
                product 
            }
        })
    }
)

// DELETE PRODUCT
exports.deleteProduct = asyncErrorHandler(
    async (req, res, next) => {
        const deletedProduct = await Product.destroy({
            where: {
                id: req.params.productId
            }
        })
        if(!deletedProduct){
            const error = new CustomError(`Product with ID '${req.params.productId}' is not found`, 404)
            return next(error)
        }
        res.status(204).json({
            status: 'Success',
            data: null
        })
    }
)
