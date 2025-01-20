const express = require('express');
const cors = require('cors');
const mediaRoutes = require('./routes/mediaRoutes');

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL, // Use FRONTEND_URL from the environment variables
  credentials: true, // If you're using cookies or other credentials
}));
app.use(express.json());

// Define a route for the root URL
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Routes
app.use('/api', mediaRoutes);

module.exports = app;
