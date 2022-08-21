const mongoose = require("mongoose");

const stateSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
});

const State = mongoose.model("State", stateSchema);

exports.State = State;

