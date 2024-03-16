const Vendor = require("./vendorModel");
const Product = require("./productModel");
// vivek---
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
      stock: {//vivek
        type: DataTypes.INTEGER,
        allowNull: false
      },
      price: {//vivek
        type: DataTypes.DECIMAL(10, 2),     // 10 DEFINE TOTAL NUMBER OF DIGITS(8+2) AND 2 DEFINE DIGITS AFTER DECIMAL POINT
        allowNull: false
      },
      discount: {//vivek
        type: DataTypes.DECIMAL(10, 2),     // ASSUMING DISCOUNT IS MONETARY VALUE AND NOT A PERCENTAGE
        allowNull: false
      }
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
