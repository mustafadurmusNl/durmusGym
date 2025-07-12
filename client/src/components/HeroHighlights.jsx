import React from "react";
import { Dumbbell, HeartPulse, CalendarCheck } from "lucide-react";
import "../styles/HeroHighlights.css";
import { useTranslation } from "react-i18next";

const HeroHighlights = () => {
  const { t } = useTranslation();

  return (
    <div className="hero-highlights">
      <div className="highlight-item">
        <Dumbbell className="highlight-icon" />
        <h3>{t("heroHighlights.title1")}</h3>
        <p>{t("heroHighlights.desc1")}</p>
      </div>

      <div className="highlight-item">
        <HeartPulse className="highlight-icon" />
        <h3>{t("heroHighlights.title2")}</h3>
        <p>{t("heroHighlights.desc2")}</p>
      </div>

      <div className="highlight-item">
        <CalendarCheck className="highlight-icon" />
        <h3>{t("heroHighlights.title3")}</h3>
        <p>{t("heroHighlights.desc3")}</p>
      </div>
    </div>
  );
};

export default HeroHighlights;
