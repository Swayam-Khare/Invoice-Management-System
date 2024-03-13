const express = require("express");
const cors = require("cors");
const globalErrorHandler = require("./utils/globalErrorHandler");
const productRouter = require('./routes/productRoute')
// USE MODULES HERE
const app = express();
app.use(cors());
app.use(express.json());
const orderRouter = require('./routes/orderRoute')
const authRouter = require('./routes/authRoute');
const app = express();
app.use(cors());
app.use(express.json());
// ========================Invoice Router ====================
const invoiceRouter = require ('./routes/invoiceRoute');
// const taskRoute = require("./routes/taskrouter");
// app.use("/api/v1", taskRoute);
app.use('/api/v1/orders', orderRouter)
app.use('/api/v1/auth', authRouter);
app.use("/api/v1/invoices", invoiceRouter );
// USE ROUTES HERE
app.use('/api/products', productRouter)
// ERROR HANDLER MUST BE DEFINED LAST
app.use(globalErrorHandler);


module.exports = app;
