const { Sequelize, DataTypes } = require("sequelize");

const database = process.env.DATABASE;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;

// ==== TO CONNECT TO LOCAL DATABASE ====
const sequelize = new Sequelize(database, user, password, {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

// ==== TO CONNECT TO REMOTE DATABASE ====
// const sequelize = new Sequelize(
//   "postgres://invoice_db_v42o_user:QIAZyxp8hRZmEtlSTK17jYpAsNin4Az0@dpg-cnnvqr021fec73arfgvg-a.singapore-postgres.render.com/invoice_db_v42o?ssl=true"
// );

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
// db.Vendor = require('./vendorModel')(sequelize, DataTypes);

// Create separate file for each model schema.
// Add your model here:
// Ex - db.<ModelName> = require('<model-path>')(sequilize, DataTypes);

db.Product = require("./productModel")(sequelize, DataTypes);
db.Invoice = require("./invoiceModel")(sequelize, DataTypes);
db.Order = require("./orderModel")(sequelize, DataTypes);
db.Customer = require("./customerModel")(sequelize, DataTypes);

const check = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await db.sequelize.sync({ force: true });
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = { db, check };
