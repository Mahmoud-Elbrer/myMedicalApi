const config = require("config");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
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
  password: {
    type: String,
    require: true,
    minLength: 3,
    maxLength: 1024,
  },
});

// information export principle : oop

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, phoneNumber: this.phoneNumber, name: this.name },
    config.get("jwtPrivateKey"),
    { expiresIn: "100 days" }
  );
  return token;
};

const User = mongoose.model("User", userSchema);

exports.User = User;
