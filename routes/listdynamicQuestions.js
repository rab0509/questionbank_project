var router = require("express").Router();
var questionbankController = require("../controllers/listdynamicQuestions.controller");
var Questionbank = require("../models/questionbank.model");

router.route("/").get(questionbankController.getlistdynamicQuestions);

module.exports = router;
