const Vendor = require("./vendorModel");
const Product = require("./productModel");

module.exports = (connectDB, DataTypes) => {
  const AdminProduct = connectDB.define(
    "AdminProduct",
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
      modelName: "AdminProduct",
      tableName: "adminproduct",
      timestamps: false,
    }
  );

  return AdminProduct;
};
