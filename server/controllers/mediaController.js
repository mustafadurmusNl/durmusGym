// server/controllers/mediaController.js
const Image = require("../models/Image");
const { isImageDataReady } = require("../services/imageService");
const { isVideoDataReady } = require("../services/videoService");
const Video = require("../models/Video");

const https = require("https");
const http = require("http");

// -------- Images (değişmedi) --------
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

// -------- Videos: sadece meta (PUBLIC) --------
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

    const category = req.query.category
      ? req.query.category.toLowerCase()
      : null;

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

    const filter = {};
    if (category) {
      if (!validCategories.includes(category)) {
        return res.status(400).json({ error: "Invalid category" });
      }
      filter.category = category;
    }

    // ❗ URL'İ DÖNDÜRME
    const videos = await Video.find(filter)
      .skip(skip)
      .limit(limit)
      .select("_id title category thumbnail");

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

// -------- Protected Proxy Stream --------
const streamVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const range = req.headers.range;

    // DB'den remote URL'i al
    const video = await Video.findById(id).select("url");
    if (!video) return res.status(404).json({ error: "Video not found" });
    if (!video.url) return res.status(500).json({ error: "Video URL missing" });

    const targetUrl = video.url;
    const isHttps = targetUrl.startsWith("https");
    const client = isHttps ? https : http;

    // İleri/geri sarma için Range header'ını remote kaynağa geçir
    const forwardHeaders = {};
    if (range) forwardHeaders.Range = range;
    // (opsiyonel) User-Agent vb. eklemek istersen buraya koy
    // forwardHeaders["User-Agent"] = "DurmusGym-Proxy/1.0";

    const request = client.request(
      targetUrl,
      { method: "GET", headers: forwardHeaders },
      (remoteRes) => {
        // Remote kaynaktan gelen header'ların güvenli olanlarını aynen geçir
        const passthrough = {};
        const pick = (name) => {
          const v = remoteRes.headers[name];
          if (v !== undefined) passthrough[name] = v;
        };

        pick("content-type");
        pick("content-length");
        pick("accept-ranges");
        pick("content-range");
        pick("etag");
        pick("last-modified");
        pick("cache-control");

        // Statü kodunu koru (200 veya 206)
        const status = remoteRes.statusCode === 206 ? 206 : 200;
        res.writeHead(status, passthrough);

        // Pipe et
        remoteRes.pipe(res);
      }
    );

    request.on("error", (err) => {
      console.error("Proxy stream error:", err);
      if (!res.headersSent) {
        res
          .status(502)
          .json({ error: "Bad gateway while streaming remote video" });
      } else {
        res.end();
      }
    });

    request.end();
  } catch (error) {
    console.error("Error streaming video:", error);
    if (!res.headersSent) {
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.end();
    }
  }
};

module.exports = {
  getImages,
  getVideos,
  streamVideo,
};
