const mongoose = require("mongoose");

const citySchema = mongoose.Schema({
  cityName: String,
  supplier: [{ type: mongoose.Schema.Types.ObjectId, ref: "suppliers" }],

});

const City = mongoose.model("cities", citySchema);

module.exports = City;