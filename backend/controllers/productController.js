const { db }= require('../models/connection.js')
const asyncErrorHandler = require('../utils/asyncErrorHandler.js')
const CustomError = require('../utils/customError.js')
const Product =  db.Product
const VendorProduct =  db.VendorProduct


// CREATE OPERATION
exports.addProduct = asyncErrorHandler(
    async (req, res, next) => {

        let product = await Product.findOne({
            where: {
                name: req.body.name
            }
        })

        if(!product){
            product = await Product.create({
                name: req.body.name,
                description: req.body.description
            })
        }

        const vendorProduct = await VendorProduct.create({
            VendorId: req.vendor.id,
            ProductId: product.id,
            stock: req.body.stock,
            price: req.body.price,
            discount: req.body.discount
        })

        res.status(201).json({
            status: 'Success',
            data: {
                product,
                vendorProduct
            }
        })
    }
)

// READ OPERATION
exports.readProducts = asyncErrorHandler(
    async (req, res, next) => {

        // FIRST FETCHING ALL THE PRODUCT ID CORRESPONDING TO VENDOR ID
        const vendorProducts = await VendorProduct.findAll({
            where: {
                VendorId: req.vendor.id
            },
            attributes: {
                exclude: [
                    'VendorId'
                ] 
            }
        })

        // EXTRACTING PRODUCT ID FROM VENDORPRODUCTS AND SAVING IT INTO AN ARRAY
        const productIds = vendorProducts.map(vendorProduct => vendorProduct.ProductId)

        // FETCHING PRODUCT DETAILS CORRESPONDING TO VENDOR
        const products = await Product.findAll({
            where: {
                id: productIds
            }
        })

        // MERGING INFORMATION OF PRODUCT AND INFO RELATED TO VENDOR IN ONE OBJECT
        const myProducts = products.map(product => {
            const vendorProduct = vendorProducts.find(vp => vp.ProductId === product.id);
            return {
                id: product.id,
                name: product.name,
                description: product.description,
                stock: vendorProduct.stock,
                price: vendorProduct.price,
                discount: vendorProduct.discount
            };
        });

        res.status(200).json({
            status: 'Success',
            count: myProducts.length,
            data: {
                myProducts
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

        const { stock, price, discount } = req.body;
        
        const updateData = {};
        if (stock !== undefined) updateData.stock = stock;
        if (price !== undefined) updateData.price = price;
        if (discount !== undefined) updateData.discount = discount;

        const [ updatedRows ] = await VendorProduct.update(updateData, {
            where: {
                VendorId: req.vendor.id,
                ProductId: req.params.productId
            }
        });

        if(updatedRows){

            const updatedProduct = await VendorProduct.findOne({
                where: {
                    VendorId: req.vendor.id,
                    ProductId: req.params.productId
                },
                attributes: {
                    exclude: [
                        'VendorId'
                    ] 
                }
            });

            const products = await Product.findOne({
                where: {
                    id: updatedProduct.ProductId
                }
            })

            const product = {
                name: products.name,
                description: products.description,
                stock: updatedProduct.stock,
                price: updatedProduct.price,
                discount: updatedProduct.discount
            }

            res.status(200).json({
                status: 'Success',
                data: {
                    product 
                }
            })

        }
        else {
            res.status(404).json({
                status: 'Fail',
                message: 'No matching product found for the provided vendor and product IDs, or no new data provided for update.'
            });
        }

    }
)

// DELETE PRODUCT
exports.deleteProduct = asyncErrorHandler(
    async (req, res, next) => {
        await VendorProduct.destroy({
            where: {
                ProductId: req.params.productId,
                VendorId: req.vendor.id
            }
        })

        const vendorProducts = await VendorProduct.findAll({
            where: {
                ProductId: req.params.productId
            }
        })

        if(vendorProducts.length === 0){
            await Product.destroy({
                where: {
                    id: req.params.productId
                }
            })
        }

        res.status(204).json({
            status: 'Success',
            data: null
        })
    }
)
