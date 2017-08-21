var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.render("homepage");
});

module.exports = router;

/*
var router = require("express").Router();
var questionbankController = require("../controllers/questionbank.controller");
var Questionbank = require("../models/questionbank.model");

router.route("/").get(questionbankController.getLogin);

module.exports = router;
*/
