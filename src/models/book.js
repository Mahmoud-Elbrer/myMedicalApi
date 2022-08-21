const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    require: true,
  },
  timeTableId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TimeTable",
    require: true,
  },
  status: {
    type: Number,
    require: true,
  },
  createdAt: {
    type: String,
    require: true,
  },
});

const Book = mongoose.model("Book", bookSchema);

exports.Book = Book;
