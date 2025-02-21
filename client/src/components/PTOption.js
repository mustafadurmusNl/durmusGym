import React from "react";
import { Link } from "react-router-dom";
import "../styles/PTOption.css";

const PTOption = ({ translations }) => {
  console.log("PTOption Translations:", translations); // Check in console

  if (!translations) return <div>Loading...</div>;

  return (
    <div className="option-card" style={{ display: "block", color: "black" }}>
      <h3>{translations.title || "Kişisel Antrenman"}</h3>
      <ul>
        <li>{translations.privateGym}</li>
        <li>{translations.customSchedules}</li>
        <li>{translations.personalCoach}</li>
        <li>{translations.nutritionalGuidance}</li>
        <li>{translations.tailoredSessions}</li>
      </ul>
      <Link to="/free-trial" className="btn-more-info">Daha Fazla Bilgi</Link>
    </div>
  );
};

export default PTOption;
