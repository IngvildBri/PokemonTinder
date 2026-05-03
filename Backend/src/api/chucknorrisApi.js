// API-kall
require('dotenv').config();
//const fetch = require('node-fetch');

const Chuck_Random = "https://api.chucknorris.io/jokes/random";
const Chuck_Search = "https://api.chucknorris.io/jokes/search?query=";


const type_keywords = {
    fire: "fire",
    water: "water",
    grass: "grass",
    electric: "electric",
    ice: "ice",
    fighting: "fight",
    poison: "poison",
    ground: "ground",
    flying: "fly",
    psychic: "mind",
    bug: "bug",
    rock: "rock",
    ghost: "ghost",
    dragon: "dragon",
    dark: "dark",
    steel: "steel",
    fairy: "fairy",
    normal: "normal"
};

// Hent Chuck Norris vist basert på type og søk først
const getChuckNorrisJoke = async (pokemonType) => {
    const keyword = type_keywords[pokemonType.toLowerCase()] || "power";

    console.info("Chuck search term:", keyword);

    try {
        const searchResponse = await fetch(`${Chuck_Search}${keyword}`);
        const searchData = await searchResponse.json();
        if (searchData?.result?.length > 0) {
            const randomIndex = Math.floor(Math.random() * searchData.result.length);
            return searchData.result[randomIndex].value;
        }

        const fallbackResponse = await fetch(Chuck_Random);
        const fallbackData = await fallbackResponse.json();
        return fallbackData.value;

    } catch (error) {
        console.error("Chuck Norris API error:", error);

        const fallback = await fetch(Chuck_Random);
        const fallbackData = await fallback.json();
        return fallbackData.value;
    }
};



module.exports = {
    getChuckNorrisJoke,
    type_keywords
};