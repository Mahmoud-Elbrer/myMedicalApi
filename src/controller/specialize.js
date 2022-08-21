const { Specialize } = require("../models/specialize");
const { validateAddSpecialize } = require("../validations/validations");

exports.getSpecialize = async (req, res, next) => {
  let specialize = await Specialize.find();
  // if (!user) return res.status(400).send("Invalid email or password");

  res.status(200).json(specialize);
};

exports.addSpecialize = async (req, res, next) => {
  const { error } = validateAddSpecialize(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const specialize = new Specialize({
    name: req.body.name,
  });

  const result = await specialize.save();

  res.status(200).json({
    success: true,
  });
};

exports.deleteSpecialize = async (req, res, next) => {
  const result = await Specialize.deleteOne({ _id: req.params.specializeId });

  res.status(200).json({
    success: true,
  });
};

// search method
//  exports.searchSpecialize = async (req, res, next) => {
//   let Specialize = await Specialize.find({ name: new RegExp(req.params.name, "i") });
//   res.status(200).json(Specialize);
// };
