module.exports = (connectDB, DataTypes) => {
  const Customer = connectDB.define(
    "Customer",
    {
      // Schema attributes
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        allowNull: false,
        autoIncrement: true,
      },
      firstName: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            args: true,
            msg: "Please enter a valid email address!",
          },
        },
      },
      contact: {
        type: DataTypes.BIGINT,
        allowNull: false,
        validate: {
          len: {
            args: [10, 10],
            msg: "Contact must have exactly 10 digits",
          },
        },
      },
    },
    {
      // Other model options go here
      tableName: "customer",
      paranoid: true,
      createdAt: false,
      updatedAt: true,
    }
  );

  return Customer;
};
