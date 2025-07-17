// server/services/videoService.js
const axios = require("axios");
const Video = require("../models/Video");

const PEXELS_VIDEO_API_URL =
  process.env.PEXELS_VIDEO_API_URL || "https://api.pexels.com/videos/search";
const PEXELS_API_KEY = process.env.PEXELS_API_KEY;
const PER_PAGE = process.env.PEXELS_PER_PAGE || 15;
const PAGE = process.env.PEXELS_PAGE || 1;

let isReady = false;

// Map search queries to your app's category structure
const categoryMap = {
  pilates: "pilates",
  yoga: "yoga",
  "personal training": "personal",
  "fitness intro": "intro",
  "healthy diet": "diet",
  "training method": "method",
  "fitness assessment": "assessment",
  "custom workout plan": "customplan",
  "training session": "training",
  "progress tracking": "progresstracking",
};

const fetchAndStoreVideos = async () => {
  try {
    if (!PEXELS_API_KEY) {
      console.error("Pexels API key not found!");
      return;
    }

    // Clear existing videos before seeding new ones (optional)
    await Video.deleteMany({});

    for (const [pexelsQuery, appCategory] of Object.entries(categoryMap)) {
      const response = await axios.get(PEXELS_VIDEO_API_URL, {
        headers: { Authorization: PEXELS_API_KEY },
        params: {
          query: pexelsQuery,
          per_page: PER_PAGE,
          page: PAGE,
        },
      });

      // Pexels video API returns 'videos' array
      const videos = response.data.videos.map((video) => ({
        title: video.user.name || `${pexelsQuery} video`,
        url:
          video.video_files.find((file) => file.quality === "sd")?.link ||
          video.video_files[0]?.link,
        thumbnail: video.image,
        description: video.user.url || "",
        category: appCategory,
      }));

      await Video.insertMany(videos);
    }

    console.log("Videos saved to DB with categories.");
    isReady = true;
  } catch (error) {
    console.error("Error fetching and storing videos:", error);
  }
};

const isVideoDataReady = () => isReady;

const getVideosFromDB = async () => {
  try {
    const videos = await Video.find();
    return videos.length > 0 ? videos : null;
  } catch (error) {
    console.error("Error fetching videos from DB:", error);
    throw new Error("Failed to retrieve videos");
  }
};

module.exports = {
  fetchAndStoreVideos,
  getVideosFromDB,
  isVideoDataReady,
};
