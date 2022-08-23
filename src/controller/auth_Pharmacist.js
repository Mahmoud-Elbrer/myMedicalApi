const bcrypt = require("bcrypt");
const _ = require("lodash");
const https = require("https");
const { Pharmacist } = require("../models/pharmacist");
const Otp = require("../models/otp");
const {
  validateSignIn,
  validateSignUp,
} = require("../validations/validations");

exports.signIn = async (req, res, next) => {
  const { error } = validateSignIn(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let pharmacist = await Pharmacist.findOne({ phoneNumber: req.body.phoneNumber });
  if (!pharmacist) return res.status(400).send("Invalid phoneNumber or password");

  const validPassword = await bcrypt.compare(req.body.password, pharmacist.password);
  if (!validPassword)
    return res.status(400).send("Invalid phoneNumber or password");

  const token = pharmacist.generateAuthToken();

  res.status(200).json({
    success: true,
    token: token
  });
};

exports.signUp = async (req, res, next) => {
  const { error } = validateSignUp(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let pharmacist = await Pharmacist.findOne({ phoneNumber: req.body.phoneNumber });
  if (pharmacist) return res.status(400).send("pharmacist already exists");

  pharmacist = Pharmacist(
    _.pick(req.body, [
      "name",
      "phoneNumber",
      "email",
      "gender",
      "bloodType",
      "password",
    ])
  );

  const salt = await bcrypt.genSalt(10); //  10 it default value
  pharmacist.password = await bcrypt.hash(pharmacist.password, salt);

  await pharmacist.save();

  const token = pharmacist.generateAuthToken();

  res
    .header("x-auth-token", token)
    .send(_.pick(pharmacist, ["_id", "name", "phoneNumber", "email"]));
};

exports.sendOtp = async (req, res, next) => {
  var mathRandom = Math.floor(Math.random() * (99999 - 10000) + 10000);
  const passwordCompany = "806807";
  const pharmacistCompany = "sadad";
  const message = " كود التحقق " + mathRandom + " تطبيق عقاري  ";
  const phoneNumber = req.body.phoneNumber;
  const requestHttps = https.request(
    "https://sms.nilogy.com/app/gateway/gateway.php?sendmessage=1&pharmacistname=محمود عبدالله&numbers=" +
      req.body.phoneNumber +
      "&sender=Eyatac",
    (method = "GET"),
    (responseHttps) => {
      responseHttps.on("data", (d) => {
        if (responseHttps.statusMessage === "OK") {
          let now = new Date();
          const newOtp = {
            phoneNumber: phoneNumber,
            otpCode: mathRandom,
            otpTimesTamp: now,
            otpTries: result[0].otpTries + 1,
          };
          let pharmacist = Pharmacist.findOne({ phoneNumber: req.body.phoneNumber });
          let result;
          if (pharmacist) {
            result = Otp.updateOne(
              { phoneNumber: req.body.phoneNumber },
              { $set: newOtp }
            );
          } else {
            result = Otp.save();
          }
          res.status(200).json({
            success: true,
            result: result,
          });
        }
      });
    }
  );
  requestHttps.on("error", (error) => {
    res.status(400).json({
      success: false,
      error: error,
    });
  });
  requestHttps.end();
};

exports.blockPharmacist = async (req, res, next) => {
  let pharmacist = await Pharmacist.findOne({ phoneNumber: req.body.phoneNumber });
  if (!pharmacist) return res.status(400).send("Invalid phoneNumber or password");

  await Pharmacist.updateOne(
    { phoneNumber: req.body.phoneNumber },
    {
      $set: {
        isAvailable: !pharmacist.isAvailable,
      },
    }
  );

  res.status(200).json({
    success: true,
  });
};
