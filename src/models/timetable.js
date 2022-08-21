const mongoose = require("mongoose");

const timetableSchema = new mongoose.Schema({
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    require: true,
  },
  day: {
    type: Number,
    require: true,
  },
  from: {
    type: String,
    require: true,
  },
  to: {
    type: String,
    require: true,
  },
  isActive: {
    type: Boolean,
  },

});

const TimeTable = mongoose.model("TimeTable", timetableSchema);

exports.TimeTable = TimeTable;
