const express = require("express");
const cors = require("cors");
const path = require("path");

const {
  getImagesFromDB,
  isImageDataReady,
} = require("./services/imageService");

const mediaRoutes = require("./routes/mediaRoutes");
const languageRoutes = require("./routes/languageRoutes");
const messageRoutes = require("./routes/messageRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

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
app.use("/api/users", userRoutes);
app.use("/api/users", authRoutes);

app.get("/api/health", (req, res) => {
  res.status(200).send("OK");
});

// Images route
app.get("/api/images/all", async (req, res) => {
  if (!isImageDataReady()) {
    return res.status(503).json({
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

module.exports = app;
