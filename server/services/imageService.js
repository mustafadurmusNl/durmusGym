const axios = require("axios");
const Image = require("../models/Image");

const PEXELS_API_URL = process.env.PEXELS_API_URL || "https://api.pexels.com/v1/search";
const PEXELS_API_KEY = process.env.PEXELS_API_KEY;
const PER_PAGE = process.env.PEXELS_PER_PAGE || 80;
const PAGE = process.env.PEXELS_PAGE || 1;

let isReady = false;

// Map search queries to your app's category structure
const categoryMap = {
  pilates: "pilates",
  yoga: "yoga",
  "personal training": "personal",
  "fitness intro": "intro",
  "healthy diet": "diet",
  "training method": "method",
  "fitness assessment": "assessment",
  "custom workout plan": "customplan",
  "training session": "training",
  "progress tracking": "progresstracking"
};

const fetchAndStoreImages = async () => {
  try {
    if (!PEXELS_API_KEY) {
      console.error("Pexels API key not found!");
      return;
    }

    await Image.deleteMany({}); // Optional: clear existing images

    for (const [pexelsQuery, appCategory] of Object.entries(categoryMap)) {
      const response = await axios.get(PEXELS_API_URL, {
        headers: { Authorization: PEXELS_API_KEY },
        params: {
          query: pexelsQuery,
          per_page: PER_PAGE,
          page: PAGE,
        },
      });

      const images = response.data.photos.map((img) => ({
        ...img,
        category: appCategory,
      }));

      await Image.insertMany(images);
    }

    console.log("Images saved to DB with categories.");
    isReady = true;
  } catch (error) {
    console.error("Error fetching and storing images:", error);
  }
};

const isImageDataReady = () => isReady;

const getImagesFromDB = async () => {
  try {
    const images = await Image.find();
    return images.length > 0 ? images : null;
  } catch (error) {
    console.error("Error fetching images from DB:", error);
    throw new Error("Failed to retrieve images");
  }
};

module.exports = {
  fetchAndStoreImages,
  getImagesFromDB,
  isImageDataReady,
};
