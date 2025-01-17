// src/components/OptionsSection.js
import React from 'react';
import PTOption from './PTOption';
import DuoTraining from './DuoTraining';
import Pilates from './Pilates';
import '../styles/OptionsSection.css';

const OptionsSection = () => {
  return (
    <div className="options-section">
      <PTOption />
      <DuoTraining />
      <Pilates />
    </div>
  );
};

export default OptionsSection;
