// src/components/NavBar.js
import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "../context/languageContext";
import "../styles/Navbar.css";

const NavBar = () => {
  const { t, i18n } = useTranslation();
  const { changeLanguage } = useContext(LanguageContext);
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? "active" : "";

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">
          <img src="/logo.png" alt="DurmusGym Logo" className="navbar-logo" />
        </Link>
        <Link to="/" className="brand-name">DurmusGym</Link>
      </div>

      <ul className="navbar-links">
        <li className={isActive("/personal-training")}>
          <Link to="/personal-training">{t("navbar.personalTraining")}</Link>
        </li>
        <li className={isActive("/pilates")}>
          <Link to="/pilates">{t("navbar.pilates")}</Link>
        </li>
        <li className={isActive("/diet")}>
          <Link to="/diet">{t("navbar.diet")}</Link>
        </li>
        <li className={isActive("/about")}>
          <Link to="/about">{t("navbar.about")}</Link>
        </li>
        <li className={isActive("/method")}>
          <Link to="/method">{t("navbar.method")}</Link>
        </li>
        <li className={isActive("/contact")}>
          <Link to="/contact">{t("navbar.contact")}</Link>
        </li>
        <li className={isActive("/yoga")}>
          <Link to="/yoga">{t("navbar.yoga")}</Link>
        </li>
        <li className={isActive("/free-trial") + " cta"}>
          <Link to="/free-trial-page">{t("navbar.freeTrial")}</Link>
        </li>
        <li className={isActive("/login")}>
          <Link to="/login">{t("navbar.login")}</Link>
        </li>

        {/* Language Switcher */}
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
