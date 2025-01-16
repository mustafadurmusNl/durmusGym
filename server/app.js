const express = require('express');
const cors = require('cors');
const mediaRoutes = require('./routes/mediaRoutes');

const app = express();
console.log('Pexels API Key:', process.env.PEXELS_API_KEY ? 'Loaded' : 'Not Loaded');
console.log('Pexels API Key:', process.env.PEXELS_API_KEY);
console.log(process.env);  // This will print all environment variables

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', mediaRoutes);

module.exports = app;
