const { db } = require("../models/connection");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const CustomError = require("../utils/customError");

const Address = db.Address;

// Create Address
exports.addAddress = asyncErrorHandler(async (req, res, next) => {
  const address = await Address.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      address,
    },
  });
});

// Get all addresses
exports.getAddresses = asyncErrorHandler(async (req, res, next) => {
  const addresses = await Address.findAll({});

  res.status(200).json({
    status: "success",
    count: addresses.length,
    data: {
      addresses,
    },
  });
});

// Get an address by roleId and role
exports.getAddressByRole = asyncErrorHandler(async (req, res, next) => {
  if (!req.params.roleId || !req.params.role) {
    const err = new CustomError(
      `Please send role and id both in query to get an address`,
      404
    );
    return next(err);
  }

  const address = await Address.findOne({
    where: {
      role: req.params.role,
      roleId: req.params.roleId,
    },
  });

  if (!address) {
    const err = new CustomError(
      `Address with roleId ${req.params.roleId} and role ${req.params.role} is not found`,
      404
    );
    return next(err);
  }

  res.status(200).json({
    status: "success",
    data: {
      address,
    },
  });
});

// Get an address by its id
exports.getAddress = asyncErrorHandler(async (req, res, next) => {
  const address = await Address.findOne({
    where: {
      addressId: req.params.addressId,
    },
  });

  if (!address) {
    const err = new CustomError(
      `Address with Id ${req.params.addressId} is not found`,
      404
    );
    return next(err);
  }

  res.status(200).json({
    status: "success",
    data: {
      address,
    },
  });
});

// Update an address
exports.updateAddress = asyncErrorHandler(async (req, res, next) => {
  const [addressUpdated] = await Address.update(req.body, {
    where: {
      id: req.params.addressId,
    },
  });

  if (addressUpdated === 0) {
    const err = new CustomError(
      `Address with Id ${req.params.addressId} is not found`,
      404
    );
    return next(err);
  }

  const address = await Address.findByPk(req.params.addressId);

  res.status(200).json({
    status: "success",
    data: {
      address,
    },
  });
});

// Delete an address
exports.deleteAddress = asyncErrorHandler(async (req, res, next) => {
  const deletedRows = await Address.destroy({
    where: {
      id: req.params.addressId,
    },
  });

  if (deletedRows === 0) {
    const err = new CustomError(
      `Address with Id ${req.params.addressId} is not found`,
      404
    );
    return next(err);
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
