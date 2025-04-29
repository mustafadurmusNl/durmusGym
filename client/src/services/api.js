// services/api.js

export const postData = async (url, data) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      const json = await response.json();
      return { success: response.ok, data: json };
    } catch (error) {
      console.error("API POST error:", error);
      return { success: false, data: { error: "Network error" } };
    }
  };
  