// client/src/pages/ChangePasswordPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ChangePasswordPage = () => {
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleChange = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const response = await fetch(
      `${process.env.REACT_APP_BASE_SERVER_URL}/api/users/change-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ newPassword }),
      }
    );

    if (response.ok) {
      navigate("/"); // Password updated
    } else {
      alert("Failed to update password.");
    }
  };

  return (
    <form onSubmit={handleChange}>
      <h2>Change your password</h2>
      <input
        type="password"
        placeholder="New password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
      />
      <button type="submit">Update Password</button>
    </form>
  );
};

export default ChangePasswordPage;
