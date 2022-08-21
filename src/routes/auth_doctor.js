const express = require("express");
const router = express.Router();

//Controllers
const Doctor = require("../controller/auth_doctor");

//Routes
router.post("/signIn", Doctor.signIn);
router.post("/signUp", Doctor.signUp);
router.post("/sendOtp", Doctor.sendOtp);
router.get("/blockDoctor", Doctor.blockDoctor);

module.exports = router;
