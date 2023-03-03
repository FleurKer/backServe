const mongoose = require("mongoose");

const feedbackSchema = mongoose.Schema({
  prenom: String,
  date: String,
  note: Number,
  comment: String,
});

const Feedback = mongoose.model("feedbacks", feedbackSchema);

module.exports = Feedback;
