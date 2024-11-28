const movie = require("../../schemas/movie.schema");
const path = require("path");
const fs = require("fs");

const cerateMovieRecord = async (payload) => {
  try {
    const createRecord = await movie.create(payload);
    return createRecord;
  } catch (error) {
    throw error;
  }
};

const validateMediaType = async (supportedTypes, mimetype) => {
  try {
    supportedTypes = supportedTypes.includes(mimetype);
    return supportedTypes;
  } catch (error) {
    throw error;
  }
};

const uploadMedia = (media) => {
  try {
    let filePath = path.join(__dirname, "..", "..", "public", "images");
    filePath = path.join(filePath, media.originalname);
    let createStream = fs.createWriteStream(filePath);
    createStream.write(media.buffer);
  } catch (error) {
    throw error;
  }
};

const findSingleMovie = async (condition) => {
  try {
    const findRecord = await movie.findOne(condition);
    return findRecord;
  } catch (error) {
    throw error;
  }
};

const findAllMovies = async (condition) => {
  try {
    const findAllRecord = await movie.find(condition);
    return findAllRecord;
  } catch (error) {
    throw error;
  }
};

const updateSingleRecord = async (condition, payload) => {
  try {
    const updateRecord = await movie.updateOne(condition, payload);
    return updateRecord;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  cerateMovieRecord,
  findSingleMovie,
  findAllMovies,
  updateSingleRecord,
  uploadMedia,
  validateMediaType,
};
