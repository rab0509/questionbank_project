var router = require("express").Router();
var questionbankController = require("../controllers/newQuestion.controller");
var Questionbank = require("../models/questionbank.model");

router.route("/").get(questionbankController.getQuestion);
router.route("/").post(questionbankController.postnewQuestions);

module.exports = router;
