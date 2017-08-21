// grab the things we need
var mongoose = require("mongoose");
var Schema = require("mongoose").Schema;

// create a Questionbank schema
var authQuestionbankSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    passwordHash: {
      type: String,
      required: true,
      unique: true
    }
  },
  {
    timestamps: true
  }
);

var authQuestionbank = mongoose.model(
  "authQuestionbank",
  authQuestionbankSchema,
  "authQuestionbank"
);

module.exports = authQuestionbank;
