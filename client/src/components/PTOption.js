import React from "react";
import { Link } from "react-router-dom";
import "../styles/PTOption.css";

const PTOption = ({ translations = {} }) => {
  const title = translations?.title?.trim() || "Kişisel Antrenman"; // Ensure fallback text always appears

  return (
    <div className="option-card">
      <h3>{title}</h3>
      <div className="description">
        <ul>
          <li>✓ {translations?.privateGym?.trim() || "Özel spor salonunda antrenman yapın"}</li>
          <li>✓ {translations?.customSchedules?.trim() || "Size özel antrenman programları"}</li>
          <li>✓ {translations?.personalCoach?.trim() || "Kişisel antrenörünüzden rehberlik"}</li>
          <li>✓ {translations?.nutritionalGuidance?.trim() || "Kişiye özel beslenme rehberliği"}</li>
          <li>✓ {translations?.tailoredSessions?.trim() || "İhtiyacınıza göre uyarlanmış seanslar"}</li>
        </ul>
        <Link to="/free-trial" className="btn-more-info">
          {translations?.moreInfo?.trim() || "Daha Fazla Bilgi"}
        </Link>
      </div>
    </div>
  );
};

export default PTOption;
