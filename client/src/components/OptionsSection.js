import React from "react";
import PTOption from "./PTOption";
import DuoTraining from "./DuoTraining";
import PilatesOption from "./PilatesOption";
import "../styles/OptionsSection.css";

const OptionsSection = ({ translations }) => {
  console.log("OptionsSection Translations:", translations);

  return (
    <div className="options-section">
      <PTOption translations={translations?.personalTraining} />
      <DuoTraining title={translations?.duoTraining} />
      <PilatesOption title={translations?.pilates} />
    </div>
  );
};

export default OptionsSection;
