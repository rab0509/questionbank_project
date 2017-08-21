var router = require("express").Router();
var questionbankController = require("../controllers/listQuestions.controller");
var Questionbank = require("../models/questionbank.model");

router.route("/").get(questionbankController.getlistQuestions);

module.exports = router;
