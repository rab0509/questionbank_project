var router = require("express").Router();
var authController = require("../controllers/validUser.controller");

router.route("/").get(authController.validUser);

module.exports = router;
