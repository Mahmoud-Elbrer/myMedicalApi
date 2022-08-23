const config = require("config");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const pharmacistSchema = new mongoose.Schema({
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
  city: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "City",
    require: true,
  },
  gender: {
    type: Number,
    require: true,
  },
  bloodType: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
    minLength: 3,
    maxLength: 1024,
  },
});

// information export principle : oop

pharmacistSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, phoneNumber: this.phoneNumber, name: this.name },
    config.get("jwtPrivateKey"),
    { expiresIn: "100 days" }
  );
  return token;
};

const Pharmacist = mongoose.model("Pharmacist", pharmacistSchema);

exports.Pharmacist = Pharmacist;
