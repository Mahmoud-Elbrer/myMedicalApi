const _ = require("lodash");
const { Favorite } = require("../models/favorite");
const { validateAddFavorite } = require("../validations/validations");

exports.getFavorite = async (req, res, next) => {

  let favorite = await Favorite.find({ user: req.user._id });
  // if (!user) return res.status(400).send("Invalid email or password");

  res.status(200).json(favorite);
};

exports.addFavorite = async (req, res, next) => {
  const { error } = validateAddFavorite(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const favorite = Favorite(_.pick(req.body, ["user", "doctor"]));

  const result = await favorite.save();

  res.status(200).json({
    success: true,
    result: result,
  });
};

exports.deleteFavorite = async (req, res, next) => {
  const result = await Favorite.deleteOne({ _id: req.params.id });

  res.status(200).json({
    success: true,
  });
};

// search method
//  exports.searchFavorite = async (req, res, next) => {
//   let Favorite = await Favorite.find({ name: new RegExp(req.params.name, "i") });
//   res.status(200).json(Favorite);
// };
