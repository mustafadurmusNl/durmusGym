// src/components/NavBar.js
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "../context/languageContext"; // Import LanguageContext
import "../styles/Navbar.css";

const NavBar = () => {
  const { t } = useTranslation(); // Use i18n translation
  const { changeLanguage } = useContext(LanguageContext); // Access language context

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
        <li><Link to="/personal-training">{t("navbar.personalTraining")}</Link></li>
        <li><Link to="/pilates">{t("navbar.pilates")}</Link></li>
        <li><Link to="/diet">{t("navbar.diet")}</Link></li>
        <li><Link to="/about">{t("navbar.about")}</Link></li>
        <li><Link to="/method">{t("navbar.method")}</Link></li>
        <li><Link to="/contact">{t("navbar.contact")}</Link></li>
        <li><Link to="/free-trial" className="cta">{t("navbar.freeTrial")}</Link></li>
        <li><Link to="/yoga">{t("navbar.yoga")}</Link></li>
        {/* Language Switcher */}
        <li className="language-switcher">
          <button onClick={() => changeLanguage("en")}>EN</button>
          <button onClick={() => changeLanguage("nl")}>NL</button>
          <button onClick={() => changeLanguage("tr")}>TR</button>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
