// src/services/authService.js
const BASE_URL = process.env.REACT_APP_BASE_SERVER_URL;

export const loginUser = async ({ email, password }) => {
  const response = await fetch(`${BASE_URL}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // Eğer cookie/token gönderilecekse
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Login failed");
  }

  const data = await response.json();
  return data; // örn: { token: "...", user: { name: ..., email: ... } }
};
