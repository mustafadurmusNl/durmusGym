import React from "react";
import { Link } from "react-router-dom";
import "../styles/IntroSection.css";
import HeroHighlights from "./HeroHighlights";

const IntroSection = ({ image, translations }) => {
  return (
    <div className="intro-section">
      <div className="intro-grid">
        <div className="intro-left">
          <HeroHighlights />
        </div>
        <div className="intro-right">
          <div
            className="intro-image"
            style={{ backgroundImage: `url(${image})` }}
          >
            <div className="intro-button-wrapper">
              <Link to="/personal-training" className="btn btn-primary">
                {translations?.button || "Discover More"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroSection;
