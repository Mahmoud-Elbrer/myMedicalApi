const express = require("express");
const router = express.Router();

//Controllers
const Book = require("../controller/book");
const auth = require("../middleware/auth");

//Routes
router.get("/", [auth], Book.getBook);
router.post("/", [auth], Book.addBook);
router.get("/cancelBooking", [auth], Book.cancelBook);

module.exports = router;
