var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

var index = require("./routes/index");
var users = require("./routes/users");
var listQuestions = require("./routes/listQuestions");
var listdynamicQuestions = require("./routes/listdynamicQuestions");
var newQuestion = require("./routes/newQuestion");
var updatedQuestion = require("./routes/updatedQuestion");

var login = require("./routes/login");
var signup = require("./routes/signup");
var validUser = require("./routes/validUser");

var app = express();

mongoose.connect(
  "mongodb://rab0509:71FilakovoAB@ds139288.mlab.com:39288/questionbank"
);

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error")); //Error Handling for connecting to DB

db.once("open", function() {
  //we're connected!
  console.log("Your questionbank DB is connected, Congratulations!!!");
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", index);
app.use("/users", users);
app.use("/listQuestions", listQuestions);
app.use("/listdynamicQuestions", listdynamicQuestions);
app.use("/newQuestion", newQuestion);
app.use("/updatedQuestion", updatedQuestion);

app.use("/login", login);
app.use("/signup", signup);
app.use("/validUser", validUser);

app.locals.variable_i_need = "id";
app.locals.token = "";

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
