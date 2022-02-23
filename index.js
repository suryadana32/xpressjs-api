const express = require("express");
const serverless = require('serverless-http');
const categoryRoutes = require("./routes/blog");
const app = express();

const port = 3000;

app.use(express.json());

app.use("/category", categoryRoutes);


module.exports.handler = serverless(app);