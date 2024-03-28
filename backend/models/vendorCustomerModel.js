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