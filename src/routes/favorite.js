const express = require("express");
const router = express.Router();

//Controllers
const Favorite = require("../controller/favorite");
const auth = require("../middleware/auth");

//Routes
router.post("/", [auth], Favorite.addFavorite);
router.get("/", [auth], Favorite.getFavorite);
router.delete("/:id", [auth], Favorite.deleteFavorite);

module.exports = router;
