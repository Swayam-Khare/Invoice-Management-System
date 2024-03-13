const { param } = require('../routes/orderRoute');
const Order = require('../models/orderModel');

exports.getOrder = async (req, res) => {
    try{
        const order = await Order.findById(req.params.id);

        res.status(200).json({
            status: 'success',
            data: {
                order
            }
        });
    }catch(err){
        res.status(404).json({
            status: 'fail',
            message: err.message
        })
    }
}// get order by id func(read)

exports.createOrder = async (req, res) => {
    try{
        const order = await Order.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                order
            }
        })
    }catch(err){
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    }
}// create order func

exports.updateOrder = async (req, res) => {
    try{
        const updatedorder = await Order.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});

        res.status(200).json({
            status: "success",
            data: {
                updatedorder
            }
        });
    }catch(err){
        res.status(404).json({
            status:"fail",
            message: err.message
        });
    }
}// update order func

exports.deleteOrder = async (req, res) => {
    try{
        await Order.findByIdAndDelete(req.params.id);

        res.status(204).json({
            status: 'success',
            data: null
        });
    }catch(err){
        res.status(404).json({
            status:"fail",
            message: err.message
        });
    }
}// delete order func