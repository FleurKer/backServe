const mongoose = require("mongoose");

const chatroomSchema = new mongoose.Schema({
  name: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  supplier: { type: mongoose.Schema.Types.ObjectId, ref: "suppliers" },
  message: [{ type: mongoose.Schema.Types.ObjectId, ref: "message" }],

});

const Chatroom = mongoose.model("chatrooms", chatroomSchema);
module.exports = Chatroom;
