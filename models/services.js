const mongoose = require("mongoose");

const serviceSchema = mongoose.Schema({
  serviceName: String,
 

});

const Service = mongoose.model("services", serviceSchema);

module.exports = Service;
