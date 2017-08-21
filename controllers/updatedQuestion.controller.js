var Questionbank = require("../models/questionbank.model");

exports.getupdatedQuestion = function(req, res, next) {
  var dynamic_question_id = req.params["_id"];
  req.app.locals.variable_i_need = dynamic_question_id; //Save _id into a global variable

  Questionbank.findById(dynamic_question_id)
    .then(function(editEntry) {
      res.render("updatedQuestion", {
        title: "Update this Question bank entry",
        question: editEntry.question,
        answer: editEntry.answer,
        author: editEntry.author
      });
    })
    .catch(function(err) {
      res.send("the requested search failed");
    });
};

exports.putupdatedQuestion = function(req, res, next) {
  Questionbank.findById(req.app.locals.variable_i_need) //find the selected document by _id
    .then(function(editEntry) {
      Questionbank.updateOne(
        {
          question: editEntry.question
        },
        {
          $set: {
            question: editEntry.question,
            answer: editEntry.answer,
            updatedAt: Date()
          }
        }
      );
      Questionbank.find({}) //list (25) the updated questionbank
        .sort({ updatedAt: -1 })
        .limit(25)
        .then(function(top25) {
          res.render("listQuestions", {
            title: "Most recent 25 entries to the Question Bank",
            listQuestions: top25
          });
        })
        .catch(function(err) {
          res.send("the requested search failed");
        });
    })
    .catch(function(err) {
      res.send("the requested search failed");
    });
};
