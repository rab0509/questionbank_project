var router = require("express").Router();

exports.validUser = function(req, res, next) {
  res.render("validUser", {
    title: "Username/Password Validated",
    userName: req.body.username,
    eMail: req.body.email
  });
};
