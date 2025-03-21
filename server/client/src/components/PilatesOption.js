// src/components/PilatesOption.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/PilatesOption.css';

const PilatesOption = ({ translations }) => {
  return (
    <div className="option-card">
      <h3>{translations?.title || "Pilates"}</h3>
     
      <div className="description">
        <ul>
          <li>✓ {translations?.studioLocation || "Pilates in our studio in Bergen op Zoom"}</li>
          <li>✓ {translations?.flexibilityBalancePosture || "Train your flexibility, balance, and correct posture"}</li>
          <li>✓ {translations?.certifiedCoach || "Your personal Pilates certified coach"}</li>
          <li>✓ {translations?.privateOrGroupOptions || "Choose private lessons or a small, personal group of up to 4 people, which you can put together yourself"}</li>
        </ul>
        <Link to="/pilates" className="btn-more-info">
        {translations?.moreInfo || "More Information"}
      </Link>
      </div>
    </div>
  );
};

export default PilatesOption;
