import { useState } from "react";
import { login } from "../api/api";
import { useAuth } from "../context/AuthContext";

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
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            {error && <p style={{ color: "blue"}}></p>}

            <input
                type="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
        </form>
    );            
};

export default Loginform;
