import axios from "axios";

const BASE_URL =
  process.env.REACT_APP_BASE_SERVER_URL || "http://localhost:5000";

export const fetchImages = async (category, limit) => {
  try {
    const token = localStorage.getItem("token"); // token'ı al
    const response = await axios.get(`${BASE_URL}/api/images`, {
      params: { category, limit },
      headers: {
        Authorization: `Bearer ${token}`, // token'ı ekle
      },
    });

    return response.data ? [response.data] : [];
  } catch (error) {
    console.error("Error fetching images:", error);

    // 401 ise login sayfasına yönlendir
    if (error.response && error.response.status === 401) {
      window.location.href = "/login";
    }

    return [];
  }
};

export const fetchVideos = async (page = 1, limit = 10, category = "") => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${BASE_URL}/api/videos`, {
      params: { category, page, limit },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data || { videos: [], totalPages: 0 };
  } catch (error) {
    console.error("Error fetching videos:", error);

    if (error.response && error.response.status === 401) {
      window.location.href = "/login";
    }

    return { videos: [], totalPages: 0 };
  }
};
