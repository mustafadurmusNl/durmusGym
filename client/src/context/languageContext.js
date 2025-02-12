// src/context/LanguageContext.js
import React, { createContext, useState, useEffect } from 'react';

// Create Context for Language
const LanguageContext = createContext();

const LanguageProvider = ({ children }) => {
  const [selectedLang, setSelectedLang] = useState('en'); // Default to 'en'

  // Retrieve language from localStorage or set to default
  useEffect(() => {
    const savedLang = localStorage.getItem('selectedLang');
    if (savedLang) {
      setSelectedLang(savedLang);
    }
  }, []);

  // Update language and save to localStorage
  const changeLanguage = (lang) => {
    setSelectedLang(lang);
    localStorage.setItem('selectedLang', lang); // Store language choice in localStorage
  };

  return (
    <LanguageContext.Provider value={{ selectedLang, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export { LanguageContext, LanguageProvider };
