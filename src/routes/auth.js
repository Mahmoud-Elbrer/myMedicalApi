const express = require("express");
const router = express.Router();

//Controllers
const Auth = require("../controller/auth");
const header = require("../middleware/header");

// 1571213
//Routes
router.post("/signIn", [header],  Auth.signIn);
router.post("/signUp" , [header], Auth.signUp);
router.post("/sendOtp" , [header],  Auth.sendOtp);
router.get("/block" , [header], Auth.block);

module.exports = router;
