import { useState } from "react";
import { login } from "../api/api";
import { useAuth } from "../context/AuthContext";
import '../App.css';

const Loginform = () => {
    const {setToken} = useAuth();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const data = await login(username, password);

        if (data.error) {
            setError(data.error);
            return;
        }
        setToken(data.token);
    };

    return (
        <form onSubmit={handleSubmit} className="auth-form">
            <h1 className="headline">POKÉMON TINDER</h1>
            <p className="subheading">Login</p>
            {error && <p style={{ color: "blue"}}></p>}

            <div className="form-group">
                <input
                    type="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>

            <div className="form-group">
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <button type="submit" className="auth-button">Login</button>
        </form>
    );            
};

export default Loginform;
