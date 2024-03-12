module.exports = (sequelize, DataTypes) => {
  const Invoice = sequelize.define("Invoice", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    purchase_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    tax: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    delivery_charge: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    status: {
      type: DataTypes.STRING,
      defaultValue: "due",
    },

    subtotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    penalty: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.0,
    },

    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },

    discount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
  }, {

    modelName: 'Invoice',
    tableName: 'invoice',
    timestamps: false
  });

  return Invoice;
};
