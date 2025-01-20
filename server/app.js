const express = require('express');
const cors = require('cors');
const path = require('path');  // Import path to serve static files

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

// Serve static files from the React app (for production)
if (process.env.NODE_ENV === 'production') {
  // Serve static files from the React build folder
  app.use(express.static(path.join(__dirname, '../client/build')));

  // All other routes should serve the React app's index.html file
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

module.exports = app;
