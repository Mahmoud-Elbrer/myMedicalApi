const { Clinic } = require("../models/clinic");
const { validateAddSpecialize } = require("../validations/validations");

exports.getClinic = async (req, res, next) => {
  let clinic = await Clinic.find();
  // if (!user) return res.status(400).send("Invalid email or password");

  res.status(200).json(clinic);
};

exports.addClinic = async (req, res, next) => {
  const { error } = validateAddSpecialize(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const clinic = new Clinic({
    name: req.body.name,
  });

  const result = await clinic.save();

  res.status(200).json({
    success: true,
  });
};

exports.deleteClinic = async (req, res, next) => {
  const result = await Clinic.deleteOne({ _id: req.params.Id });

  res.status(200).json({
    success: true,
  });
};

// search method
//  exports.searchClinic = async (req, res, next) => {
//   let Clinic = await Clinic.find({ name: new RegExp(req.params.name, "i") });
//   res.status(200).json(Clinic);
// };
