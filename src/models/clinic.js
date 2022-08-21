const mongoose = require("mongoose");

const clinicSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
});

const Clinic = mongoose.model("Clinic", clinicSchema);

exports.Clinic = Clinic;

