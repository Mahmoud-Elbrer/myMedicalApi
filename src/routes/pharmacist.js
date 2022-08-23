const express = require("express");
const router = express.Router();

//Controllers
const AuthPharmacist = require("../controller/auth_Pharmacist");

//Routes
router.post("/signIn", AuthPharmacist.signIn);
router.post("/signUp", AuthPharmacist.signUp);
router.post("/sendOtp", AuthPharmacist.sendOtp);
router.get("/blockPharmacist", AuthPharmacist.blockPharmacist);

module.exports = router;
