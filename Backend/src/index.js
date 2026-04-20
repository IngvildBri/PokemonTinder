const express = require('express');
const cors = require('cors');
const pool = require('./config/database');
const PORT = process.env.PORT || 5002;

require('dotenv').config();

pool.query("SELECT NOW()", (err, result) => {
    if (err) {
        console.error("Database connection failed:", err.message);    
    } else {
        console.log("Database is connected! Time:", result.rows[0].now);
    }
}) ;

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.json({ message: "Backend is running"});
});


app.listen(process.env.PORT, () => {
    console.log(`The server is running on port ${PORT}`);
})