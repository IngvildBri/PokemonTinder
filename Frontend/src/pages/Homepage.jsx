import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loginform from "../components/Loginform";
import Signupform from "../components/Signupform";
import { Home } from "@mui/icons-material";
import '../App.css';

const Homepage = () => {
    const [showLogin, setShowLogin] = useState(true);
    const {token} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            navigate("/dashboard");
        }
    }, [token, navigate]);

    return (
        <div className="page-card">
            {showLogin ? <Loginform /> : <Signupform/>}

            <button onClick={() => setShowLogin(!showLogin)} className="auth-button">
                {showLogin ? "Register" : "Login"}
            </button>
        </div>
    );
};

export default Homepage;