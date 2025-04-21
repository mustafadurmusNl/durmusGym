import axios from "axios";

const BASE_URL = "http://localhost:5000";  // Update with your server URL if needed

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
