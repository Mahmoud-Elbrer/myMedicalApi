const express = require("express");
const router = express.Router();

//Controllers
const DonateBlood = require("../controller/donate_blood");
const auth = require("../middleware/auth");

//Routes
router.post("/", [auth], DonateBlood.addDonateBlood);
router.get("/", [auth], DonateBlood.getDonateBlood);
router.delete("/:id", [auth], DonateBlood.cancelDonateBlood);

module.exports = router;
