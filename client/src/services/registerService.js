const BASE_URL =
  process.env.REACT_APP_BASE_SERVER_URL || "http://localhost:5000";

export const registerUser = async (userData) => {
  const res = await fetch(`${BASE_URL}/api/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  const data = await res.json(); // Always attempt to parse JSON

  if (!res.ok) {
    // If the response status is not in the 2xx range (e.g., 409, 400, 500)
    // Throw an error with the message from the backend
    throw new Error(
      data.message || "An unknown error occurred during registration."
    );
  }

  // If res.ok is true, it's a successful 2xx response
  return data;
};
