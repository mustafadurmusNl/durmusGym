// src/components/DuoTraining.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/DuoTraining.css';

const DuoTraining = ({ translations = {} }) => {
  const title = translations?.title?.trim() || "Duo Training"; // Ensure fallback text always appears
  return (
    <div className="option-card">
      <h3>{title}</h3>
      <div className="description">
        <ul>
          <li>✓ {translations?.privateGym?.trim() || "Duo training in the private gym in Bergen op Zoom"}</li>
          <li>✓ {translations?.customSchedules?.trim() || "Custom made schedules"}</li>
          <li>✓ {translations?.personalCoach?.trim() || "Your personal coach"}</li>
          <li>✓ {translations?.nutritionalGuidance?.trim() || "Personalized Nutritional Guidance"}</li>
          <li>✓ {translations?.tailoredSessions?.trim() || "Number of sessions tailored to you and for you"}</li>
        </ul>
        <Link to="/free-trial" className="btn-more-info">
        {translations?.moreInfo?.trim() || "More Information"}
      </Link>
      </div>
    </div>
  );
};

export default DuoTraining;
