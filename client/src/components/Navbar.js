// src/components/NavBar.js
import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "../context/languageContext";
import LanguageSelector from "./LanguageSelector";
import "../styles/Navbar.css";

const NavBar = () => {
  const { t } = useTranslation();
  const { translations } = useContext(LanguageContext);
  const location = useLocation();

  const translate = (key) => translations[key] || t(key);
  const isActive = (path) => (location.pathname === path ? "active" : "");

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
        <li className={isActive("/personal-training")}>
          <Link to="/personal-training">
            {translate("navbar.personalTraining")}
          </Link>
        </li>
        <li className={isActive("/pilates")}>
          <Link to="/pilates">{translate("navbar.pilates")}</Link>
        </li>
        <li className={isActive("/diet")}>
          <Link to="/diet">{translate("navbar.diet")}</Link>
        </li>
        <li className={isActive("/library")}>
          <Link to="/library">{translate("navbar.library") || "Library"}</Link>
        </li>

        <li className={isActive("/about")}>
          <Link to="/about">{translate("navbar.about")}</Link>
        </li>
        <li className={isActive("/method")}>
          <Link to="/method">{translate("navbar.method")}</Link>
        </li>
        <li className={isActive("/contact")}>
          <Link to="/contact">{translate("navbar.contact")}</Link>
        </li>
        <li className={isActive("/yoga")}>
          <Link to="/yoga">{translate("navbar.yoga")}</Link>
        </li>
        <li className={isActive("/free-trial") + " cta"}>
          <Link to="/free-trial-page">{translate("navbar.freeTrial")}</Link>
        </li>
        <li className={isActive("/login")}>
          <Link to="/login">{translate("navbar.login")}</Link>
        </li>

        <li className="language-switcher">
          <LanguageSelector />
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
