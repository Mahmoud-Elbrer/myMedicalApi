const mongoose = require("mongoose");

const medicineOrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  pharmacist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pharmacist",
    require: true,
  },
  medicine: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Medicine",
    require: true,
  },
  status: {
    type: Number,
    require: true,
  },
});

const MedicineOrder = mongoose.model("MedicineOrder", medicineOrderSchema);

exports.MedicineOrder = MedicineOrder;
