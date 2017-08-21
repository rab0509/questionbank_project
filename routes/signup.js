var router = require("express").Router();
var authController = require("../controllers/signup.controller");
var authQuestionbank = require("../models/authQuestionbank.model");

router.route("/").get(authController.getSignUp);
router.route("/").post(authController.signupNewUser);

module.exports = router;
