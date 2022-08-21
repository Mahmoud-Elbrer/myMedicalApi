const mongoose = require("mongoose");
const winston = require("winston");

module.exports = function () {
  mongoose.connect("mongodb://localhost/medicalDB" ,  { useNewUrlParser: true } ).then((result) => {
    winston.info("Connection to MongoDB .. " + result.Error);
  });
};
