const _ = require("lodash");
const { Medicine } = require("../models/medicine");
const { validateAddMedicine } = require("../validations/validations");

exports.getMedicine = async (req, res, next) => {

  let medicine = await Medicine.find({ user: req.user._id });
  // if (!user) return res.status(400).send("Invalid email or password");

  res.status(200).json(medicine);
};

exports.addMedicine = async (req, res, next) => {
  const { error } = validateAddMedicine(req.body);
  if (error) return res.status(400).send(error.details[0].messassge);

  const medicine = Medicine(_.pick(req.body, ["user", "name" ,"city"]));

  const result = await medicine.save();

  res.status(200).json({
    success: true,
    result: result,
  });
};

exports.deleteMedicine = async (req, res, next) => {
  const result = await Medicine.deleteOne({ _id: req.params.id });

  res.status(200).json({
    success: true,
  });
};

// search method
//  exports.searchMedicine = async (req, res, next) => {
//   let Medicine = await Medicine.find({ name: new RegExp(req.params.name, "i") });
//   res.status(200).json(Medicine);
// };
