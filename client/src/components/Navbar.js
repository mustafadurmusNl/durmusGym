// src/components/NavBar.js
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../context/languageContext"; // Import LanguageContext
import "../styles/Navbar.css";

const NavBar = () => {
  const { selectedLang, changeLanguage } = useContext(LanguageContext); // Access language context

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
        <li>
          <Link to="/personal-training">
            {selectedLang === "en" ? "Personal Training" : selectedLang === "nl" ? "Persoonlijke Training" : "Kişisel Eğitim"}
          </Link>
        </li>
        <li>
          <Link to="/pilates">
            {selectedLang === "en" ? "Pilates" : selectedLang === "nl" ? "Pilates" : "Pilates"}
          </Link>
        </li>
        <li>
          <Link to="/diet">
            {selectedLang === "en" ? "Diet" : selectedLang === "nl" ? "Dieet" : "Diyet"}
          </Link>
        </li>
        <li>
          <Link to="/about">
            {selectedLang === "en" ? "About" : selectedLang === "nl" ? "Over" : "Hakkında"}
          </Link>
        </li>
        <li>
          <Link to="/method">
            {selectedLang === "en" ? "Method" : selectedLang === "nl" ? "Methode" : "Yöntem"}
          </Link>
        </li>
        <li>
          <Link to="/contact">
            {selectedLang === "en" ? "Contact" : selectedLang === "nl" ? "Contact" : "İletişim"}
          </Link>
        </li>
        <li>
          <Link to="/free-trial" className="cta">
            {selectedLang === "en" ? "Free Trial Lesson" : selectedLang === "nl" ? "Gratis Proefles" : "Ücretsiz Deneme Dersi"}
          </Link>
        </li>
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
