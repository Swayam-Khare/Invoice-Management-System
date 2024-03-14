const express = require("express");
const cors = require("cors");

const customerRouter = require("./routes/customerRoute");
const globalErrorHandler = require("./utils/globalErrorHandler");
const productRouter = require('./routes/productRoute')
const orderRouter = require('./routes/orderRoute')
const authRouter = require('./routes/authRoute');
const invoiceRouter = require ('./routes/invoiceRoute');
const vendorRouter = require('./routes/vendorRoute');
// USE MODULES HERE

const app = express();

app.use(cors());
app.use(express.json());

// USE ROUTES HERE
app.use("/api/v1/customers", customerRouter);
app.use("/api/v1/vendors",vendorRouter );
app.use('/api/v1/orders', orderRouter)
app.use('/api/v1/auth', authRouter);
app.use("/api/v1/invoices", invoiceRouter );
app.use('/api/v1/products', productRouter)


// ERROR HANDLER MUST BE DEFINED LAST
app.use(globalErrorHandler);


module.exports = app;
