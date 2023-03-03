const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  message: String,
  time: String,
  date: String,
  chatroom: { type: mongoose.Schema.Types.ObjectId, ref: "chatrooms" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  supplier: { type: mongoose.Schema.Types.ObjectId, ref: "suppliers" },



});

module.exports = mongoose.model("messages", messageSchema);