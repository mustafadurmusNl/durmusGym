// src/components/IntroSection.js
import React from "react";
import { Link } from "react-router-dom";
import "../styles/IntroSection.css";
const IntroSection = ({ image }) => {
  return (
    <div
      className="intro-section"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <h1>Your journey to strength, health, and fitness starts here.</h1>
      <Link to="/personal-training" className="btn btn-primary">
        Discover More
      </Link>
    </div>
  );
};

export default IntroSection;
