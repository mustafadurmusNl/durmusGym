const axios = require("axios");
const Image = require("../models/Image");
const { isImageDataReady } = require("../services/imageService"); // ✅ Import the flag



// API Endpoint to Get Filtered Images from DB
const getImages = async (req, res) => {
  try {
    // ✅ Check if data is ready before proceeding
    if (!isImageDataReady()) {
      return res.status(503).json({ error: "Images are still being prepared. Try again shortly." });
    }

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
      method: ["method", "plan", "process", "strategy", "step", "approach", "workflow"],
    };

    const keywords = keywordMap[category.toLowerCase()] || [category.toLowerCase()];
    const allImages = await Image.find({});

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

module.exports = {
  getImages,
};
