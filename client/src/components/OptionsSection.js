import React from "react";
import PTOption from "./PTOption";
import DuoTraining from "./DuoTraining";
import PilatesOption from "./PilatesOption";
import "../styles/OptionsSection.css";

const OptionsSection = ({ translations }) => {
  return (
    <div className="options-section">
      <PTOption title={translations?.personalTraining} />
      <DuoTraining title={translations?.duoTraining} />
      <PilatesOption title={translations?.pilates} />
    </div>
  );
};

export default OptionsSection;
