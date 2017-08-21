var router = require("express").Router();
var crypto = require("crypto");
var authQuestionbank = require("../models/authQuestionbank.model");

var algorithm = "aes-256-ctr";
var secret = "secretsauce";

function encrypt(text) {
  var cipher = crypto.createCipher(algorithm, secret);
  var crypted = cipher.update(text, "utf8", "hex");
  crypted += cipher.final("hex");
  return crypted;
}

exports.getLogin = function(req, res, next) {
  res.render("login");
};

exports.checkLogin = function(req, res, next) {
  authQuestionbank.aggregate(
    [
      {
        $match: {
          username: req.body.username, //check for user match by username and hash
          passwordHash: encrypt(req.body.password)
        }
      }
    ],
    function(err, payload) {
      if (err) {
        next(err);
      }
      if (payload == 0) {
        res.render("login", { error: "invalid username or password" });
      } else {
        console.log(req.body.username);
        res.render("validUser", {
          //username and hashed password validated!
          title: "User Name and Password Validated",
          userName: req.body.username,
          email: payload.email
        });
      }
    }
  );
};
