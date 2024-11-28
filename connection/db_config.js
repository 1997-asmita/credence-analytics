const mongoose = require("mongoose");

function dbConnection() {
  try {
    mongoose.connect(`mongodb://${process.env.DB_URL}/${process.env.DB_NAME}`);
    console.log("Databse connected successfully!!!");
  } catch (error) {
    console.log("Database connection error:", error);
  }
}

module.exports = { dbConnection };
