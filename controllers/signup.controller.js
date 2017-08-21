var router = require("express").Router();
var crypto = require("crypto");
var jwt = require("jsonwebtoken");
var authQuestionbank = require("../models/authQuestionbank.model");

var algorithm = "aes-256-ctr";
var secret = "secretsauce";

function encrypt(text) {
  var cipher = crypto.createCipher(algorithm, secret);
  var crypted = cipher.update(text, "utf8", "hex");
  crypted += cipher.final("hex");
  return crypted;
}

exports.getSignUp = function(req, res, next) {
  res.render("signup");
};

exports.signupNewUser = function(req, res, next) {
  var timeStamp = Date();

  var newQbUser = new authQuestionbank({
    username: req.body.username,
    email: req.body.email,
    passwordHash: encrypt(req.body.password),
    createdAt: timeStamp
  });

  authQuestionbank.findOne({ username: req.body.username }, function(
    err,
    username
  ) {
    if (err) {
      next(err);
    }
    if (username) {
      res.render("signup", { signUpMessage: "Username Already Exists" });
    } else {
      authQuestionbank.findOne({ email: req.body.email }, function(err, email) {
        if (err) {
          next(err);
        }
        if (email) {
          res.render("signup", { signUpMessage: "Email Already Exists" });
        } else {
          newQbUser.save(function(err, payload) {
            if (err) {
              next(err);
            }
            {
              var qBankToken = jwt.sign(
                { username: req.body.username },
                "loremipsum"
              );
              req.app.locals.token = qBankToken; //save the JWT
              return res.render("login", {
                userName: req.body.username,
                email: req.body.email,
                token: qBankToken
              });
            }
          });
        }
      });
    }
  });
};
