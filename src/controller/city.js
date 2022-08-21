const _ = require("lodash");
const { City } = require("../models/city");
const { validateAddCity } = require("../validations/validations");

exports.getCity = async (req, res, next) => {
  let city = await City.find();
  // if (!user) return res.status(400).send("Invalid email or password");

  res.status(200).json(city);
};

exports.addCity = async (req, res, next) => {
  const { error } = validateAddCity(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const city = City(_.pick(req.body, [ "state", "name"]));

  const result = await city.save();

  res.status(200).json({
    success: true,
  });
};

exports.deleteCity = async (req, res, next) => {
  const result = await City.deleteOne({ _id: req.params.id });

  res.status(200).json({
    success: true,
  });
};