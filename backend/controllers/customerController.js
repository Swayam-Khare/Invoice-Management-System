const { db } = require("../models/connection");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const CustomError = require("../utils/customError");

const Customer = db.Customer;
const Address = db.Address;
const VendorCustomer = db.VendorCustomer;

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

    //restore customer if present in table
    const count = await Customer.restore({
        where: {
            email
        }
    });

    //create new customer if no record restored
    if (count === 0) {
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

        //create new record for VendorCustomer table
        const vendorCustomer = await VendorCustomer.create({
            VendorId: req.vendor.id,
            CustomerId: customer.id,
        });

        res.status(201).json({
            status: "Success",
            data: {
                customer,
                "Vendor/Customer details": vendorCustomer 
            },
        });
    } else {
        //find restored customer
        const customer = await Customer.findOne({ where: { email } });

        //restore address of already restored customer
        await Address.restore({
            where: {
                role: "customer",
                roleId: customer.id
            }
        });

        //restore VendorCustomer table records
        await VendorCustomer.restore({
            where: {
                VendorId: req.vendor.id,
                CustomerId: customer.id
            }
        });

        //find restored address
        const address = await Address.findOne({ where: { roleId: customer.id } });

        //find restored VendorCustomer records
        const vendorCustomer = await VendorCustomer.findOne({where: {VendorId: req.vendor.id, CustomerId: customer.id}});

        res.status(201).json({
            status: "Success",
            data: {
                customer,
                "Address Details": address,
                "Vendor/Customer details": vendorCustomer
            },
        });
    }
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

    await VendorCustomer.destroy({where: {VendorId: req.vendor.id, CustomerId: req.params.id}});
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