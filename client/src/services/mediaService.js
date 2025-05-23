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
