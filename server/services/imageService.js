const axios = require("axios");
const Image = require("../models/Image");

// Get the base Pexels API URL and other configuration from environment variables or defaults
const PEXELS_API_URL = process.env.PEXELS_API_URL || "https://api.pexels.com/v1/search";
const PEXELS_API_KEY = process.env.PEXELS_API_KEY;
const QUERY = process.env.PEXELS_QUERY || "gym";  // Default query can be "gym"
const PER_PAGE = process.env.PEXELS_PER_PAGE || 80;  // Default number of images per page
const PAGE = process.env.PEXELS_PAGE || 1;  // Default starting page

// Fetch and store images from Pexels API
const fetchAndStoreImages = async () => {
  try {
    if (!PEXELS_API_KEY) {
      console.error("Pexels API key not found!");
      return;
    }

    const queries = ["gym", "pilates", "boxing", "yoga"]; // Add more as needed
    await Image.deleteMany({}); // Clear old data

    for (const query of queries) {
      const response = await axios.get(PEXELS_API_URL, {
        headers: { Authorization: PEXELS_API_KEY },
        params: {
          query,
          per_page: PER_PAGE,
          page: PAGE,
        },
      });

      const images = response.data.photos.map((img) => ({
        ...img,
        category: query.toLowerCase(), // Add a category field
      }));

      await Image.insertMany(images);
    }

    console.log("Images saved to DB with categories");
  } catch (error) {
    console.error("Error fetching and storing images:", error);
  }
};


// Fetch images from the database
const getImagesFromDB = async () => {
  try {
    const images = await Image.find();
    if (images.length === 0) {
      console.log("No images found! Run fetch process.");
      return null; // Or you can return an empty array
    }
    return images;
  } catch (error) {
    console.error("Error fetching images from DB:", error);
    throw new Error("Failed to retrieve images");
  }
};

module.exports = { fetchAndStoreImages, getImagesFromDB };
