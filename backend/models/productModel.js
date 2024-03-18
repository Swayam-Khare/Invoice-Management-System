
// MODEL NAME PRODUCT FILE CREATE BY UJWAL GUPTA, <IF YOU EDIT THIS FILE THEN REPLACE THIS WITH <EDITED BY YOUR_NAME>>

module.exports = (connectDB, DataTypes) => {
    const Product = connectDB.define('Product', {
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
      }
    }, {
      // options
      modelName: 'Product',
      tableName: 'product',
      timestamps: false
    });
  
    return Product;
};