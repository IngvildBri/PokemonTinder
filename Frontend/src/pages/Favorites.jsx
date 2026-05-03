import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getFavorites } from "../api/api";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
    const {token, logout} = useAuth();
    const navigate = useNavigate();

    const [favorites, setFavorites] = useState([]);
    const [detailedFavorites, setDetailedFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {
        async function fetchFavorites() {
            setLoading(true);
            const data = await getFavorites(token, logout);

            if (data.error === "Session expired") {
                navigate("/");
                return;
            }

            if (data.error) {
                setError(data.error);
                setFavorites([]);
            } else {
                setFavorites(data);
            }
            setLoading(false);
        }

        fetchFavorites();
    }, [token]);


    useEffect(() => {
        if (favorites.length === 0) return;
        async function loadDetails() {
            const regionMap = {
                "generation-i": "Kanto",
                "generation-ii": "Johto",
                "generation-iii": "Hoenn",
                "generation-iv": "Sinnoh",
                "generation-v": "Unova",
                "generation-vi": "Kalos",
                "generation-vii": "Alola",
                "generation-viii": "Galar",
                "generation-ix": "Paldea"
            };

            const detailed = await Promise.all(
                favorites.map(async (f) => {
                    const pokeRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${f.pokemon_id}`);
                    const pokeData = await pokeRes.json();

                    const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${f.pokemon_id}`);
                    const speciesData = await speciesRes.json();

                    const generation = speciesData.generation.name;
                    const region = regionMap[generation] || "Unknown";

                    return {
                        pokemon_id: f.pokemon_id,
                        name: pokeData.name,
                        type: pokeData.types[0].type.name,
                        region: region,
                        image: pokeData.sprites.front_default
                    };
                })
            );
            setDetailedFavorites(detailed);
        }

        loadDetails();
    }, [favorites]);


    if (loading) return <p>Loading favorites...</p>;
    if (error) return <p style={{color: "red"}}>{error}</p>;

    return (
        <div>
            <h2>Your favorite Pokémons</h2>

            <div>
                <button onClick={() => navigate("/dashboard")}>Region and type</button>
                {/*<button onClick={() => navigate("/swipe")}>Swipe</button>*/}
                <button onClick={logout}>Logout</button>
            </div>

            {detailedFavorites.length === 0 && <p> No favorites yet</p>}

            <div className="favorites-grid">
                {detailedFavorites.map((p) => (
                    <div key={p.pokemon_id} className="favorite-card">
                        <h3>{p.name}</h3>
                        <img src={p.image}
                            alt={p.name || "pokemon"}
                            width="150"
                        />
                        <p>Type: {p.type}</p>
                        <p>Region: {p.region}</p>

                        {p.joke && <p><i>{p.joke}</i></p>}
                    </div>
                ))}

            </div>
            
        </div>
    );
};

export default Favorites;


/*<img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.pokemon_id}.png`}
    alt={p.name || "pokemon"}
    width="150"
/>*/