const express = require('express');
const { getImages, getVideos } = require('../controllers/mediaController');

const router = express.Router();

// Define routes
router.get('/images', getImages);
router.get('/videos', getVideos);

module.exports = router;
