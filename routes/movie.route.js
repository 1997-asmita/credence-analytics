const express = require("express");
const movieRoute = express.Router();
const multer = require("multer");
const upload = multer();
const {
  addMovieRecord,
  getAllMovieData,
  deleteMovieRecord,
  updateMovieRecord,
} = require("../controllers/movie.controller");

//Sub routes of movie collection
movieRoute.post("/create", upload.single("attachment"), addMovieRecord);
movieRoute.put("/update", upload.single("attachment"), updateMovieRecord);
movieRoute.delete("/delete/:id", deleteMovieRecord);
movieRoute.get("/getAll", getAllMovieData);

module.exports = movieRoute;
