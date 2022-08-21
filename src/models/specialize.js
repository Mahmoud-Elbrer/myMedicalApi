const mongoose = require("mongoose");

const specializeSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
});

const Specialize = mongoose.model("Specialize", specializeSchema);

exports.Specialize = Specialize;

