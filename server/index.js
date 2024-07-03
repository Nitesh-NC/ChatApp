require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectionDB = require('./config/connectDB');
const router = require('./routes/index');
const crypto = require('crypto');
const cookieParser = require('cookie-parser');

const app = express();

// Use the secret key from the .env file or generate a new one if not provided
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || crypto.randomBytes(64).toString('hex');

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware to parse JSON
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.json({
        message: `Server running at ${PORT}`
    });
});

// API Endpoint
app.use('/api', router);

app.set('jwt-secret-key', JWT_SECRET_KEY);

connectionDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running at ${PORT}`);
    });
}).catch(err => {
    console.error('Failed to connect to the database:', err);
});
