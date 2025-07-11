import React from "react";
import { Link } from "react-router-dom";
import "../styles/PersonalApproach.css";

const PersonalApproach = ({ image, translations }) => {
  return (
    <div className="personal-approach">
      {/* Added class names for better specificity and maintainability */}
      <div className="personal-approach-content">
        <h2>{translations?.title || "Train at your level."}</h2>
        <p>
          {translations?.description ||
            "At DurmusGym we believe in a personal approach..."}
        </p>
        <Link to="/method" className="btn btn-secondary">
          {translations?.button || "Discover Working Method"}
        </Link>
      </div>
      <div
        className="personal-approach-image"
        style={{
          backgroundImage: `url(${image})`,
          // backgroundSize and backgroundPosition are now handled in CSS
        }}
      ></div>
    </div>
  );
};

export default PersonalApproach;
