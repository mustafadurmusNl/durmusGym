// src/components/DuoTraining.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/DuoTraining.css';

const DuoTraining = () => {
  return (
    <div className="option-card">
      <h3>Duo Training</h3>
      <p>2-on-1</p>
      <Link to="/free-trial" className="btn-more-info">More Information</Link>
      <div className="description">
        <ul>
          <li>✓ Duo training in the private gym in Bergen op Zoom</li>
          <li>✓ Custom made schedules</li>
          <li>✓ Your personal coach</li>
          <li>✓ Personalized Nutritional Guidance</li>
          <li>✓ Number of sessions tailored to you and for you</li>
        </ul>
      </div>
    </div>
  );
};

export default DuoTraining;
