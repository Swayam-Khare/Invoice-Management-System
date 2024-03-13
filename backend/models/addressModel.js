module.exports = (connectDB, DataTypes)=>{
    const Address = connectDB.define('Address', {
        address_lane1 : {
            type: DataTypes.STRING
        },
        address_lane2 : {
            type: DataTypes.STRING
        },
        landmark : {
            type: DataTypes.STRING
        },
        pincode : {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                args: [6, 6],
                msg: "Pincode must have exactly 6 digits"
            }
        },
        state : {
            type: DataTypes.STRING,
            allowNull: false
        },
        contact: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              args: [10, 10],
              msg: "Contact must have exactly 10 digits",
            },
        },
        role : {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: {
                  args: [['vendor', 'customer']],
                  msg: "Role must be either 'vendor' or 'customer'"
                }
            }
        },
        roleId:{
            type:DataTypes.INTEGER

        }

    },{
        modelName: 'Address',
        tableName: 'address',
        timestamps: false
    })
    return Address;
}