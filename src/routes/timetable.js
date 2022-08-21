const express = require("express");
const router = express.Router();

//Controllers
const TimeTable = require("../controller/timetable");
const auth = require("../middleware/auth");

//Routes
router.post("/", [auth], TimeTable.addTimeTable);
router.get("/", [auth], TimeTable.getTimeTable);
router.delete("/:id", [auth], TimeTable.deleteTimeTable);

module.exports = router;
