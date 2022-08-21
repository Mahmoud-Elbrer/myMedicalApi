const bcrypt = require("bcrypt");
const _ = require("lodash");
const https = require("https");
const { Doctor } = require("../models/doctor");
const Otp = require("../models/otp");
const {
  validateSignIn,
  validateSignUpDoctor,
} = require("../validations/validations");

exports.signIn = async (req, res, next) => {
  const { error } = validateSignIn(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let doctor = await Doctor.findOne({ phoneNumber: req.body.phoneNumber });
  if (!doctor) return res.status(400).send("Invalid phoneNumber or password");

  const validPassword = await bcrypt.compare(
    req.body.password,
    doctor.password
  );
  if (!validPassword)
    return res.status(400).send("Invalid phoneNumber or password");

  const token = doctor.generateAuthToken();

  res.status(200).json({
    success: true,
    token: token,
    doctor: doctor,
  });
};

exports.signUp = async (req, res, next) => {
  const { error } = validateSignUpDoctor(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let doctor = await Doctor.findOne({ phoneNumber: req.body.phoneNumber });
  if (doctor) return res.status(400).send("doctor already exists");

  doctor = Doctor(
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

  const salt = await bcrypt.genSalt(10); //  10 it default value
  doctor.password = await bcrypt.hash(doctor.password, salt);

  await doctor.save();

  const token = doctor.generateAuthToken();

  res
    .header("x-auth-token", token)
    .send(_.pick(doctor, ["_id", "name", "phoneNumber"]));
};

exports.sendOtp = async (req, res, next) => {
  var mathRandom = Math.floor(Math.random() * (99999 - 10000) + 10000);
  const passwordCompany = "806807";
  const doctorCompany = "sadad";
  const message = " كود التحقق " + mathRandom + " تطبيق عقاري  ";
  const phoneNumber = req.body.phoneNumber;
  const requestHttps = https.request(
    "https://sms.nilogy.com/app/gateway/gateway.php?sendmessage=1&doctorname=محمود عبدالله&numbers=" +
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
          let doctor = Doctor.findOne({ phoneNumber: req.body.phoneNumber });
          let result;
          if (doctor) {
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

exports.blockDoctor = async (req, res, next) => {
  let doctor = await Doctor.findOne({ phoneNumber: req.body.phoneNumber });
  if (!doctor) return res.status(400).send("Invalid phoneNumber or password");

  await Doctor.updateOne(
    { phoneNumber: req.body.phoneNumber },
    {
      $set: {
        active: !doctor.active,
      },
    }
  );

  res.status(200).json({
    success: true,
  });
};
