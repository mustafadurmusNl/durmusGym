// client/src/services/mediaService.js
import axios from "axios";

const BASE_URL =
  process.env.REACT_APP_BASE_SERVER_URL || "http://localhost:5000";

export const fetchImages = async (category, limit) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/images`, {
      params: { category, limit },
    });
    return response.data ? [response.data] : [];
  } catch (error) {
    console.error("Error fetching images:", error);
    return [];
  }
};

export const fetchVideos = async (page = 1, limit = 10, category = "") => {
  try {
    const response = await axios.get(`${BASE_URL}/api/videos`, {
      params: { category, page, limit },
    });
    return response.data || { videos: [], totalPages: 0 };
  } catch (error) {
    console.error("Error fetching videos:", error);
    return { videos: [], totalPages: 0 };
  }
};
