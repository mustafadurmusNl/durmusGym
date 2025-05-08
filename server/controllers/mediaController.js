const Image = require("../models/Image");
const { isImageDataReady } = require("../services/imageService");

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

    const lowerCategory = category.toLowerCase();
    if (!validCategories.includes(lowerCategory)) {
      return res.status(400).json({ error: "Invalid category" });
    }

    const [randomImage] = await Image.aggregate([
      { $match: { category: lowerCategory } },
      { $sample: { size: 1 } }
    ]);

    if (!randomImage) {
      return res.status(404).json({ error: "No images found for this category" });
    }

    return res.json(randomImage);
  } catch (error) {
    console.error("Error fetching image:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


module.exports = {
  getImages,
};
