const mongoose = require("mongoose");

const supplierSchema = mongoose.Schema({
  nom: String,
  prenom: String,
  email: String,
  phone: Number,
  password: String,
  photoUrl: String,
  languagesSpoken: String,
  presentation: String,
  serviceDetail: String,
  supplierPrice: Number,
  availableStartDate: Date,
  availableEndDate: Date,
  city: { type: mongoose.Schema.Types.ObjectId, ref: "cities" },
  service: { type: mongoose.Schema.Types.ObjectId, ref: "services" },
  feedbacks: [{ type: mongoose.Schema.Types.ObjectId, ref: "feedbacks" }],
});

const Supplier = mongoose.model("suppliers", supplierSchema);

module.exports = Supplier;
