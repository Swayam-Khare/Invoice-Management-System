const { db } = require("../models/connection");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const CustomError = require("../utils/customError");

const Customer = db.Customer;
const Address = db.Address;

// ------------- CREATE A CUSTOMER --------------

exports.createCustomer = asyncErrorHandler(async (req, res, next) => {
    const {
        firstName,
        lastName,
        email,
        contact,
        address_lane1,
        address_lane2,
        landmark,
        pincode,
        state,
        role,
    } = req.body;

    const customer = await Customer.create(
        {
            firstName,
            lastName,
            email,
            contact,
            Address_Details: {
                address_lane1,
                address_lane2,
                landmark,
                pincode,
                state,
                contact,
                role,
            },
        },
        {
            include: [db.customerAddress],
        }
    );

    res.status(201).json({
        status: "Success",
        data: {
            customer
        },
    });
});

// ------------- GET ALL CUSTOMERS --------------

exports.getAllCustomers = asyncErrorHandler(async (req, res, next) => {
    const customers = await Customer.findAll({
        // paranoid: false,
        include: [
            {
                model: Address,
                // paranoid: false,
                as: "Address_Details",
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
        attributes: ["id", "firstName", "lastName", "email", "contact"],
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
                as: "Address Details",
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
        attributes: ["id", "firstName", "lastName", "email", "contact"],
        where: {
            id: req.params.id,
        },
    });

    if (!req.params.id || !customer) {
        if (!req.params.id) {
            return next(new CustomError("Please provide id in parameters!", 400));
        }
        if (!customer) {
            return next(new CustomError(`Customer with the id(${req.params.id}) does not exist!`, 400));
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
            return next(new CustomError("Please provide id in parameters!", 400));
        }
        if (!customer) {
            return next(new CustomError(`Customer with the id(${req.params.id}) does not exist!`, 400));
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
            return next(new CustomError("Please provide id in parameters!", 400));
        }
        if (!customer) {
            return next(new CustomError(`Customer with the id(${req.params.id}) does not exist!`, 400));
        }
    }

    const {
        firstName,
        lastName,
        email,
        contact,
        address_lane1,
        address_lane2,
        landmark,
        pincode,
        state,
        role,
    } = req.body;

    if (role) {
        const error = new CustomError(
            "You can't update role using this end point!",
            400
        );
        return next(error);
    };

    const updateCustomer = await Customer.update(
        { firstName, lastName, email, contact },
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
                as: "Address Details",
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
        attributes: ["id", "firstName", "lastName", "email", "contact"],
        where: {
            id: req.params.id,
        },
    });

    res.status(200).json({
        status: "Success",
        data: {
            updatedCustomer,
        },
    });
});