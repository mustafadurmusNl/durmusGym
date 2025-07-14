// client/src/services/registerService.js
import { sanitizeFormData } from "../util/inputSanitizer";

const BASE_URL =
  process.env.REACT_APP_BASE_SERVER_URL || "http://localhost:5000";

export const registerUser = async (userData) => {
  const sanitizedData = sanitizeFormData(userData);

  const res = await fetch(`${BASE_URL}/api/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(sanitizedData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data.message || "An unknown error occurred during registration."
    );
  }

  return data;
};
