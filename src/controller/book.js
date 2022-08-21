const _ = require("lodash");
const { Book } = require("../models/book");
const { validateAddBook } = require("../validations/validations");

exports.getBook = async (req, res, next) => {
  console.log(req.user._id );

  let book = await Book.find({ user: req.user._id }).populate("doctor", "-password").populate("user", "-password").populate("timeTableId");            

  res.status(200).json(book);
};

exports.addBook = async (req, res, next) => {
  const { error } = validateAddBook(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // todo : should add time
  // let date = new Date();

  let book = await Book(
    _.pick(req.body, ["user", "doctor", "timeTableId", "status" ,  "createdAt"])
  );

  const result = await book.save();

  // todo : should send notification to user oder

  res.status(200).json({
    success: true,
  });
};

exports.cancelBook = async (req, res, next) => {
  let book = await Book.findOne({ _id: req.params.id });
  if (!book) return res.status(400).send("Invalid Booking");

  await Book.updateOne(
    { _id: req.params.id },
    {
      $set: {
        active: !book.active,
      },
    }
  );

  res.status(200).json({
    success: true,
  });
  d;
};
