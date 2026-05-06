import { useEffect, useState } from "react";
import {useSearchParams, useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext";
import { getNextPokemon, likePokemon, dislikePokemon } from "../api/api";
import {useSwipeable} from "react-swipeable";
import '../css/Pokemonswipe.css';
import '../App.css';

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

        const data = await getNextPokemon(region, type, token, logout);

        if (data.error === "Session expired") {
            navigate("/");
            return;
        }

        if (data.error === "No more pokemon available") {
            setNoMore(true);
            setPokemon(null);
            setLoading(false);
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
        onSwipedRight: () => handleLike(),
        preventScrollOnSwipe: true,
        trackMouse: true,
    });
    
    useEffect(() => {
        console.log("Pokemon fra API:", pokemon);
    }, [pokemon]);

    if (loading) return <p>Loading Pokémon...</p>;
    if (error) return <p className="error-message">{error}</p>;

    return (
        <div className="swipe-container">
            <div className="top-buttons">
                <button onClick={() => navigate("/dashboard")}>Region and type</button>
                <button onClick={() => navigate("/favorites")}>Favorites</button>
                <button onClick={logout}>Logout</button>
            </div>

            {noMore && (
                <div className="error-message">
                    <h2> No more Pokémons in this type and region. Choose new preferences</h2>
                    <button onClick={() => navigate("/dashboard")}>Gotta catch 'em all</button>
                </div>
            )}

            {pokemon && !noMore && (
                <div {...handlers} className="swipe-card">
                    <h1 className="headline">{pokemon.displayName}</h1>
                    <img src={pokemon.image} alt={pokemon.name} width="200" className="pokemon-image"/>

                    <div className="pokemon-stats">
                        <p>Type: {pokemon?.types?.join(", ")}</p>
                        <p>Level: {pokemon.level}</p>
                        <p>Height: {pokemon.height}</p>
                        <p>Weight: {pokemon.weight}</p>
                        <p>Abilities: {pokemon?.abilities?.join(", ")}</p>
                        <p>Region: {pokemon.region}</p>
                    </div>

                    <p className="pokemon-joke"><i>{pokemon.joke}</i></p>

                    <div className="swipe-buttons">
                        <button onClick={handleDislike}>✖</button>
                        <button onClick={handleLike}>✔</button>
                    </div>
                </div>

            )}
        </div>
    );
};

export default Pokemonswipe;