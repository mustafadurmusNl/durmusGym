const express = require('express');
const cors = require('cors');
const mediaRoutes = require('./routes/mediaRoutes');

const app = express();
console.log('Pexels API Key:', process.env.PEXELS_API_KEY ? 'Loaded' : 'Not Loaded');
console.log('Pexels API Key:', process.env.PEXELS_API_KEY);
console.log(process.env);  // This will print all environment variables

// Middleware
// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL, // Use FRONTEND_URL from the environment variables
    credentials: true, // If you're using cookies or other credentials
  }));
app.use(express.json());

// Routes
app.use('/api', mediaRoutes);

module.exports = app;
