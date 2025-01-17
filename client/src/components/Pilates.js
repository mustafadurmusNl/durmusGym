// src/components/Pilates.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Pilates.css';

const Pilates = () => {
  return (
    <div className="option-card">
      <h3>Pilates</h3>
      <p>Up to 4 people</p>
      <Link to="/free-trial" className="btn-more-info">More Information</Link>
      <div className="description">
        <ul>
          <li>✓ Pilates in our studio in Bergen op Zoom</li>
          <li>✓ Train your flexibility, balance, and correct posture</li>
          <li>✓ Your personal Pilates certified coach</li>
          <li>✓ Choose private lessons or a small, personal group of up to 4 people, which you can put together yourself</li>
        </ul>
      </div>
    </div>
  );
};

export default Pilates;
