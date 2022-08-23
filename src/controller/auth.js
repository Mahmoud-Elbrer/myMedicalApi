const bcrypt = require("bcrypt");
const config = require("config");
const _ = require("lodash");
const https = require("https");
const { User } = require("../models/user");
const { Doctor } = require("../models/doctor");
const { Pharmacist } = require("../models/pharmacist");
const Otp = require("../models/otp");
const {
  validateSignIn,
  validateSignUp,
  validateSignUpDoctor,
} = require("../validations/validations");

exports.signIn = async (req, res, next) => {
  console.log("Header : ");
  console.log(req.header);

  const { error } = validateSignIn(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let auth;
  if (req.header == config.get("consumerUserKey")) {
    auth = await User.findOne({ phoneNumber: req.body.phoneNumber });
  } else if (req.header == config.get("consumerDoctorKey")) {
    auth = await Doctor.findOne({ phoneNumber: req.body.phoneNumber });
  } else if (req.header == config.get("consumerPharmacistKey")) {
    auth = await Pharmacist.findOne({ phoneNumber: req.body.phoneNumber });
  }
  if (!auth) return res.status(400).send("Invalid phoneNumber or password");

  const validPassword = await bcrypt.compare(req.body.password, auth.password);
  if (!validPassword)
    return res.status(400).send("Invalid phoneNumber or password");

  const token = auth.generateAuthToken();

  res.status(200).json({
    success: true,
    token: token,
    auth: auth,
  });
};

exports.signUp = async (req, res, next) => {


  let error;
  if (req.header == config.get("consumerUserKey")) {
     { error }   validateSignUp(req.body);
  } else if (req.header == config.get("consumerDoctorKey")) {
    { error }  validateSignUpDoctor(req.body);
  } else if (req.header == config.get("consumerPharmacistKey")) {
    { error } validateSignUp(req.body);
  }
  if (error) return res.status(400).send(error.details[0].message);

  let auth;
  if (req.header == config.get("consumerUserKey")) {
    console.log("hello11");
    auth = await User.findOne({ phoneNumber: req.body.phoneNumber });
  } else if (req.header == config.get("consumerDoctorKey")) {
    console.log("hello22");
    auth = await Doctor.findOne({ phoneNumber: req.body.phoneNumber });
  } else if (req.header == config.get("consumerPharmacistKey")) {
    console.log("hello33");
    auth = await Pharmacist.findOne({ phoneNumber: req.body.phoneNumber });
  }
  if (auth) return res.status(400).send("user already exists");

  if (req.header == config.get("consumerUserKey")) {
    auth = User(
      _.pick(req.body, [
        "name",
        "phoneNumber",
        "email",
        "gender",
        "bloodType",
        "password",
      ])
    );
  } else if (req.header == config.get("consumerDoctorKey")) {
    auth = Doctor(
      _.pick(req.body, [
        "name",
        "phoneNumber",
        "email",
        "gender",
        "bloodType",
        "specialize",
        "clinic",
        "city",
        "birthDay",
        "experienceYears",
        "hospital",
        "appointmentFee",
        "aboutBio",
        "image",
        "longitude",
        "Latitude",
        "password",
        "active",
      ])
    );
  } else if (req.header == config.get("consumerPharmacistKey")) {
    auth = Pharmacist(
      _.pick(req.body, [
        "name",
        "phoneNumber",
        "email",
        "gender",
        "bloodType",
        "password",
      ])
    );
  }

  const salt = await bcrypt.genSalt(10); //  10 it default value
  auth.password = await bcrypt.hash(auth.password, salt);

  await auth.save();

  const token = auth.generateAuthToken();

  res
    .header("x-auth-token", token)
    .send(_.pick(auth, ["_id", "name", "phoneNumber", "email"]));
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

exports.block = async (req, res, next) => {
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
