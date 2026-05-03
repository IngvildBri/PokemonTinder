// API - kall
require('dotenv').config();

// const fetch = require('node-fetch');
const pokemon_URL = "https://pokeapi.co/api/v2";

const { getChuckNorrisJoke } = require('./chucknorrisApi');


const human_names = [
    "Noah", "Jakob", "Oskar", "Emil", "Simon", "Anders", "Mats", "Adam", "Gabriel", "David", "Patrick", 
    "Kyle", "Matthew", "Ilya", "Casey", "Max", "Marc", "Ryan", "Anthony", "Scott", "Jamie", "Tony", "Sean"
];


const getPokemonByName = async (name) => {
    try {
        const response = await fetch(`${pokemon_URL}/pokemon/${name.toLowerCase()}`);

        if (!response.ok) {
            console.error("Failed to fetch Pokemon by name:", response.statusText);
            return null; 
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Trouble fetching pokemon by name:", error);
        return null;
    }
};


// Hente pokemon etter type (vann, ild, gress, elektrisk osv)
const getPokemonByType = async (type) => {
    try {
        const response = await fetch(`${pokemon_URL}/type/${type.toLowerCase()}`);

        if (!response.ok) return [];
        const data = await response.json();

        return data.pokemon.map(p => p.pokemon.name);
    } catch (error) {
        console.error("Trouble fetching pokemon by type:", error);
        return [];
    }
};

// Henter pokemon etter region (Kanto, Johto, Hoenn, Sinnoh osv.)
const getPokemonByRegion = async (region) => {
    try {
        const response = await fetch(`${pokemon_URL}/generation/${region}`);

        if (!response.ok) return [];
        const data = await response.json ();
        return data.pokemon_species.map(p => p.name);
    } catch (error) {
        console.error("Trounble fetching pokemon by region:", error);
        return [];
    }
};

// Kombinere region + type og hente en tilfeldig pokemon ut fra valget
const getRandomPokemon = async (region, type) => {
    const regionList = await getPokemonByRegion(region);
    const typeList = await getPokemonByType(type);

    const filtered = regionList.filter(name => typeList.includes(name));

    if (filtered.length === 0) return null;

    const randomName = filtered[Math.floor(Math.random() * filtered.length)];

    const pokemon = await getPokemonByName(randomName);
    if (!pokemon) return null;

    const humanName = human_names[Math.floor(Math.random() * human_names.length)];
    const primaryType = pokemon.types[0].type.name;

    const joke = await getChuckNorrisJoke(primaryType);

    const level = Math.floor(Math.random()*100) + 1;

    return {
        id: pokemon.id,
        name: pokemon.name,
        displayName: `${humanName} the ${pokemon.name}`,
        image: pokemon.sprites.other["official-artwork"].front_default,
        height: pokemon.height,
        weight: pokemon.weight,
        abilities: pokemon.abilities.map(a => a.ability.name),
        types: pokemon.types.map(t => t.type.name),
        level,
        joke,
    };
};


module.exports = {
    getPokemonByName,
    getPokemonByType,
    getPokemonByRegion,
    getRandomPokemon,
};
