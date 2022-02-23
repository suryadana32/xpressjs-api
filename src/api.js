const express = require("express");
const serverless = require('serverless-http');
const categoryRoutes = require("./routes/blog");
const app = express();

app.use(express.json());

app.use("/.netlify/functions/api", categoryRoutes);


module.exports.handler = serverless(app);