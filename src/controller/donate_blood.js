const _ = require("lodash");
const { DonateBlood } = require("../models/donate_blood");
const { validateAddDonateBlood } = require("../validations/validations");

exports.getDonateBlood = async (req, res, next) => {
  console.log(req.user._id );

  let donateBlood = await DonateBlood.find({ user: req.user._id }).populate("user", "-password");            

  res.status(200).json(donateBlood);
};

exports.addDonateBlood = async (req, res, next) => {
  const { error } = validateAddDonateBlood(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // todo : should add time
  // let date = new Date();

  let donateBlood = await DonateBlood(
    _.pick(req.body, ["user",  "bloodGroup" ,"unitBlood", "status", "location" ])
  );

  const result = await donateBlood.save();

  // todo : should send notification to user oder

  res.status(200).json({
    success: true,
  });
};

exports.cancelDonateBlood = async (req, res, next) => {
  let donateBlood = await DonateBlood.findOne({ _id: req.params.id });
  if (!donateBlood) return res.status(400).send("Invalid DonateBlooding");

  await DonateBlood.updateOne(
    { _id: req.params.id },
    {
      $set: {
        active: !donateBlood.active,
      },
    }
  );

  res.status(200).json({
    success: true,
  });
  d;
};
