// src/components/OptionsSection.js
import React from 'react';
import PTOption from './PTOption';
import DuoTraining from './DuoTraining';
import PilatesOption from './PilatesOption';
import '../styles/OptionsSection.css';

const OptionsSection = () => {
  return (
    <div className="options-section">
      <PTOption />
      <DuoTraining />
      <PilatesOption />
    </div>
  );
};

export default OptionsSection;
