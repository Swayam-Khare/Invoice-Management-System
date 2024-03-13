module.exports = (connectDB, DataTypes) => {
    const Vendor = connectDB.define(
      "Vendor",
      {
        // Model attributes are defined here
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
          unique:true,
          autoIncrement: true
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
        contact: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            args: [10, 10],
            msg: "Contact must have exactly 10 digits",
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

        role : {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
              isIn: {
                args: [['vendor', 'admin']],
                msg: "Role must be either 'vendor' or 'admin'"
              }
          }
      }
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
  