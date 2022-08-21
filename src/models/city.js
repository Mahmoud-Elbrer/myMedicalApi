const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  state: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "State",
    require: true,
  },
});

const City = mongoose.model("City", citySchema);

exports.City = City;

