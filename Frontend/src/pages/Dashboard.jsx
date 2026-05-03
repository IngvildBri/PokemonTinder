import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Dashboard = () => {
    const {logout, user} = useAuth();
    const navigate = useNavigate();

    const [region, setRegion] = useState("");
    const [type, setType] = useState("");
    const [types, setTypes] = useState([]);

    const regions = [
        { name: "Kanto", id:1 },
        { name: "Johto", id:2 },
        { name: "Hoenn", id:3 },
        { name: "Sinnoh", id:4 },
        { name: "Unova", id:5 },
        { name: "Kalos", id:6 },
        { name: "Alola", id:7 },
        { name: "Galar", id:8 },
        { name: "Paldea", id:9 }
    ];

    useEffect(() => {
        const fetchTypes = async () => {
            const res = await fetch("https://pokeapi.co/api/v2/type");
            const data = await res.json();
            setTypes(data.results);
        };
        fetchTypes();
    }, []);
    

    const handleStart = () => {
        if (!region || !type) {
            alert("Choose region and type first");
            return;
        }
        navigate(`/swipe?region=${region}&type=${type}`);  
    };

    return (
        <div>
            <h1> Welcome!</h1>
            <h2>Choose your preferences</h2>

            {/* REGION */}
            <label>Region:</label>
            <select value={region} onChange={(e) => setRegion(e.target.value)}>
                <option value=""> Choose region</option>
                {regions.map((r) => (
                    <option key={r.id} value={r.id}>
                        {r.name}
                    </option>
                ))}
            </select>

            {/* TYPE */}
            <label>Type:</label>
            <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="">Choose type</option>
                {types.map((t) => (
                    <option key={t.name} value={t.name}>
                        {t.name}
                    </option>
                ))}
            </select>
            <button onClick={handleStart}>Start swiping</button>
            <hr/>

            <div>
                <button onClick={() => navigate("/favorites")}>Favorites</button>
                <button onClick={logout}>Logout</button>
            </div>

        </div>
    );

};

export default Dashboard;