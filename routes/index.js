const express = require("express");
const allRoutes = express.Router();
const movieRoute = require("./movie.route");

//Main routes of each collection
allRoutes.use("/movie", movieRoute);

module.exports = allRoutes;
