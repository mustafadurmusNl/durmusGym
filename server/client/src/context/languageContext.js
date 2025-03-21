import React, { createContext, useState, useEffect } from "react";
import i18n from "../i18n"; // Import i18n to sync it
import { fetchLanguage } from "../services/languageService"; // Import language fetch function

const LanguageContext = createContext();

const LanguageProvider = ({ children }) => {
  const [selectedLang, setSelectedLang] = useState("en"); // Default language
  const [translations, setTranslations] = useState({}); // Store fetched translations

  // Retrieve saved language from localStorage
  useEffect(() => {

     // Sync i18n.js language with context
     i18n.changeLanguage(selectedLang);
    const savedLang = localStorage.getItem("selectedLang") || "en";
    setSelectedLang(savedLang);
    loadTranslations(savedLang);
  }, []);

  // Fetch translations when language changes
  const loadTranslations = async (langCode) => {
    const fetchedTranslations = await fetchLanguage(langCode);
    setTranslations(fetchedTranslations);
  };

  // Change language function
  const changeLanguage = (lang) => {
    setSelectedLang(lang);
    localStorage.setItem("selectedLang", lang);
    loadTranslations(lang); // Fetch new translations
    i18n.changeLanguage(lang); // Update i18n.js language
  };

  return (
    <LanguageContext.Provider value={{ selectedLang, translations, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export { LanguageContext, LanguageProvider };
