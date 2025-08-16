const express = require("express");
const {
  getImages,
  getVideos,
  streamVideo,
} = require("../controllers/mediaController");
const router = express.Router();
const authenticate = require("../middleware/authMiddleware");
// ✅ Artık sadece giriş yapanlar erişebilir
router.get("/images", getImages);
router.get("/videos", getVideos); // protected
// ✅ Artık sadece giriş yapanlar erişebilir
router.get("/videos/:id/stream", authenticate, streamVideo); // protected

module.exports = router;
