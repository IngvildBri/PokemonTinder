// URL-er

const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretkey = process.env.token_secret;

// Bruker registrere med email, brukernavn og passord.
router.post('/signup', async (req, res) => {
    try {
        const {email, username, password} = req.body;

        const checkUser = await pool.query( "SELECT * FROM users WHERE username = $1 OR email = $2", [username, email]);
        if (checkUser.rows.length > 0) {
            return res.status(400).json({message: "Username or email are already taken"});
        }

        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(password, saltRounds);

        const postdb = "INSERT INTO users (email, username, password_hash) VALUES ($1,$2, $3) RETURNING id, username, email";
        const result = await pool.query(postdb, [email, username, hashPassword]);

        const jwtoken = jwt.sign(
            {id: result.rows[0].id, username: result.rows[0].username, email: result.rows[0].email},
            process.env.token_secret,
            { expiresIn: "30m" }
        );

        console.info("Users have registered successfully")
        res.status(200).json({message: "You have registered successfully", token: jwtoken});
    } catch (err) {
        console.error("Failed to register user:", err);
        res.status(500).json({message: "Internal server error"});
    }
});


// Bruker logger seg inn med brukernavn og passord
router.post('/login', async (req, res) => {
    try {
        const {username, password} = req.body;

        if (!username || !password) {
            return res.status(400).json ({message: "Both fields are required"});  
        }

        const checkUserQuery = await pool.query("SELECT id, username, password_hash FROM users WHERE username = $1", [username]);
        if (checkUserQuery.rows.length === 0) {
            return res.status(400).json({message: "Username or password is wrong."});
        }

        const user = checkUserQuery.rows[0];

        console.info("Login", `User with user ID: ${user.id} has logged in successfully`);
        if (!user.password_hash) {
            return res.status(500).json ({message: "Internal server error"});
        }

        const matchPassword = await bcrypt.compare(password, user.password_hash);
        if (!matchPassword) {
            return res.status(401).json({message: "Username og password is wrong."});
        }

        const jwtoken = jwt.sign(
            {id: user.id, username: user.username, email: user.email},
            process.env.token_secret,
            { expiresIn: "30m"}
        );

        console.info("User has successfully logged in.")
        res.status(200).json({message: "You have successfully logged in.", token: jwtoken});

    } catch (err) {
        console.error("User failed to login:", err);
        res. status(500).json({message: "Internal server error"});
    }
});

module.exports = router;

