// src/services/mediaService.js
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_SERVER_URL;

export const fetchImages = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/images`);
    return response.data;
  } catch (error) {
    console.error("Error fetching images:", error);
    return [];
  }
};

export const fetchVideos = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/videos`);
    return response.data;
  } catch (error) {
    console.error("Error fetching videos:", error);
    return [];
  }
};
