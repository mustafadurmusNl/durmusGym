const express = require('express');
const { getImages } = require('../controllers/mediaController');

const router = express.Router();

// Define routes
router.get('/images', getImages);


module.exports = router;
