// grab the things we need
var mongoose = require("mongoose");
var Schema = require("mongoose").Schema;

// create a Questionbank schema
var questionbankSchema = new Schema(
  {
    question: {
      type: String,
      required: true,
      unique: true
    },
    answer: {
      type: String,
      required: true,
      unique: true
    },
    author: {
      type: String,
      required: true,
      unique: true
    }
  },
  {
    timestamps: true
  }
);

var Questionbank = mongoose.model(
  "questionbank",
  questionbankSchema,
  "questionbank"
); //Use the questionbank Schema

module.exports = Questionbank;
