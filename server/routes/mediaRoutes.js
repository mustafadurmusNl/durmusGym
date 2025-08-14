const express = require("express");
const { getImages, getVideos } = require("../controllers/mediaController");
const router = express.Router();

// ✅ Artık sadece giriş yapanlar erişebilir
router.get("/images", getImages);
router.get("/videos", getVideos); // protected

module.exports = router;
