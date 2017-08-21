var Questionbank = require("../models/questionbank.model");

exports.getQuestion = function(req, res, next) {
  res.render("newQuestion", {
    title: "Add a new entry to the Question bank"
  });
};

exports.postnewQuestions = function(req, res, next) {
  var q = req.body;
  var newQuestion = new Questionbank({
    question: q.question,
    answer: q.answer,
    author: q.author
  });

  newQuestion.save(function(err, payload) {
    if (err) {
      var errMessage = "";
      for (var errName in err.errors) {
        switch (err.errors[errName].type) {
          case ValidationErrors.REQUIRED:
            errMessage += "Missing Field " + errName + "\r\n";
            break;
          case ValidationErrors.NOTVALID:
            errMessage = "Invalid Field " + errName + "\r\n";
            break;
        }
      }
      res.send(errMessage);
    } else {
      res.redirect("/listdynamicQuestions");
    }
  });
};
