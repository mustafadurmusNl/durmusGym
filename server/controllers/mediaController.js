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

// API Endpoint to Get Filtered Images from DB
const getImages = async (req, res) => {
  try {
    const { category } = req.query;

    if (!category) {
      return res.status(400).json({ error: "Category is required" });
    }

    const keywordMap = {
      pilates: ["pilates", "stretch", "balance", "mat", "core"],
      yoga: ["yoga", "pose", "zen", "stretch", "balance"],
      personal: ["personal", "trainer", "coach", "custom", "private"],
      intro: ["intro", "gym", "welcome", "workout", "start"],
      diet: ["diet", "nutrition", "healthy", "food", "meal", "plan", "protein", "vegetable"],
      personal: ["personal", "trainer", "coach", "training", "session", "private", "fit", "custom"],
      method: ["method", "plan", "process", "strategy", "step", "approach", "workflow"],


      // Add more mappings as needed
    };

    const keywords = keywordMap[category.toLowerCase()] || [category.toLowerCase()];
    const allImages = await Image.find({});

    // Try to match by alt text
    const matchingImages = allImages.filter((img) =>
      keywords.some((kw) => img?.alt?.toLowerCase().includes(kw))
    );

    const chosenImage =
      matchingImages.length > 0
        ? matchingImages[Math.floor(Math.random() * matchingImages.length)]
        : allImages[Math.floor(Math.random() * allImages.length)];

    return res.json(chosenImage);
  } catch (error) {
    console.error("Error fetching image:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


// ✅ Export both functions properly!
module.exports = {
  fetchAndStoreImages,
  getImages,
};
