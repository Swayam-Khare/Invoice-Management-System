module.exports = (connectDB, DataTypes) => {
  const Invoice = connectDB.define(
    "Invoice",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        default: 1,
      },

      invoice_no: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [12, 12],
            msg: "Invoice id length must be 12 letters only",
          },
        },
        unique: true,
      },

      // invoice_no: {
      //   type: DataTypes.STRING,  // needs to be string to maintain the structure of leading zeroes
      //   allowNull: false,
      // },

      transaction_no: {
        type: DataTypes.STRING,
        allowNull: true,
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
        type: DataTypes.ENUM,
        defaultValue: "due",
        values: ["due", "overdue", "paid"],
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
        allowNull: true,
      },

      discount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    {
      modelName: "Invoice",
      tableName: "invoice",
      createdAt: false,
      updatedAt: true,
    }
  );

  return Invoice;
};
