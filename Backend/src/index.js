const express = require('express');
const cors = require('cors');
const pool = require('./config/database');
const PORT = process.env.PORT || 5002;
const app = express();
require('dotenv').config();

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));



pool.query("SELECT NOW()", (err, result) => {
    if (err) {
        console.error("Database connection failed:", err.message);    
    } else {
        console.log("Database is connected! Time:", result.rows[0].now);
    }
}) ;



// Routes
const userAccess = require('./routes/userAccess');
const pokemonRoutes = require('./routes/pokemonRoutes');


// Paths
app.use('/', userAccess);
app.use('/pokemon', pokemonRoutes);




app.get('/test', (req, res) => {
    res.json({ message: "Backend is running"});
});

app.use((req, res) => {
    res.status(404).json({message: "Route not found."});
});

app.listen(process.env.PORT, () => {
    console.log(`The server is running on port ${PORT}`);
})