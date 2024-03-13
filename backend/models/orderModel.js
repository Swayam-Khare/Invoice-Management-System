module.exports = (connectDB, DataTypes) => {
  const Order = connectDB.define(
    "Order",
    {
      // Model attributes are defined here
      invoiceNo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique : true
      },
      productId: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false
      },
      quantity: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false
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
