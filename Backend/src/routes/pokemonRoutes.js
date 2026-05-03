const express = require('express');
const router = express.Router();

const requireAuth = require("../middleware/requireAuth");
const pokemonController = require("../controllers/pokemonController");


router.get("/next", requireAuth, pokemonController.getNextPokemon);

router.post("/like", requireAuth, pokemonController.likePokemon);

router.post("/dislike", requireAuth, pokemonController.dislikePokemon);

router.get("/favorites", requireAuth, pokemonController.getFavorites);


module.exports = router;