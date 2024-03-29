const { db } = require("../models/connection");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const CustomError = require("../utils/customError");
const { Op } = require("sequelize");
const apiFeatures = require('../utils/apiFeatures');

const Customer = db.Customer;
const Address = db.Address;
const VendorCustomer = db.VendorCustomer;
const connectDB = db.connectDB;

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

  let customer = await Customer.findOne({ where: { email }, paranoid: false });
  let existWithDeletedAt = false;
  let vendorCustomer;

  if (customer && customer.deletedAt) {
    existWithDeletedAt = true;
  }

  //create new customer if no record restored
  if (!existWithDeletedAt || !customer) {
    try { 
      const result = await connectDB.transaction(async (t) => {
        customer = await Customer.create(
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
            transaction: t,
          }
        );

        //create new record for VendorCustomer table
        vendorCustomer = await VendorCustomer.create(
          {
            VendorId: req.vendor.id,
            CustomerId: customer.id,
          },
          {
            transaction: t,
          }
        );
      });
    } catch (err) {
      next(new CustomError(err.message, 400));
    }

    res.status(201).json({
      status: "Success",
      data: {
        customer,
        Vendor_Customer_Details: vendorCustomer,
      },
    });
  } else {
    try {
      const result = await connectDB.transaction(async (t) => {
        //restore customer from the table
        await Customer.restore({
          where: {
            email,
          },
          transaction: t,
        });

        //restore address of already restored customer
        await Address.restore({
          where: {
            role: "customer",
            roleId: customer.id,
          },
          transaction: t,
        });

        //restore vendorcustomer table record
        await VendorCustomer.restore({
          where: {
            VendorId: req.vendor.id,
            CustomerId: customer.id,
          },
          transaction: t,
        });

        //find restored customer including address details
        customer = await Customer.findOne({
          attributes: {
            exclude: ["deletedAt"],
          },
          include: [
            {
              model: Address,
              as: "Address_Details",
              attributes: {
                exclude: ["deletedAt"],
              },
            },
          ],
          where: { email },
          transaction: t,
        });

        //find restored VendorCustomer records
        vendorCustomer = await VendorCustomer.findOne({
          where: {
            VendorId: req.vendor.id,
            CustomerId: customer.id,
          },
          attributes: {
            exclude: ["deletedAt"],
          },
          transaction: t,
        });
      });
    } catch (err) {
      next(new CustomError(err.message, 400));
    }

    res.status(201).json({
      status: "Success",
      data: {
        customer,
        Vendor_Customer_Details: vendorCustomer,
      },
    });
  }
});

// ------------- GET ALL CUSTOMERS --------------

exports.getAllCustomers = asyncErrorHandler(async (req, res, next) => {
  console.log(req.query);
  // FETCHING ALL THE CUSTOMER ID CORRESPONDING TO VENDOR ID
  let vendorCustomers = await VendorCustomer.findAll({
    where: {
      VendorId: req.vendor.id,
    },
  });

  // EXTRACTING CUSTOMER ID FROM VENDORCUSTOMERS ARRAY AND SAVING IT INTO CUSTOMERID ARRAY
  const customerIds = vendorCustomers.map(
    (vendorCustomer) => vendorCustomer.CustomerId
  );

  // APPLYING FILTERS SORTING SEARCHING ETC. IN CUSTOMER 
  let orderBy = null;
  let limitFields = null;
  let offset = null;
  const limit = req.query.limit || 10 ;
  let name = req.query.search || '%';

  if (req.query.sort) {
    orderBy = apiFeatures.sorting(req.query.sort);
  }
  if (req.query.fields) {
    limitFields = apiFeatures.limitFields(req.query.fields);
  }
  if (req.query.page) {
    offset = apiFeatures.paginate(req.query.page, limit, totalRows.count, next);
  }
  if (req.query.search) {
    name = apiFeatures.search(name);
  }

  const attribute = limitFields ? limitFields : ["id", "firstName", "lastName", "email", "contact"];

  // FETCHING CUSTOMER DETAILS CORRESPONDING TO VENDOR
  vendorCustomers = await Customer.findAll(
      {
      where: {
        id: customerIds,
        [Op.or]: [
          {
            firstName: {
              [Op.iLike]: name
            }
          },
          {
            lastName: {
              [Op.iLike]: name
            }
          },
          {
            email: {
              [Op.iLike]: name
            }
          }
        ]
      },
      attributes: attribute,
      include: [
        {
          model: Address,
          as: "Address_Details",
          attributes: {
            exclude: ["deletedAt"],
          },
        },
      ],
      order: orderBy,
      limit: limit,
      offset: offset
    }
  );

  res.status(200).json({
    status: "Success",
    count: vendorCustomers.length,
    data: {
      vendorCustomers,
    },
  });
});

// ------------- GET CUSTOMER BY ID --------------

exports.getCustomer = asyncErrorHandler(async (req, res, next) => {
  const customer = await Customer.findByPk(req.params.id, {
    attributes: {
      exclude: ["deletedAt"],
    },
    include: [
      {
        model: Address,
        as: "Address_Details",
        attributes: {
          exclude: ["deletedAt"],
        },
      },
    ],
  });

  if (!req.params.id) {
    return next(new CustomError("Please provide id in parameters!", 400));
  }
  if (!customer) {
    return next(
      new CustomError(
        `Customer with the id(${req.params.id}) does not exist!`,
        400
      )
    );
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

  if (!req.params.id) {
    return next(new CustomError("Please provide id in parameters!", 400));
  }
  if (!customer) {
    return next(
      new CustomError(
        `Customer with the id(${req.params.id}) does not exist!`,
        400
      )
    );
  }

  await Customer.destroy({ where: { id: req.params.id } });
  await Address.destroy({ where: { role: "customer", roleId: req.params.id } });
  await VendorCustomer.destroy({
    where: { VendorId: req.vendor.id, CustomerId: req.params.id },
  });

  res.status(200).json({
    status: "Success",
    message: "Customer has been deleted successfully",
  });
});

// ------------- UPDATE CUSTOMER --------------

exports.updateCustomer = asyncErrorHandler(async (req, res, next) => {
  const customer = await Customer.findByPk(req.params.id)

  if (!req.params.id) {
    return next(new CustomError("Please provide id in parameters!", 400));
  }
  if (!customer) {
    return next(
      new CustomError(
        `Customer with the id(${req.params.id}) does not exist!`,
        400
      )
    );
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
    return next(
      new CustomError("You can't update role using this end point!", 400)
    );
  }

  const updateCustomer = await Customer.update(
    { firstName, lastName, email, contact },
    { where: { id: req.params.id } }
  );

  const updateCustomerAddress = await Address.update(
    { address_lane1, address_lane2, landmark, pincode, state, contact },
    { where: { role: "customer", roleId: req.params.id } }
  );

  const updatedCustomer = await Customer.findByPk(req.params.id, {
    attributes: {
      exclude: ["deletedAt"],
    },
    include: [
      {
        model: Address,
        as: "Address_Details",
        attributes: {
          exclude: ["deletedAt"],
        },
      },
    ],
  });

  res.status(200).json({
    status: "Success",
    data: {
      updatedCustomer,
    },
  });
});