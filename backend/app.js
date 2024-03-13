const express = require("express");
const cors = require("cors");


const authRouter = require('./routes/authRoute');


const app = express();
app.use(cors());
app.use(express.json());


// ========================Invoice Router ====================
const invoiceRouter = require ('./routes/invoiceRoute');

// const taskRoute = require("./routes/taskrouter");
const globalErrorHandler = require("./utils/globalErrorHandler");

// app.use("/api/v1", taskRoute);


app.use('/api/v1/auth', authRouter);

app.use("/api/v1/invoices", invoiceRouter );

app.use(globalErrorHandler);


module.exports = app;
