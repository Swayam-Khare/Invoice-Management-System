<<<<<<< HEAD
const Vendor = require("./vendorModel");
const Customer = require("./customerModel");

module.exports = (connectDB, DataTypes) => {
  const VendorCustomer = connectDB.define(
    "VendorCustomer",
    {
      VendorId: {
        type: DataTypes.INTEGER,
        references: {
          model: Vendor,
          key: "id",
        },
      },
      CustomerId: {
        type: DataTypes.INTEGER,
        references: {
          model: Customer,
          key: "id",
        },
      },
    },
    {
      // Other model options go here
      modelName: "VendorCustomer",
      tableName: "vendorcustomer",
      timestamps: true,
      updatedAt: false,
      createdAt: false,
      paranoid: true,
    }
  );

  return VendorCustomer;
};
=======
const Vendor = require("./vendorModel");
const Customer = require("./customerModel");

module.exports = (connectDB, DataTypes) => {
  const VendorCustomer = connectDB.define(
    "VendorCustomer",
    {
      VendorId: {
        type: DataTypes.INTEGER,
        references: {
          model: Vendor,
          key: "id",
        },
      },
      CustomerId: {
        type: DataTypes.INTEGER,
        references: {
          model: Customer,
          key: "id",
        },
      },
    },
    {
      // Other model options go here
      modelName: "VendorCustomer",
      tableName: "vendorcustomer",
      timestamps: true,
      updatedAt: false,
      createdAt: false,
      paranoid: true,
    }
  );

  return VendorCustomer;
};
>>>>>>> 98c522425a87afb7117a101f54363058e16cec6e
