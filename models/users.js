const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    nom: String,
    prenom: String,
    email: String,
    phone: Number,
    password: String,
    token: String,
    photoUrl: String,
    languagesSpoken: String,
    city: { type: mongoose.Schema.Types.ObjectId, ref: "cities" },
    feedbacks: [{ type: mongoose.Schema.Types.ObjectId, ref: "feedbacks" }],
    // TABLEAU D OBJETS
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("users", userSchema);

module.exports = User;
