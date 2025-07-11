// src/components/NavBar.js
import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "../context/languageContext";
import LanguageSelector from "./LanguageSelector";
import { AuthContext } from "../context/AuthContext";
import "../styles/Navbar.css";

const NavBar = () => {
  const { t } = useTranslation();
  const { translations } = useContext(LanguageContext);
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  const translate = (key) => translations[key] || t(key);
  const isActive = (path) => (location.pathname === path ? "active" : "");

  return (
    <nav className="navbar">
      <div className="navbar-header">
        <div className="navbar-brand">
          <Link to="/" onClick={closeMenu}>
            <img src="/logo.png" alt="DurmusGym Logo" className="navbar-logo" />
          </Link>
          <Link to="/" className="brand-name" onClick={closeMenu}>
            DurmusGym
          </Link>
        </div>
        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>
      </div>

      <ul className={`navbar-links ${isMenuOpen ? "open" : ""}`}>
        <li className={isActive("/personal-training")}>
          <Link to="/personal-training" onClick={closeMenu}>
            {translate("navbar.personalTraining")}
          </Link>
        </li>
        <li className={isActive("/pilates")}>
          <Link to="/pilates" onClick={closeMenu}>
            {translate("navbar.pilates")}
          </Link>
        </li>
        <li className={isActive("/diet")}>
          <Link to="/diet" onClick={closeMenu}>
            {translate("navbar.diet")}
          </Link>
        </li>
        <li className={isActive("/library")}>
          <Link to="/library" onClick={closeMenu}>
            {translate("navbar.library")}
          </Link>
        </li>
        <li className={isActive("/about")}>
          <Link to="/about" onClick={closeMenu}>
            {translate("navbar.about")}
          </Link>
        </li>
        <li className={isActive("/method")}>
          <Link to="/method" onClick={closeMenu}>
            {translate("navbar.method")}
          </Link>
        </li>
        <li className={isActive("/contact")}>
          <Link to="/contact" onClick={closeMenu}>
            {translate("navbar.contact")}
          </Link>
        </li>
        <li className={isActive("/yoga")}>
          <Link to="/yoga" onClick={closeMenu}>
            {translate("navbar.yoga")}
          </Link>
        </li>

        {user ? (
          <li className="navbar-user-dropdown">
            <span className="welcome-message">
              {translate("navbar.welcome")},{" "}
              {user.firstName ||
                user.name?.split(" ")[0] ||
                user.email ||
                "User"}
              !
            </span>
            <ul className="dropdown-menu">
              <li className={isActive("/profile")}>
                <Link to="/profile" onClick={closeMenu}>
                  {translate("navbar.profile")}
                </Link>
              </li>
              <li>
                <button
                  className="logout-button"
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                >
                  {translate("navbar.logout")}
                </button>
              </li>
            </ul>
          </li>
        ) : (
          <>
            <li className={isActive("/login")}>
              <Link to="/login" onClick={closeMenu}>
                {translate("navbar.login")}
              </Link>
            </li>
            <li className={isActive("/free-trial-page") + " cta"}>
              <Link to="/free-trial-page" onClick={closeMenu}>
                {translate("navbar.freeTrial")}
              </Link>
            </li>
          </>
        )}

        <li className="language-switcher">
          <LanguageSelector />
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
