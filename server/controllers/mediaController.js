const Image = require("../models/Image");
const { isImageDataReady } = require("../services/imageService");
const { isVideoDataReady } = require("../services/videoService");
const Video = require("../models/Video");

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
      "progresstracking",
    ];

    const lowerCategory = category.toLowerCase();
    if (!validCategories.includes(lowerCategory)) {
      return res.status(400).json({ error: "Invalid category" });
    }

    const [randomImage] = await Image.aggregate([
      { $match: { category: lowerCategory } },
      { $sample: { size: 1 } },
    ]);

    if (!randomImage) {
      return res
        .status(404)
        .json({ error: "No images found for this category" });
    }

    return res.json(randomImage);
  } catch (error) {
    console.error("Error fetching image:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getVideos = async (req, res) => {
  try {
    if (!isVideoDataReady()) {
      return res
        .status(503)
        .json({ error: "Videos are still being prepared. Try again shortly." });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Accept category from query
    const category = req.query.category
      ? req.query.category.toLowerCase()
      : null;

    // Validate category if given (use the same list as images)
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
      "progresstracking",
    ];

    let filter = {};
    if (category) {
      if (!validCategories.includes(category)) {
        return res.status(400).json({ error: "Invalid category" });
      }
      filter.category = category;
    }

    const videos = await Video.find(filter).skip(skip).limit(limit);
    const totalVideos = await Video.countDocuments(filter);

    res.json({
      videos,
      currentPage: page,
      totalPages: Math.ceil(totalVideos / limit),
    });
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getImages,
  getVideos,
};
