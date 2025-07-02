// src/components/LanguageSelector.js
import React, { useContext, useState } from "react";
import { LanguageContext } from "../context/languageContext";
import { useTranslation } from "react-i18next";
import "../styles/LanguageSelector.css"; // Optional for styling

const LANGUAGES = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "nl", label: "Nederlands", flag: "🇳🇱" },
  { code: "tr", label: "Türkçe", flag: "🇹🇷" },
  // add more languages here
];

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const { changeLanguage } = useContext(LanguageContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="language-selector">
      <button className="language-toggle" onClick={toggleDropdown}>
        🌐 {i18n.language.toUpperCase()}
      </button>
      {isOpen && (
        <ul className="language-dropdown">
          {LANGUAGES.map((lang) => (
            <li
              key={lang.code}
              className={i18n.language === lang.code ? "active" : ""}
              onClick={() => {
                changeLanguage(lang.code);
                setIsOpen(false);
              }}
            >
              {lang.flag} {lang.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSelector;
