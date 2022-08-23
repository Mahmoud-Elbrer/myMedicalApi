const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  city: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "City",
    require: true,
  },
});

const Medicine = mongoose.model("Medicine", medicineSchema);

exports.Medicine = Medicine;
