import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json"; // Import JSON directly
import tr from "./locales/tr.json"; // Import JSON directly
import nl from "./locales/nl.json"; // Import JSON directly

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      tr: { translation: tr },
      nl: { translation: nl },
    },
    lng: localStorage.getItem("selectedLang") || "en", // Load last used language
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

export default i18n;
