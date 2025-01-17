// src/components/PTOption.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/PTOption.css';

const PTOption = () => {
  return (
    <div className="option-card">
      <h3>Personal Training</h3>
      <p>1-on-1</p>
      <Link to="/free-trial" className="btn-more-info">More Information</Link>
      <div className="description">
        <ul>
          <li>✓ Personal training in the private gym in Bergen op Zoom</li>
          <li>✓ Custom made schedules</li>
          <li>✓ Your personal coach</li>
          <li>✓ Personalized Nutritional Guidance</li>
          <li>✓ Number of sessions tailored to you and for you</li>
        </ul>
      </div>
    </div>
  );
};

export default PTOption;
