import React from "react";
import { Link } from "react-router-dom";
import "../styles/PersonalApproach.css";

const PersonalApproach = ({ image, translations }) => {
  return (
    <div className="personal-approach" style={{ display: "flex", height: "100vh" }}>
      <div style={{ flex: 1, padding: "20px" }}>
        <h2>{translations?.title || "Train at your level."}</h2>
        <p>{translations?.description || "At DurmusGym we believe in a personal approach..."}</p>
        <Link to="/methods" className="btn btn-secondary">
          {translations?.button || "Discover Working Method"}
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
