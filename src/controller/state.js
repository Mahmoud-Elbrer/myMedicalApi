const _ = require("lodash");
const { State } = require("../models/state");
const { validateAddState } = require("../validations/validations");

exports.getState = async (req, res, next) => {
  let state = await State.find();
  // if (!user) return res.status(400).send("Invalid email or password");

  res.status(200).json(state);
};

exports.addState = async (req, res, next) => {
  const { error } = validateAddState(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const state = State(_.pick(req.body, ["name"]));

  const result = await state.save();

  res.status(200).json({
    success: true,
  });
};

exports.deleteState = async (req, res, next) => {
  const result = await State.deleteOne({ _id: req.params.id });

  res.status(200).json({
    success: true,
  });
};