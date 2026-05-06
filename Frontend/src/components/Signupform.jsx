import { useState } from "react";
import { signup } from "../api/api";
import { useAuth } from "../context/AuthContext";
import '../App.css';

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
        <form onSubmit={handleSubmit} className="auth-form">
            <h1 className="headline">POKÉMON TINDER</h1>
            <p className="subheading">Sign up</p>

            {error && <p style={{color: "blue"}}>{error}</p>}

            <div className="form-group">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>

            <div className="form-group">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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

            <button type="submit" className="auth-button">Create account</button>
        </form>
    );
};

export default Signupform;