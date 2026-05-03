import { useEffect, useState } from "react";
import {useSearchParams, useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext";
import { getNextPokemon, likePokemon, dislikePokemon } from "../api/api";
import {useSwipeable} from "react-swipeable";

const Pokemonswipe = () => {
    const [searchParams] = useSearchParams();
    const region = searchParams.get("region");
    const type = searchParams.get("type");
    const {token, logout} = useAuth();
    const navigate = useNavigate();

    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [noMore, setNoMore] = useState(false);

    const fetchNext = async () => {
        setLoading(true);
        setError("");

        const data = await getNextPokemon(region, type, token);

        if (data.error === "Session expired") {
            navigate("/");
            return;
        }

        if (data.error === "No more pokemon available") {
            setNoMore(true);
            setPokemon(null);
            return;
        }
        setPokemon(data);
        setNoMore(false);
        setLoading(false);
    };

    useEffect(() => {
        fetchNext();
    }, []);

    const handleLike = async () => {
        if (!pokemon) return;
        await likePokemon(pokemon.id, token);
        fetchNext();
    };

    const handleDislike = async () => {
        if (!pokemon) return;
        await dislikePokemon(pokemon.id, token);
        fetchNext();
    };

    const handlers = useSwipeable({
        onSwipedLeft: () => handleDislike(),
        onSwipeRight: () => handleLike(),
        preventScrollOnSwipe: true,
        trackMouse: true,
    });


    if (loading) return <p>Loading Pokémon...</p>;
    if (error) return <p style={{color: "red"}}>{error}</p>;

    return (
        <div>
            <div>
                <button onClick={() => navigate("/favorites")}>Favorites</button>
                <button onClick={logout}>Logout</button>
            </div>

            {noMore && (
                <div>
                    <h2> No more Pokémon in this region and type</h2>
                    <button onClick={() => navigate("/dashboard")}>Choose new region or type</button>
                </div>
            )}

            {pokemon && !noMore && (
                <div {...handlers}>
                    <h2>{pokemon.name}</h2>
                    <img src={pokemon.image} alt={pokemon.name} width="200"/>

                    <p>Type: {pokemon?.types?.join(", ")}</p>
                    <p>Level: {pokemon.level}</p>
                    <p>Height: {pokemon.height}</p>
                    <p>Weight: {pokemon.weight}</p>
                    <p>Abilities: {pokemon?.abilities?.join(", ")}</p>
                    <p>Region: {pokemon.region}</p>

                    <p><i>{pokemon.joke}</i></p>

                    <button onClick={handleLike}>Like</button>
                    <button onClick={handleDislike}>Dislike</button>
                </div>

            )}
        </div>
    );
};

export default Pokemonswipe;