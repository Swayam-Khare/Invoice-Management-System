
const bcrypt = require('bcryptjs');

module.exports = (connectDB, DataTypes) => {
  const Admin = connectDB.define(
    "Admin",
    {
      // Model attributes are defined here
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true,
      },
      name: {
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
      }

    },
    {
      // Other model options go here
      tableName: "admin",
      timestamps: false,
      hooks: {
        beforeCreate: async (admin) => {
          console.log("admin is ", admin);
          const hashedPassword = await bcrypt.hash(admin.password, 10);
          admin.password = hashedPassword;
        },
      },
    }
  );

  // Instance function to compare password in database
  Admin.prototype.comparePasswordInDb = async function (pswd, pswdDB) {
    return await bcrypt.compare(pswd, pswdDB);
  }

  return Admin;
}

