const { db } = require("../models/connection");
const CustomError = require("../utils/customError");
const asyncErrorHandler = require("../utils/asyncErrorHandler");

const Customer = db.Customer;
const Address = db.Address;

// ------------- CREATE A CUSTOMER --------------

exports.createCustomer = asyncErrorHandler(async (req, res, next) => {
    const {
        name,
        email,
        contact,
        address_lane1,
        address_lane2,
        landmark,
        pincode,
        state,
        role,
    } = req.body;

    const customer = await Customer.create({
        name,
        email,
    });

    let customerAddress = null;
    if (customer && customer.id) {
        const roleId = customer.id;
        customerAddress = await Address.create({
            address_lane1,
            address_lane2,
            landmark,
            pincode,
            state,
            contact,
            role,
            roleId,
        });
    }
    res.status(201).json({
        status: "Success",
        data: {
            customer,
            customerAddress
        },
    });
});

// ------------- GET ALL CUSTOMERS --------------


exports.getAllCustomers = asyncErrorHandler(async (req, res, next) => {
    const customers = await Customer.findAll({
        include: [
            {
                model: Address,
                as:"Address Details",
                attributes: [
                    "address_lane1",
                    "address_lane2",
                    "landmark",
                    "pincode",
                    "state",
                    "contact"
                ],
            },
        ],
        attributes: ["id", "name", "email"],
    });

    res.status(200).json({
        status: "Success",
        count: customers.length,
        data: {
            customers,
        },
    });
});


// ------------- GET CUSTOMER BY ID --------------

exports.getCustomer = asyncErrorHandler(async (req, res, next) => {
    const customer = await Customer.findOne({
        include: [
            {
                model: Address,
                as:"Address Details",
                attributes: [
                    "address_lane1",
                    "address_lane2",
                    "landmark",
                    "pincode",
                    "state",
                    "contact"
                ],
            },
        ],
        attributes: ["id", "name", "email"],
        where: {
            id: req.params.id,
        },
    });
    if (!req.params.id || !customer) {
        if (!req.params.id) {
            const error = new CustomError("please give id in parameters", 400);
            return next(error);
        }
        if (!customer) {
            const error = new CustomError(
                "Customer for the given id does not exist",
                404
            );
            return next(error);
        }
    }

    res.status(200).json({
        status: "Success",
        data: {
            customer,
        },
    });
});


// ------------- DELETE CUSTOMER --------------


exports.deleteCustomer = asyncErrorHandler(async (req, res, next) => {
    const customer = await Customer.findByPk(req.params.id)

    if (!req.params.id || !customer) {
        if (!req.params.id) {
            const error = new CustomError("Please give id in parameters", 400);
            return next(error);
        }
        if (!customer) {
            const error = new CustomError(
                "Customer for the given id does not exist",
                404
            );
            return next(error);
        }
    }

    await Customer.destroy({ where: { id: req.params.id } });
    await Address.destroy({ where: { role: "customer", roleId: req.params.id } });

    res.status(200).json({
        status: "Success",
        message: "Customer has been deleted successfully",
    });
});

// ------------- UPDATE CUSTOMER --------------

exports.updateCustomer = asyncErrorHandler(async (req, res, next) => {
    const customer = await Customer.findByPk(req.params.id)

    if (!req.params.id || !customer) {
        if (!req.params.id) {
            const error = new CustomError("please give id in parameters", 400);
            return next(error);
        }
        if (!customer) {
            const error = new CustomError(
                "Customer for the given id does not exist",
                404
            );
            return next(error);
        }
    }
    const {
        name,
        email,
        contact,
        address_lane1,
        address_lane2,
        landmark,
        pincode,
        state,
        role,
    } = req.body;

    // if (password || confirmPassword) {
    //     const error = new CustomError(
    //         "You can not update password using this end point",
    //         400
    //     );
    //     return next(error);
    // }

    if (role) {
        const error = new CustomError(
            "you can not update role using this end point",
            400
        );
        return next(error);
    };

    const updateCustomer = await Customer.update(
        { name, email },
        { where: { id: req.params.id } }
    );

    const updateCustomerAddress = await Address.update(
        { address_lane1, address_lane2, landmark, pincode, state, contact },
        { where: { role: "customer", roleId: req.params.id } }
    );

    const updatedCustomer = await Customer.findByPk(req.params.id, {
        include: [
            {
                model: Address,
                as:"Address Details",
                attributes: [
                    "address_lane1",
                    "address_lane2",
                    "landmark",
                    "pincode",
                    "state",
                    "contact"
                ],
            },
        ],
        where: {
            id: req.params.id,
        },
    });

    res.status(200).json({
        status: "Success",
        data: {
            //   updateCustomer,
            //   updateCustomerAddress,
            updatedCustomer,
        },
    });
});