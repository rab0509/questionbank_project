var Questionbank = require("../models/questionbank.model");

exports.getLogin = function(req, res, next) {
  res.render("login");
};
