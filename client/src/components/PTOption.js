import React from "react";
import { Link } from "react-router-dom";
import "../styles/PTOption.css";

const PTOption = ({ title }) => {
  return (
    <div className="option-card">
      <h3>{title || "Personal Training"}</h3>
      <p>1-on-1</p>
      <Link to="/free-trial" className="btn-more-info">More Information</Link>
    </div>
  );
};

export default PTOption;
