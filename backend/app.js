const express = require("express");
const cors = require("cors");
const customerRoute = require("./routes/customerRoute");
const globalErrorHandler = require("./utils/globalErrorHandler");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/customers", customerRoute);

app.use(globalErrorHandler);

module.exports = app;
