const { db } = require("../models/connection");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const CustomError = require("../utils/customError");

const Customer = db.Customer;
const Address = db.Address;
const VendorCustomer = db.VendorCustomer;

// -------------------------------------------- CREATE A CUSTOMER ---------------------------------------------

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
  } = req.body;

  //restore customer if present in table
  const count = await Customer.restore({
    where: {
      email,
    },
  });

  //create new customer if no record is restored
  if (!count) {
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
        },
      },
      {
        include: [db.customerAddress],
      }
    );

    //create new record for vendorcustomer table
    const vendorCustomer = await VendorCustomer.create({
      VendorId: req.vendor.id,
      CustomerId: customer.id,
    });

    res.status(201).json({
      status: "Success",
      data: {
        customer,
        Vendor_Customer_Details: vendorCustomer,
      },
    });
  } else {
    //find restored customer
    let customer = await Customer.findOne({ where: { email } });

    //restore address of already restored customer
    await Address.restore({
      where: {
        role: "customer",
        roleId: customer.id,
      },
    });

    //find restored address
    customer = await Customer.findOne({
      include: [
        {
          model: Address,
          as: "Address_Details",
        },
      ],
      where: { email },
    });

    //restore vendorvustomer table record
    await VendorCustomer.restore({
      where: {
        VendorId: req.vendor.id,
        CustomerId: customer.id,
      },
    });

    //find restored VendorCustomer records
    const vendorCustomer = await VendorCustomer.findOne({
      where: {
        VendorId: req.vendor.id,
        CustomerId: customer.id,
      },
    });

    res.status(201).json({
      status: "Success",
      data: {
        customer,
        Vendor_Customer_Details: vendorCustomer,
      },
    });
  }
});

// -------------------------------------------- GET ALL CUSTOMERS ---------------------------------------------

exports.getAllCustomers = asyncErrorHandler(async (req, res, next) => {
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

  // FETCHING CUSTOMER DETAILS CORRESPONDING TO VENDOR
  vendorCustomers = await Customer.findAll({
    where: {
      id: customerIds,
    },
    include: [
      {
        model: Address,
        as: "Address_Details",
      },
    ],
  });

  res.status(200).json({
    status: "Success",
    count: vendorCustomers.length,
    data: {
      vendorCustomers,
    },
  });
});

// ------------------------------------------- GET CUSTOMER BY ID ---------------------------------------------

exports.getCustomer = asyncErrorHandler(async (req, res, next) => {
  const customer = await Customer.findByPk(req.params.id, {
    include: [
      {
        model: Address,
        as: "Address_Details",
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

// --------------------------------------------- DELETE CUSTOMER ----------------------------------------------

exports.deleteCustomer = asyncErrorHandler(async (req, res, next) => {
  const customer = await Customer.findByPk(req.params.id);

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

// --------------------------------------------- UPDATE CUSTOMER ----------------------------------------------

exports.updateCustomer = asyncErrorHandler(async (req, res, next) => {
  const customer = await Customer.findByPk(req.params.id);

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
    const error = new CustomError(
      "You can't update role using this end point!",
      400
    );
    return next(error);
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
    include: [
      {
        model: Address,
        as: "Address_Details",
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
