import { useState, useEffect, useContext } from "react";
import { LanguageContext } from "../context/languageContext"; 
import { fetchLanguage } from "../services/languageService"; // API call for fetching language translations

const useTranslation = (pageKey) => {
  const { selectedLang } = useContext(LanguageContext); // Get the selected language from context
  const [translations, setTranslations] = useState(null); // Keep initial state as null
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    const getTranslations = async () => {
      setIsLoading(true); // Start loading when the fetch is triggered

      try {
        const data = await fetchLanguage(selectedLang); // Fetch data based on the selected language
       // console.log("Fetched language data:", data); // Log to check the structure

        // Check if the pageKey exists in the response and set the appropriate translations
        if (data && data[pageKey]) {
          setTranslations(data[pageKey]); // Set page-specific translations
        } else {
          console.warn(`Translations for ${pageKey} not found. Using fallback data.`);
          setTranslations({}); // Set empty object if no data is found
        }
      } catch (error) {
        console.error("Error fetching translations:", error);
        setTranslations({}); // Handle errors by setting translations to an empty object
      } finally {
        setIsLoading(false); // Stop loading once the fetch completes
      }
    };

    getTranslations(); // Trigger the translation fetching
  }, [selectedLang, pageKey]); // Re-fetch if the language or page key changes

  return { translations, isLoading }; // Ensure you're returning both translations and loading state
};

export default useTranslation;

