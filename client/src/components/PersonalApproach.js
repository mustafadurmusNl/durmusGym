// src/components/PersonalApproach.js
import React from "react";
import { Link } from "react-router-dom";
import "../styles/PersonalApproach.css";
const PersonalApproach = ({ image }) => {
  return (
    <div className="personal-approach" style={{ display: "flex", height: "100vh" }}>
      <div style={{ flex: 1, padding: "20px" }}>
        <h2>Train at your level.</h2>
        <p>
          At DurmusGym we believe in a personal approach that is tailored to your pace and needs.
          In our studio in Bergen op Zoom, we focus on promoting a healthy balance between training, nutrition, and rest.
          This allows you to not only work effectively on your goals, but also achieve sustainable results that really make a difference.
          At DurmusGym we invest in your success, every step of the way.
        </p>
        <Link to="/methods" className="btn btn-secondary">
          Discover Working Method
        </Link>
      </div>
      <div
        style={{
          flex: 1,
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
    </div>
  );
};

export default PersonalApproach;
