// src/components/NavBar.js
import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom"; // Import useLocation
import { useTranslation } from "react-i18next";
import { LanguageContext } from "../context/languageContext"; // Import LanguageContext
import "../styles/Navbar.css";

const NavBar = () => {
  const { t, i18n } = useTranslation(); // Use i18n translation
  const { changeLanguage } = useContext(LanguageContext); // Access language context
  const location = useLocation(); // Get current route

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">
          <img src="/logo.png" alt="DurmusGym Logo" className="navbar-logo" />
        </Link>
        <Link to="/" className="brand-name">
          DurmusGym
        </Link>
      </div>
      <ul className="navbar-links">
        <li className={location.pathname === "/personal-training" ? "active" : ""}>
          <Link to="/personal-training">{t("navbar.personalTraining")}</Link>
        </li>
        <li className={location.pathname === "/pilates" ? "active" : ""}>
          <Link to="/pilates">{t("navbar.pilates")}</Link>
        </li>
        <li className={location.pathname === "/diet" ? "active" : ""}>
          <Link to="/diet">{t("navbar.diet")}</Link>
        </li>
        <li className={location.pathname === "/about" ? "active" : ""}>
          <Link to="/about">{t("navbar.about")}</Link>
        </li>
        <li className={location.pathname === "/method" ? "active" : ""}>
          <Link to="/method">{t("navbar.method")}</Link>
        </li>
        <li className={location.pathname === "/contact" ? "active" : ""}>
          <Link to="/contact">{t("navbar.contact")}</Link>
        </li>
        <li className={location.pathname === "/free-trial" ? "active cta" : "cta"}>
          <Link to="/free-trial">{t("navbar.freeTrial")}</Link>
        </li>
        <li className={location.pathname === "/yoga" ? "active" : ""}>
          <Link to="/yoga">{t("navbar.yoga")}</Link>
        </li>

        {/* Language Switcher with Active Highlight */}
        <li className="language-switcher">
          <button
            className={i18n.language === "en" ? "active" : ""}
            onClick={() => changeLanguage("en")}
          >
            EN
          </button>
          <button
            className={i18n.language === "nl" ? "active" : ""}
            onClick={() => changeLanguage("nl")}
          >
            NL
          </button>
          <button
            className={i18n.language === "tr" ? "active" : ""}
            onClick={() => changeLanguage("tr")}
          >
            TR
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
