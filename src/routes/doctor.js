const express = require("express");
const router = express.Router();
const multer = require("multer");

//Controllers

const Doctor = require("../controller/doctor");

//Routes
router.get("/:page/:limit", Doctor.getDoctor);
router.get("/:doctorId", Doctor.getDoctorById);
router.delete("/:doctorId", Doctor.deleteDoctor);
router.post("/visitedDoctor/:doctorId", Doctor.setVisitedDoctor);
router.get("/search/:searchName", Doctor.searchDoctor);

module.exports = router;
