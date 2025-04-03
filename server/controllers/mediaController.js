const axios = require("axios");
const Image = require("../models/Image");

// Fetch Images from Pexels API and Store in DB
const fetchAndStoreImages = async () => {
  try {
    const apiKey = process.env.PEXELS_API_KEY;
    if (!apiKey) {
      console.error("Pexels API key not found!");
      return;
    }

    const response = await axios.get("https://api.pexels.com/v1/search", {
      headers: { Authorization: apiKey },
      params: { query: "gym", per_page: 80, page: 2 },
    });

    const images = response.data.photos;

    // Clear old images (optional)
    await Image.deleteMany({});

    // Store new images in MongoDB
    await Image.insertMany(images);
    console.log("Images saved to database!");

  } catch (error) {
    console.error("Error fetching and storing images:", error);
  }
};

// API Endpoint to Get Images from DB
const getImages = async (req, res) => {
  try {
    const images = await Image.find();
    if (images.length === 0) {
      return res.status(404).json({ message: "No images found! Run fetch process." });
    }
    res.json(images);
  } catch (error) {
    console.error("Error fetching images from DB:", error);
    res.status(500).json({ error: "Failed to retrieve images" });
  }
};

module.exports = { getImages, fetchAndStoreImages };
