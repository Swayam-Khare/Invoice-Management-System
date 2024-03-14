const express = require("express");
const cors = require("cors");

const customerRouter = require("./routes/customerRoute");
const globalErrorHandler = require("./utils/globalErrorHandler");
const productRouter = require("./routes/productRoute");
const orderRouter = require("./routes/orderRoute");
const authRouter = require("./routes/authRoute");
const invoiceRouter = require("./routes/invoiceRoute");
const vendorRoutes = require("./routes/vendorRoute");

// USE MODULES HERE
const app = express();
app.use(cors());
app.use(express.json());

// ========================Invoice Router ====================

// USE ROUTES HERE
app.use("/api/v1", vendorRoutes);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/invoices", invoiceRouter);
app.use("/api/products", productRouter);
app.use("/api/customer", customerRouter);

// ERROR HANDLER MUST BE DEFINED LAST
app.use(globalErrorHandler);

module.exports = app;
