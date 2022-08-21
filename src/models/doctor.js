const config = require("config");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  specialize: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Specialize",
    require: true,
  },
  city: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "City",
    require: true,
  },
  clinic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Clinic",
  },

  name: {
    type: String,
    require: true,
    minLength: 5,
    maxLength: 50,
  },
  phoneNumber: {
    type: Number,
    require: true,
  },
  email: {
    type: String,
    require: false,
    minLength: 5,
    maxLength: 255,
    unique: true,
  },
  gender: {
    type: Number,
    require: true,
  },
  bloodType: {
    type: String,
    require: true,
  },
  birthDay: {
    type: String,
    require: true,
  },
  experienceYears: {
    type: Number,
    require: true,
  },
  hospital: {
    type: String,
  },
  appointmentFee: {
    type: String,
    require: true,
  },
  aboutBio: {
    type: String,
    require: true,
  },
  image: {
    type: String,
  },
  longitude: {
    type: String,
    require: true,
  },
  Latitude: {
    type: String,
    require: true,
  },

  password: {
    type: String,
    require: true,
    minLength: 3,
    maxLength: 1024,
  },
  active: Boolean,
});

doctorSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, phoneNumber: this.phoneNumber, name: this.name },
    config.get("jwtPrivateKey"),
    { expiresIn: "100 days" }
  );
  return token;
};

const Doctor = mongoose.model("Doctor", doctorSchema);

exports.Doctor = Doctor;
