const express = require("express");
const cors = require("cors");
const globalErrorHandler = require("./utils/globalErrorHandler");
const productRouter = require('./routes/productRoute')


// USE MODULES HERE
const app = express();
app.use(cors());
app.use(express.json());


// USE ROUTES HERE
app.use('/api/products', productRouter)


// ERROR HANDLER MUST BE DEFINED LAST
app.use(globalErrorHandler);

module.exports = app;
