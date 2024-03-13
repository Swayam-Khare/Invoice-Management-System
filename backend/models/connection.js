const { Sequelize, DataTypes } = require("sequelize");

const database = process.env.DATABASE;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;

// ==== TO CONNECT TO LOCAL DATABASE ====
const connectDB = new Sequelize(database, user, password, {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

// ==== TO CONNECT TO REMOTE DATABASE ====
// const connectDB = new Sequelize(
//   "postgres://invoice_db_v42o_user:QIAZyxp8hRZmEtlSTK17jYpAsNin4Az0@dpg-cnnvqr021fec73arfgvg-a.singapore-postgres.render.com/invoice_db_v42o?ssl=true"
// );

const db = {};
db.Sequelize = Sequelize;
db.connectDB = connectDB;
// db.Vendor = require('./vendorModel')(sequelize, DataTypes);

// Create separate file for each model schema.
// Add your model here:
// Ex - db.<ModelName> = require('<model-path>')(sequilize, DataTypes);

db.Product = require("./productModel")(connectDB, DataTypes);
db.Invoice = require("./invoiceModel")(connectDB, DataTypes);
db.Order = require("./orderModel")(connectDB, DataTypes);
db.Customer = require("./customerModel")(connectDB, DataTypes);
db.Address = require("./addressModel")(connectDB, DataTypes);
db.Vendor = require("./vendorModel")(connectDB, DataTypes);

const check = async () => {
  try {
    await connectDB.authenticate();
    console.log("Connection has been established successfully.");
<<<<<<< HEAD
    await db.sequelize.sync({ force: false });
=======
    await db.connectDB.sync({ force: true });
>>>>>>> 4d4e64528b794ee2e768276e8a6944666142c4c0
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = { db, check };
