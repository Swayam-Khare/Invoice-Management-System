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
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2), // 10 DEFINE TOTAL NUMBER OF DIGITS(8+2) AND 2 DEFINE DIGITS AFTER DECIMAL POINT
        allowNull: false,
      },
      discount: {
        type: DataTypes.DECIMAL(10, 2), // ASSUMING DISCOUNT IS MONETARY VALUE AND NOT A PERCENTAGE
        allowNull: false,
      },

    },
    {
      // Other model options go here
      modelName: "VendorProduct",
      tableName: "vendorproduct",
      createdAt: false,  
      updatedAt: false,
      paranoid: true
    }
  );

  return VendorProduct;
};
