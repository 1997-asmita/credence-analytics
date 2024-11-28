const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, nameRequiredd],
      trim: true,
      validate: {
        validator: function (value) {
          return !/^\s*$/.test(value);
        },
        message: whiteSpacePrevent,
      },
    },
    image: {
      type: String,
      required: [true, imageRequiredd],
    },
    summary: {
      type: String,
      required: [true, summaryRequiredd],
      minLength: [5, minLengthPrevent],
      maxLength: [50, maxLengthPrevent],
      validate: {
        validator: function (value) {
          return !/^\s*$/.test(value);
        },
        message: whiteSpacePrevent,
      },
    },
    deletedAt: {
      type: Date,
      required: false,
      default: null,
    },
    is_deleted: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("movie", movieSchema);
