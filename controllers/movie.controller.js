const { supportedTypes } = require("../enums/imagesType.enum");
const {
  cerateMovieRecord,
  findAllMovies,
  findSingleMovie,
  updateSingleRecord,
  uploadMedia,
  validateMediaType,
} = require("../services/movie/movie.service");
const { Error, Success } = require("../services/response_messages.service");
const momemt = require("moment");

//Add movie record in DB
const addMovieRecord = async (req, res) => {
  try {
    if (!req.file || !req.body.movieData) {
      return Error(res, bodyValidationError, 400);
    }

    let testType = await validateMediaType(supportedTypes, req.file.mimetype);
    if (!testType) {
      return Error(res, imageValidation, 400);
    }

    const movieData = JSON.parse(req.body.movieData);

    const findDuplicate = await findSingleMovie({
      name: movieData.name,
      is_deleted: false,
      deletedAt: null,
    });

    if (findDuplicate) {
      return Error(res, duplicateRecord, 409);
    }

    //Upload image in local
    uploadMedia(req.file);

    const addRecord = await cerateMovieRecord({
      ...movieData,
      image: req.file.originalname,
    });

    return Success(res, addRecord, insertSuccess, 200);
  } catch (error) {
    console.log("addMovieRecord error:", error.message);
    return Error(res, error.message, 500);
  }
};

//Get all movie records
const getAllMovieData = async (req, res) => {
  try {
    const getAll = await findAllMovies({ is_deleted: false, deletedAt: null });

    return Success(res, getAll, fetchAll, 200);
  } catch (error) {
    console.log("getAllMovieData error:", error.message);
    return Error(res, error.message, 500);
  }
};

//Delete single movie record
const deleteMovieRecord = async (req, res) => {
  try {
    let getRecord = await findSingleMovie({
      _id: req.params.id,
      is_deleted: false,
      deletedAt: null,
    });

    if (!getRecord) {
      return Error(res, notFound, 404);
    }
    let updateRecprd = await updateSingleRecord(
      { _id: req.params.id },
      { is_deleted: true, deletedAt: momemt(new Date()) }
    );

    if (updateRecprd.acknowledged) {
      return Success(res, {}, deleteSuccess, 200);
    } else {
      return Error(res, wrongError, 500);
    }
  } catch (error) {
    console.log("deleteMovieRecord error:", error.message);
    return Error(res, error.message, 500);
  }
};

//Update single movie record
const updateMovieRecord = async (req, res) => {
  try {
    let { movieData, id } = req.body;
    if (!id || (!movieData && !req.file)) {
      return Error(res, bodyValidationError, 400);
    }

    let condition = { _id: id, is_deleted: false, deletedAt: null };
    let getRecord;
    getRecord = await findSingleMovie(condition);
    if (!getRecord) {
      return Error(res, notFound, 404);
    }

    let updateRecord;
    if (movieData) {
      movieData = JSON.parse(movieData);
      delete condition._id;
      getRecord = await findSingleMovie({ ...condition, name: movieData.name });
      if (getRecord) {
        return Error(res, duplicateRecord, 404);
      }
      updateRecord = await updateSingleRecord(
        { ...condition, _id: id },
        movieData
      );
    }

    //Upload image in local
    if (req.file) {
      let testType = await validateMediaType(supportedTypes, req.file.mimetype);
      if (!testType) {
        return Error(res, imageValidation, 400);
      }
      uploadMedia(req.file);
      updateRecord = await updateSingleRecord(condition, {
        image: req.file.originalname,
      });
    }

    if (updateRecord.acknowledged) {
      return Success(res, {}, updatedRecord, 200);
    } else {
      return Error(res, wrongError, 500);
    }
  } catch (error) {
    console.log("updateMovieRecord error:", error.message);
    return Error(res, error.message, 500);
  }
};

module.exports = {
  addMovieRecord,
  getAllMovieData,
  deleteMovieRecord,
  updateMovieRecord,
};
