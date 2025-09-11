import React, { useState } from "react";
import { Dumbbell, StretchHorizontal, Salad } from "lucide-react";
import "../styles/HeroHighlights.css";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const HeroHighlights = () => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);

  const highlights = [
    {
      title: t("heroHighlights.title1"),
      desc: t("heroHighlights.desc1"),
      icon: <Dumbbell className="highlight-icon" />,
      link: "/personal-training",
    },
    {
      title: t("heroHighlights.title2Pilates") || "Empower Your Core",
      desc:
        t("heroHighlights.desc2Pilates") ||
        "Pilates strengthens your body, improves posture, and builds sustainable flexibility.",
      icon: <StretchHorizontal className="highlight-icon" />,
      link: "/pilates",
    },
    {
      title: t("heroHighlights.title3Diet") || "Fuel Your Fitness",
      desc:
        t("heroHighlights.desc3Diet") ||
        "Proper nutrition enhances performance, speeds recovery, and supports long-term health.",
      icon: <Salad className="highlight-icon" />,
      link: "/diet",
    },
  ];

  const handleChange = (index) => setActiveIndex(index);

  return (
    <div className="hero-highlights-container">
      {/* Desktop/Tablet: Show all three vertically */}
      <div className="highlights-vertical">
        {highlights.map((highlight, index) => (
          <div key={index} className="highlight-wrapper">
            <Link to={highlight.link} className="highlight-link">
              <div className="highlight-item">
                {highlight.icon}
                <h3>{highlight.title}</h3>
                <p>{highlight.desc}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Mobile: Show slider */}
      <div className="highlights-slider">
        <div className="highlight-slide">
          <Link to={highlights[activeIndex].link} className="highlight-link">
            <div className="highlight-item">
              {highlights[activeIndex].icon}
              <h3>{highlights[activeIndex].title}</h3>
              <p>{highlights[activeIndex].desc}</p>
            </div>
          </Link>
        </div>

        <div className="highlight-controls">
          {highlights.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === activeIndex ? "active" : ""}`}
              onClick={() => handleChange(index)}
              aria-label={`Highlight ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroHighlights;
