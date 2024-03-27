const bcrypt = require("bcryptjs");

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
      // adding confirm field...
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
      lastPasswordChange: {
        type: DataTypes.DATE,
        allowNull: true,
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
      tableName: "admin",
      timestamps: false,
      hooks: {
        beforeCreate: async (admin) => {
          // console.log("admin is ", admin);
          const hashedPassword = await bcrypt.hash(admin.password, 10);
          admin.password = hashedPassword;
        },
        beforeUpdate: async (admin) => {
          if (admin.changed("password")) {
            const hashedPassword = await bcrypt.hash(admin.password, 10);
            admin.password = hashedPassword;
            admin.passwordChangedAt = Date.now();
          }
        },
        afterUpdate: async (admin) => {
          admin.confirmPassword = undefined;
        },
      },
    }
  );

  // Instance function to compare password in database
  Admin.prototype.comparePasswordInDb = async function (pswd, pswdDB) {
    return await bcrypt.compare(pswd, pswdDB);
  };

  Admin.prototype.isPasswordChanged = async function (JWTTimestamp) {
    if (this.passwordChangedAt) {
      const passwordChangedTimestamp = parseInt(
        this.passwordChangedAt.getTime() / 1000,
        10
      );
      return JWTTimestamp < passwordChangedTimestamp;
    }
    return false;
  };

  Admin.prototype.createResetPasswordToken = async function () {
    const resetToken = crypto.randomBytes(32).toString("hex");

    this.passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    this.passwordResetTokenExpires = Date.now() + 10 * 60 * 1000;
    return resetToken;
  };

  return Admin;
};
