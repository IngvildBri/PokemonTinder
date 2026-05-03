import { useState } from "react";
import { signup } from "../api/api";
import { useAuth } from "../context/AuthContext";

const Signupform = () => {
    const {setToken} = useAuth();

    console.log("useAuth:", useAuth());

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const data = await signup(username, email, password);

        if (data.error) {
            setError(data.error);
            return;
        }

        setToken(data.token);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Sign up</h2>

            {error && <p style={{color: "blue"}}>{error}</p>}

            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input  
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">Create account</button>
        </form>
    );
};

export default Signupform;