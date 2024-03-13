module.exports = (connectDB, DataTypes) => {
    const Customer = connectDB.define(
      "Customer",
      {
        // Schema attributes
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          unique:true,
          allowNull:false,
          autoIncrement: true,
          autoIncrement: { initialValue: 0 },
        },
        name: {
          type: DataTypes.STRING(100),
          allowNull: false,
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
            args: [10, 10],
            msg: "Contact must have exactly 10 digits",
          },
        },
      },
        // Other model options go here
        {
            // options
            modelName: 'Customer',
            tableName: 'customer',
            timestamps: false
        }
  );
  
    return Customer;
};
  