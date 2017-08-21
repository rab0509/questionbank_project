var router = require("express").Router();
var authController = require("../controllers/login.controller");
var authQuestionbank = require("../models/authQuestionbank.model");

router.route("/").get(authController.getLogin);
router.route("/").post(authController.checkLogin);

module.exports = router;
