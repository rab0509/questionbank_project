var router = require("express").Router();
var questionbankController = require("../controllers/updatedQuestion.controller");
var Questionbank = require("../models/questionbank.model");

router.route("/:_id").get(questionbankController.getupdatedQuestion);
router.route("/:_id").post(questionbankController.putupdatedQuestion);

module.exports = router;
