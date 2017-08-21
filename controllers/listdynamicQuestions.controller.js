var Questionbank = require("../models/questionbank.model");

exports.getlistdynamicQuestions = function(req, res, next) {
  Questionbank.find({})
    .sort({ updatedAt: -1 })
    .limit(25)
    .then(function(top25) {
      res.render("listdynamicQuestions", {
        title: "Most recent 25 entries to the Question Bank",
        listdynamicQuestions: top25
      });
    })
    .catch(function(err) {
      res.send("the requested search failed");
    });
};
