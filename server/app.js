const express = require("express");
const cors = require("cors");
const path = require("path");
const {
  fetchAndStoreImages,
  getImagesFromDB,
  isImageDataReady,
} = require("./services/imageService");

const mediaRoutes = require("./routes/mediaRoutes");
const languageRoutes = require("./routes/languageRoutes");
const messageRoutes = require("./routes/messageRoutes");

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use("/api", mediaRoutes);
app.use("/api/languages", languageRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '../client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}


// ✅ Dev/debug endpoint: Returns all images from the database
app.get("/api/images/all", async (req, res) => {
  if (!isImageDataReady()) {
    return res
      .status(503)
      .json({
        message: "Images are still being fetched, please try again later.",
      });
  }

  try {
    const images = await getImagesFromDB();
    if (!images || images.length === 0) {
      return res
        .status(404)
        .json({ message: "No images found in the database." });
    }
    res.status(200).json(images);
  } catch (error) {
    console.error("Error retrieving images:", error);
    res.status(500).json({ error: "Failed to retrieve images from database." });
  }
});

// Fetch and store images when the server starts
fetchAndStoreImages();

module.exports = app;
