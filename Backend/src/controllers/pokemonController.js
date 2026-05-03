const db = require('../config/database');

const {getRandomPokemon} = require('../api/pokemonApi');


// Henter neste pokemon basert på region + type. Hopper også over allerede likt/ikke likt.
const getNextPokemon = async (req, res) => {
    try {
        const userId = req.user.id;

        const {region, type} = req.query;

        if (!region || !type) {
            return res.status(400).json({error: "Region and type are required"});
        }

        const seenResult = await db.query(
            "SELECT pokemon_id FROM pokemon_userchoice WHERE user_id = $1",
            [userId]
        );

        const seenPokemonIds = seenResult.rows.map(r => r.pokemon_id);

        let pokemon = null;

        for (let i = 0; i < 20; i++) {
            const candidate = await getRandomPokemon(region, type);

            if (!candidate) continue;

            if(!seenPokemonIds.includes(candidate.id)) {
                pokemon = candidate;
                break;
            }
        }

        if (!pokemon) {
            return res.status(404).json({error: "No more pokemon available"});
        }

        return res.json(pokemon);

    } catch (error) {
        console.error("Error in getNextPokemon:", error);
        return res.status(500).json({error: "Server error"});
    }
};


// Pokemon bruker liker
const likePokemon = async (req, res) => {
    try {
        const userId = req.user.id;
        const {pokemon_id} = req.body;

        await db.query(
            `INSERT INTO pokemon_userchoice (user_id, pokemon_id, liked)
            VALUES ($1, $2, true)
            ON CONFLICT (user_id, pokemon_id)
            DO UPDATE SET liked = true`,
            [userId, pokemon_id]
        );

        return res.json({message: "Pokemon liked"});

    } catch (error) {
        console.error("Error in likePokemon:", error);
        return res.status(500).json({error: "Server error"});
    }
};


// Pokemons bruker ikke liker
const dislikePokemon = async (req, res) => {
    try {
        const userId = req.user.id;
        const {pokemon_id} = req.body;

        await db.query(
            `INSERT INTO pokemon_userchoice (user_id, pokemon_id, liked)
            VALUES ($1, $2, false)
            ON CONFLICT (user_id, pokemon_id)
            DO UPDATE SET liked = false`,
            [userId, pokemon_id]
        );

        return res.json({message: "Pokemon disliked"});

    } catch (error) {
        console.error("Error in dislikePokemon:", error);
        return res.status(500).json({error: "Server error"});
    }
};


const getFavorites = async (req, res) => {
    try {
        const userId = req.user.id;

        const result = await db.query(
            `SELECT pokemon_id FROM pokemon_userchoice
            WHERE user_id = $1 AND liked = true`,
            [userId]
        );

        return res.json(result.rows);

    } catch (error) {
        console.error("Error in getFavorites:", error);
        return res.status(500).json({error: "Server error"});
    }
};


module.exports = {
    getNextPokemon,
    likePokemon,
    dislikePokemon,
    getFavorites
};