const { db } = require("../models/connection");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const CustomError = require("../utils/customError");
const Address = db.Address;
const Order = require('../models/orderModel');

exports.getAllOrders = asyncErrorHandler(async (req, res, next) => {
    const orders = await Order.findAll({});
  
    res.status(200).json({
      status: "success",
      count: orders.length,
      data: {
        orders,
      },
    });
  });
  // find all orders --done

exports.getOrder = asyncErrorHandler(async (req, res, next) => {
        const order = await Order.findById(req.params.orderId);

        if (!order) {
            const err = new CustomError(
              `Order with orderId ${req.params.orderId} was not found`,
              404
            );
            return next(err);
          }

        res.status(200).json({
            status: 'success',
            data: {
                order
            }
        });
    
    
})// get order by id func(read) --done

exports.createOrder = asyncErrorHandler(async (req, res, next) => {

        const order = await Order.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                order
            }
        })

    
})// create order func --done

exports.updateOrder = asyncErrorHandler(async (req, res, next) => {
    const orderUpdated = await Order.update(req.body, {
      where: {
        id: req.params.orderId,
      },
    });
  
    if (!orderUpdated) {
      const err = new CustomError(
        `Order with ID ${req.params.addressId} does not exist.`,
        404
      );
      return next(err);
    }
  
    res.status(200).json({
      status: "success",
      data: {
        order: orderUpdated,
      },
    });
  });// update order func

exports.deleteOrder = asyncErrorHandler(async (req, res, next) => {
    const deletedRows = await Order.destroy({
      where: {
        id: req.params.orderId,
      },
    });
  
    if (deletedRows === 0) {
      const err = new CustomError(
        `Order with ID ${req.params.orderId} was not found`,
        404
      );
      return next(err);
    }
  
    res.status(204).json({
      status: "success",
      data: null,
    });
  });
