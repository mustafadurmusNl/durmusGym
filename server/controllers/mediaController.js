const axios = require('axios');

// Fetch Images from Pexels API
const getImages = async (req, res) => {
    try {
      const apiKey = process.env.PEXELS_API_KEY;
      
      if (!apiKey) {
        console.error('Pexels API key not found!');
        return res.status(500).json({ error: 'API key is missing!' });
      }
  
      const response = await axios.get('https://api.pexels.com/v1/search', {
        headers: {
          Authorization: apiKey
        },
        params: {
          query: 'gym',
          per_page: 80,
          page:2,
        },
      });
      res.json(response.data.photos);
    } catch (error) {
      console.error('Error fetching images:', error);
      res.status(500).json({ error: 'Failed to fetch images' });
    }
  };
  

// Fetch Videos from Pexels API
const getVideos = async (req, res) => {
  try {
    const response = await axios.get('https://api.pexels.com/videos/search', {
      headers: {
        Authorization: process.env.PEXELS_API_KEY,
      },
      params: {
        query: 'gym',
        per_page: 10,
      },
    });
    res.json(response.data.videos);
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).json({ error: 'Failed to fetch videos' });
  }
};

module.exports = { getImages, getVideos };
