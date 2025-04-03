const express = require("express");
const cors = require("cors");
const path = require("path");
const { fetchAndStoreImages, getImagesFromDB } = require("./services/imageService"); // Importing the image service

const mediaRoutes = require("./routes/mediaRoutes");
const languageRoutes = require("./routes/languageRoutes");
const messageRoutes = require("./routes/messageRoutes");

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // Use FRONTEND_URL from the environment variables
    credentials: true, // If you're using cookies or other credentials
  })
);
app.use(express.json());

// Routes
app.use("/api", mediaRoutes);
app.use("/api/languages", languageRoutes); // Add this route
app.use("/api/messages", messageRoutes); // Add this route

// Fetch and store images when the server starts
fetchAndStoreImages(); // This fetches and stores images when the server starts

// Fetch images from the database
app.get("/api/images", async (req, res) => {
  try {
    const images = await getImagesFromDB();
    if (!images) {
      return res.status(404).json({ message: "No images found! Run fetch process." });
    }
    res.json(images);  // Return images from DB
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve images" });
  }
});

// Serve static files from the React app (for production)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  // All other routes should serve the React app's index.html file
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  });
}

module.exports = app;
