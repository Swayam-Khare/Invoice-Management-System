module.exports = (connectDB, DataTypes) => {
  const Order = connectDB.define(
    "Order",
    {
      // Model attributes are defined here
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        allowNull: false,
        autoIncrement: true,
      },
      invoiceNo: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please enter your invoice number!'
          }
        }
      },
      productId: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please enter product id!'
          }
        }
      },
      quantity: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please enter quantity!'
          }
        }
      },
    },
    {
      // Other model options go here
      modelName: "Order",
      tableName: "order",
      timestamps: false,
    }
  );
  // `sequelize.define` also returns the model

  return Order;
};
