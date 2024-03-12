const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
// const taskRoute = require("./routes/taskrouter");
const globalErrorHandler = require("./utils/globalErrorHandler");

// app.use("/api/v1", taskRoute);

app.use(globalErrorHandler);

module.exports = app;
