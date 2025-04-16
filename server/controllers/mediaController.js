const axios = require("axios");
const Image = require("../models/Image");
const { isImageDataReady } = require("../services/imageService"); // ✅ Import the flag


const getImages = async (req, res) => {
  try {
    if (!isImageDataReady()) {
      return res
        .status(503)
        .json({ error: "Images are still being prepared. Try again shortly." });
    }

    const { category } = req.query;
    if (!category) {
      return res.status(400).json({ error: "Category is required" });
    }

    // List of valid categories to avoid injection
    const validCategories = [
      "pilates",
      "yoga",
      "personal",
      "intro",
      "diet",
      "method",
      "assessment",
      "customplan",
      "training",
      "progresstracking"
    ];
    
    if (!validCategories.includes(category.toLowerCase())) {
      return res.status(400).json({ error: "Invalid category" });
    }
    

    // Map of keywords based on the category
    const keywordMap = {
      pilates: ["pilates", "stretch", "balance", "mat", "core"],
      yoga: ["yoga", "pose", "zen", "stretch", "balance"],
      personal: ["personal", "trainer", "coach", "custom", "private"],
      intro: ["intro", "gym", "welcome", "workout", "start"],
      diet: [
        "diet",
        "nutrition",
        "healthy",
        "food",
        "meal",
        "plan",
        "protein",
        "vegetable",
      ],
      method: [
        "method",
        "plan",
        "process",
        "strategy",
        "step",
        "approach",
        "workflow",
      ],
      assessment: ["assessment", "evaluation", "test", "analysis"],  // Added this category
      customPlan: ["custom", "personalized", "plan", "strategy"],   // Added this category
      training: ["training", "workout", "exercise", "fitness"],     // Added this category
      progressTracking: ["progress", "tracking", "growth", "measurement"]  // Added this category
    };

    // Create an array of keywords for the given category
    const keywords = keywordMap[category.toLowerCase()] || [category.toLowerCase()];

    // Find all images and filter by category keywords
    const allImages = await Image.find({});
    const matchingImages = allImages.filter((img) =>
      keywords.some((kw) => img?.alt?.toLowerCase().includes(kw))
    );

    // Pick a random image if matches are found
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
