
// MODEL NAME PRODUCT FILE CREATE BY UJWAL GUPTA, <IF YOU EDIT THIS FILE THEN REPLACE THIS WITH <EDITED BY YOUR_NAME>>

module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,       // USING TEXT DATATYPE BECAUSE THE LENGTH OF THE DESCIPTION MIGHT BE TOO LONG
        allowNull: false
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),     // 10 DEFINE TOTAL NUMBER OF DIGITS(8+2) AND 2 DEFINE DIGITS AFTER DECIMAL POINT
        allowNull: false
      },
      discount: {
        type: DataTypes.DECIMAL(10, 2),     // ASSUMING DISCOUNT IS MONETARY VALUE AND NOT A PERCENTAGE
        allowNull: false,
        defaultValue: 0.00      // ASSUMING PRODUCTS HAVE NO DISCOUNT BY DEFAULT
      }
    }, {
      // options
      modelName: 'Product',
      tableName: 'product',
      timestamps: false
    });
  
    return Product;
};