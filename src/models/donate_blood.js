const mongoose = require("mongoose");

const donateBloodSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  bloodGroup: {
    type: String,
    require: true,
  },
  unitBlood: {
    type: Number,
    require: true,
  },
  status: {
    type: String,
    require: true,
  },
  location: {
    type: String,
    require: true,
  },
  active: Boolean,
});

const DonateBlood = mongoose.model("DonateBlood", donateBloodSchema);

exports.DonateBlood = DonateBlood;
