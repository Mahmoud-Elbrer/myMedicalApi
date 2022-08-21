const _ = require("lodash");
const { TimeTable } = require("../models/timetable");
const { validateAddTimeTable } = require("../validations/validations");

exports.getTimeTable = async (req, res, next) => {
  let timetable = await TimeTable.find({ user: req.user._id });
  // if (!user) return res.status(400).send("Invalid email or password");

  res.status(200).json(timetable);
};

exports.addTimeTable = async (req, res, next) => {
  const { error } = validateAddTimeTable(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // todo : if day exists then return it found

  const timetable = TimeTable(
    _.pick(req.body, ["doctor", "day", "from", "to"])
  );

  const result = await timetable.save();

  res.status(200).json({
    success: true,
    result: result,
  });
};

exports.deleteTimeTable = async (req, res, next) => {
  const result = await TimeTable.deleteOne({ _id: req.params.id });

  res.status(200).json({
    success: true,
  });
};

// search method
//  exports.searchTimeTable = async (req, res, next) => {
//   let TimeTable = await TimeTable.find({ name: new RegExp(req.params.name, "i") });
//   res.status(200).json(TimeTable);
// };
