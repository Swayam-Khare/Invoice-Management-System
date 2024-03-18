const bcrypt = require("bcryptjs");
const crypto = require("crypto");

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
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
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
        allowNull: true,
        validate: {
          isConfirmed(value) {
            if (value !== this.password) {
              throw new Error("Password and confirm password does not match");
            }
          },
        },
      },
      lastPasswordChange: {
        type: DataTypes.DATE,
        allowNull: true, // Initially set to null or a default value
      },
      passwordResetToken: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      passwordResetTokenExpires: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      // Other model options go here
      tableName: "vendor",
      timestamps: false,
      hooks: {
        beforeCreate: async (vendor) => {
          // console.log("vendor is ", vendor);
          const hashedPassword = await bcrypt.hash(vendor.password, 10);
          vendor.password = hashedPassword;
          vendor.confirmPassword = undefined;
        },
        beforeUpdate: async (vendor) => {
          if (vendor.changed("password")) {
            const hashedPassword = await bcrypt.hash(vendor.password, 10);
            vendor.password = hashedPassword;
            vendor.lastPasswordChange = Date.now();
          }
        },
        afterUpdate: async (vendor) => {
          vendor.confirmPassword = undefined;
        },
      },
    }
  );

  // Instance function to compare password in database
  Vendor.prototype.comparePasswordInDb = async function (pswd, pswdDB) {
    return await bcrypt.compare(pswd, pswdDB);
  };

  Vendor.prototype.isPasswordChanged = async function (JWTTimestamp) {
    if (this.lastPasswordChange) {
      const passwordChangedTimestamp = parseInt(this.lastPasswordChange.getTime() / 1000, 10);
      console.log(passwordChangedTimestamp, JWTTimestamp);

      return JWTTimestamp < passwordChangedTimestamp;
    }
    return false;
  };

  Vendor.prototype.createResetPasswordToken = async function () {
    const resetToken = crypto.randomBytes(32).toString("hex");

    this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.passwordResetTokenExpires = Date.now() + 10 * 60 * 1000;
    // console.log(resetToken, this.passwordResetToken);
    return resetToken;
  };

  return Vendor;
};
