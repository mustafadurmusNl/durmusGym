import React from "react";
import { Link } from "react-router-dom";
import "../styles/IntroSection.css";
import HeroHighlights from "./HeroHighlights";
const IntroSection = ({ image, translations }) => {
  console.log("hoiiiiii", image);
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
      <h1>
        {translations?.title ||
          "Your journey to strength, health, and fitness starts here."}
      </h1>
      <Link to="/personal-training" className="btn btn-primary">
        {translations?.button || "Discover More"}
      </Link>
      <HeroHighlights />
    </div>
  );
};

export default IntroSection;
