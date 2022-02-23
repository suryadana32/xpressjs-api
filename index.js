const express = require("express");
const categoryRoutes = require("./routes/blog");
const app = express();

const port = 3000;

app.use(express.json());

app.use("/category", categoryRoutes);

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});