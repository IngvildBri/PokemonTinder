import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import '../App.css';

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

    const filteredTypes = types.filter(
        t => t.name !== "unknown");

    return (
        <div className="page-card">
            
            <div className="top-buttons">
                <button onClick={() => navigate("/favorites")}>Favorites</button>
                <button onClick={logout}>Logout</button>
            </div>

            <h1 className="headline"> WELCOME</h1>
            
            <div className="form-group">
                {/* REGION */}
                <label>Region</label>
                <select value={region} onChange={(e) => setRegion(e.target.value)} required className="form-group-text">
                    <option value="" disabled>Pokémon regions</option>
                    {regions.map((r) => (
                        <option key={r.id} value={r.id}>
                            {r.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
            {/* TYPE */}
                <label>Type</label>
                <select value={type} onChange={(e) => setType(e.target.value)} required className="form-group-text">
                    <option value="" disabled>Pokémon types</option>
                    {filteredTypes.map((t) => (
                        <option key={t.name} value={t.name}>
                            {t.name}
                        </option>
                    ))}
                </select>    
            </div>
            
            <button onClick={handleStart} className="auth-button">Start swiping</button>
        
        </div>
    );

};

export default Dashboard;