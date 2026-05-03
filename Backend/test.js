const { getRandomPokemon } = require('./src/api/pokemonApi');

(async () => {
    const pokemon = await getRandomPokemon(8, "dragon");
    console.log(pokemon);
})();

(async () => {
    const pokemon = await getRandomPokemon(5, "rock");
    console.log(pokemon);
})();


(async () => {
    const test = [
        [8, "dark"],
        [7, "ice"],
        [6, "water"],
        [5, "ghost"],
        [4, "flying"],
    ];

    for (const [region, type] of test) {
        const pokemon = await getRandomPokemon(region, type);
        console.log("\n--- RESULT FOR", type.toUpperCase(), "---");
        console.log(pokemon);
    }
})();




/* Region:
1. Kanto = 
2. Johto
3. Hoenn
4. Sinnoh
5. Unova
6. Kalos
7. Alola
8. Galar
9. Paldea
*/

/*Type:
1. Fire
2. Water
3. Grass
4. Electric
5. Ice
6. Fighting 
7. Poison
8. Ground
9. Flying
10. Psychic
11. Bug
12. Rock
13. Ghost
14. Dragon
15. Dark
16. Steel
17. Fairy
18. Normal
*/