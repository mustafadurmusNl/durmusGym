import React from "react";
import { Dumbbell, StretchHorizontal, Salad } from "lucide-react";

import "../styles/HeroHighlights.css";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const HeroHighlights = () => {
  const { t } = useTranslation();

  return (
    <div className="hero-highlights">
      {/* Personal Training */}
      <Link to="/personal-training" className="highlight-link">
        <div className="highlight-item">
          <Dumbbell className="highlight-icon" />
          <h3>{t("heroHighlights.title1")}</h3>
          <p>{t("heroHighlights.desc1")}</p>
        </div>
      </Link>

      {/* Pilates Encouragement */}
      <Link to="/pilates" className="highlight-link">
        <div className="highlight-item">
          <StretchHorizontal className="highlight-icon" />
          <h3>{t("heroHighlights.title2Pilates") || "Empower Your Core"}</h3>
          <p>
            {t("heroHighlights.desc2Pilates") ||
              "Pilates strengthens your body, improves posture, and builds sustainable flexibility for long-term wellness."}
          </p>
        </div>
      </Link>

      {/* Diet & Nutrition Importance */}
      <Link to="/diet" className="highlight-link">
        <div className="highlight-item">
          <Salad className="highlight-icon" />
          <h3>{t("heroHighlights.title3Diet") || "Fuel Your Fitness"}</h3>
          <p>
            {t("heroHighlights.desc3Diet") ||
              "Proper nutrition enhances performance, speeds recovery, and lays the foundation for long-term fitness success."}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default HeroHighlights;
