const express = require("express");
const { getImages, getVideos } = require("../controllers/mediaController");
const authenticate = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Artık sadece giriş yapanlar erişebilir
router.get("/images", authenticate, getImages);
router.get("/videos", authenticate, getVideos);

module.exports = router;
