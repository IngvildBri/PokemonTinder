const jwt = require('jsonwebtoken');
require("dotenv").config();

const authToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const jwtoken = authHeader && authHeader.split(' ')[1];

    if (!jwtoken) {
        console.info("Token:", "No token was provided");
        return res.status(401).json({message: "No token was provided"}); 
    }
    jwt.verify(jwtoken, process.env.token_secret, (err, user) => {
        if(err) {
            console.error("Token authentication failed:", err.name)
            return res.status(403).json({message: "Token is not valid"});
        }
        req.user = user;
        next();
    });
};

module.exports = authToken;