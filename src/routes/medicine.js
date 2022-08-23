const express = require("express");
const router = express.Router();

//Controllers
const Medicine = require("../controller/medicine");
const auth = require("../middleware/auth");

//Routes
router.post("/", [auth], Medicine.addMedicine);
router.get("/", [auth], Medicine.getMedicine);
router.delete("/:id", [auth], Medicine.deleteMedicine);

module.exports = router;
