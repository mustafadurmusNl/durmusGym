// src/services/languageService.js
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_SERVER_URL || "http://localhost:5000"; // Fallback to local

export const fetchLanguage = async (langCode) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/languages/${langCode}`);
    return response.data; // Return only translations
  } catch (error) {
    console.error(`Error fetching language (${langCode}):`, error);
    return {}; // Return empty object to prevent breaking UI
  }
};
