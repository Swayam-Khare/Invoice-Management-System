const Vendor = require("./vendorModel");
const Product = require("./productModel");

module.exports = (connectDB, DataTypes) => {
  const VendorProduct = connectDB.define(
    "VendorProduct",
    {
      VendorId: {
        type: DataTypes.INTEGER,
        references: {
          model: Vendor,
          key: "id",
        },
      },
      ProductId: {
        type: DataTypes.INTEGER,
        references: {
          model: Product,
          key: "id",
        },
      },
    },
    {
      // Other model options go here
      modelName: "VendorProduct",
      tableName: "vendorproduct",
      timestamps: false,
    }
  );

  return VendorProduct;
};
