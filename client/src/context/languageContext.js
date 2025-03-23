import React, { createContext, useState, useEffect } from "react";
import i18n from "../i18n";
import { fetchLanguage } from "../services/languageService";

const LanguageContext = createContext();

const LanguageProvider = ({ children }) => {
  const [selectedLang, setSelectedLang] = useState("en"); // Default language
  const [translations, setTranslations] = useState({});

  // Retrieve saved language from localStorage on first load
  useEffect(() => {
    const savedLang = localStorage.getItem("selectedLang") || "en";
    setSelectedLang(savedLang);
  }, []);

  // Fetch translations when selectedLang changes
  useEffect(() => {
    i18n.changeLanguage(selectedLang); // Sync i18n.js language with context
    const loadTranslations = async () => {
      const fetchedTranslations = await fetchLanguage(selectedLang);
      setTranslations(fetchedTranslations);
    };
    loadTranslations();
  }, [selectedLang]); // Now selectedLang is properly used

  // Change language function
  const changeLanguage = (lang) => {
    if (lang !== selectedLang) {
      setSelectedLang(lang);
      localStorage.setItem("selectedLang", lang);
    }
  };

  return (
    <LanguageContext.Provider value={{ selectedLang, translations, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export { LanguageContext, LanguageProvider };
