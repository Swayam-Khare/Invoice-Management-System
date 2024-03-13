const bcrypt = require("bcrypt");
module.exports = (connectDB, DataTypes) => {
  const Vendor = connectDB.define(
    "Vendor",
    {
      // Model attributes are defined here
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true,
      },
      name:{
        type:DataTypes.STRING,
        allowNull:false,
      },
      shopName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            args: true,
            msg: "Please enter a valid email address!",
          },
        },
      },
      
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [8],
            msg: "Password must be at least 8 characters long",
          },
        },
      },
      confirmPassword: {
        type: DataTypes.VIRTUAL,
        allowNull: false,
        validate: {
          isConfirmed(value) {
            if (value !== this.password) {
              throw new Error("Password and confirm password does not match");
            }
          },
        },
      },
    },
    {
      // Other model options go here
      tableName: "vendor",
      timestamps: false,
      hooks: {
        beforeCreate: async (vendor) => {
          console.log("vendor is ", vendor);
          const hashedPassword = await bcrypt.hash(vendor.password, 10);
          vendor.password = hashedPassword;
          vendor.confirmPassword = undefined;
        },
      },
    }
  );

  return Vendor;
};
