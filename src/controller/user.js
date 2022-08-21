const bcrypt = require("bcrypt");
const _ = require("lodash");
const https = require("https");
const { User } = require("../models/user");
const Otp = require("../models/otp");
const {
  validateSignIn,
  validateSignUp,
} = require("../validations/validations");

exports.signIn = async (req, res, next) => {
  const { error } = validateSignIn(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ phoneNumber: req.body.phoneNumber });
  if (!user) return res.status(400).send("Invalid phoneNumber or password");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).send("Invalid phoneNumber or password");

  const token = user.generateAuthToken();

  res.status(200).json({
    success: true,
    token: token
  });
};

exports.signUp = async (req, res, next) => {
  const { error } = validateSignUp(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ phoneNumber: req.body.phoneNumber });
  if (user) return res.status(400).send("user already exists");

  user = User(
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
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const token = user.generateAuthToken();

  res
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id", "name", "phoneNumber", "email"]));
};

exports.sendOtp = async (req, res, next) => {
  var mathRandom = Math.floor(Math.random() * (99999 - 10000) + 10000);
  const passwordCompany = "806807";
  const userCompany = "sadad";
  const message = " كود التحقق " + mathRandom + " تطبيق عقاري  ";
  const phoneNumber = req.body.phoneNumber;
  const requestHttps = https.request(
    "https://sms.nilogy.com/app/gateway/gateway.php?sendmessage=1&username=محمود عبدالله&numbers=" +
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
          let user = User.findOne({ phoneNumber: req.body.phoneNumber });
          let result;
          if (user) {
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

exports.blockUser = async (req, res, next) => {
  let user = await User.findOne({ phoneNumber: req.body.phoneNumber });
  if (!user) return res.status(400).send("Invalid phoneNumber or password");

  await User.updateOne(
    { phoneNumber: req.body.phoneNumber },
    {
      $set: {
        isAvailable: !user.isAvailable,
      },
    }
  );

  res.status(200).json({
    success: true,
  });
};
