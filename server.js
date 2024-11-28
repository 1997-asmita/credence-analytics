const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./services/common_messages");
const fs = require("fs");

const { dbConnection } = require("./connection/db_config");
const allRoutes = require("./routes/index");
dbConnection();

const port = process.env.PORT || 5000;
const app = express();

//Internal middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (!fs.existsSync("public/images")) {
  fs.mkdirSync("public/images", { recursive: true });
}

//Root route of entire app
app.use("/api", allRoutes);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
