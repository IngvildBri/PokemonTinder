import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loginform from "../components/Loginform";
import Signupform from "../components/Signupform";
import { Home } from "@mui/icons-material";

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
        <div>
            {showLogin ? <Loginform /> : <Signupform/>}

            <button onClick={() => setShowLogin(!showLogin)}>
                {showLogin ? "Register" : "Login"}
            </button>
        </div>
    );
};

export default Homepage;