const _ = require("lodash");
const { Doctor } = require("../models/doctor");
const { validateAddDoctor } = require("../validations/validations");
const upload = require("../middleware/upload");

exports.getDoctor = async (req, res, next) => {
  const page = req.params.page;
  const limit = req.params.limit;
  let doctor = await Doctor.find()
    .populate("specialize", "-_id")
    .limit(limit * 1)
    .skip((page - 1) * limit);

  res.status(200).json(doctor);
};

exports.getDoctorById = async (req, res, next) => {
  let doctor = await Doctor.find({ _id: req.params.doctorId });

  res.status(200).json(doctor);
};

exports.deleteDoctor = async (req, res, next) => {
  await Doctor.deleteOne({ _id: req.params.doctorId });

  res.status(200).json({
    success: true,
  });
};

exports.setVisitedDoctor = async (req, res, next) => {
  let doctor = await Doctor.findOne({ _id: req.params.doctorId });
  if (!doctor) return res.status(400).send("Doctor not found");

  var newNumberVisitors = doctor.numberVisitors + 1;

  await doctor.updateOne(
    { _id: req.params.doctorId },
    {
      $set: {
        numberVisitors: newNumberVisitors,
      },
    }
  );

  res.status(200).json({
    success: true,
  });
};

exports.searchDoctor = async (req, res, next) => {
  let doctor = await Doctor.find({
    name: new RegExp(req.params.searchName, "i"),
  });
  res.status(200).json(doctor);
};


exports.nearDoctor = async (req, res, next) => {
  let doctor = await Doctor.find({
    adsName: new RegExp(req.params.searchName, "i"),
  });
  res.status(200).json(doctor);
};


exports.getDoctorBy = async (req, res, next) => {
  // clinic ==1  -  specialize ==  2 
  let doctor ; 
  if(req.params.searchBy == 1){
    doctor = await Doctor.find({ _id: req.params.doctorId });
  }else if(req.params.searchBy == 2){
    doctor = await Doctor.find({ _id: req.params.doctorId });
  }

  res.status(200).json(doctor);
};



