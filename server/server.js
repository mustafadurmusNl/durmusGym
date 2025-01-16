//require('dotenv').config(); // Load environment variables
require('dotenv').config({ path: './server/.env' });  // Explicitly set the path to the .env file


const app = require('./app'); // Import the Express app

const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
