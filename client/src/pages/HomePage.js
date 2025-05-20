import React, { useState, useEffect } from "react";
import { fetchImages } from "../services/mediaService";
import useTranslation from "../hooks/useTranslation";
import IntroSection from "../components/IntroSection";
import PersonalApproach from "../components/PersonalApproach";
import OptionsSection from "../components/OptionsSection";
import SignupSection from "../components/SignupSection";
import FreeTrialSection from "../components/FreeTrialSection"; // Import the new Free Trial Section
const HomePage = () => {
  const { translations, isLoading: isLoadingTranslations } = useTranslation("homePage");
  const [introImage, setIntroImage] = useState(null);
  const [personalApproachImage, setPersonalApproachImage] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const [intro] = await fetchImages("intro");
        const [personal] = await fetchImages("personal");

        setIntroImage(intro);
        setPersonalApproachImage(personal);
        setIsReady(true);
      } catch (error) {
        console.error("Failed to load homepage images:", error);
      }
    };

    loadImages();
  }, []);

  if (isLoadingTranslations || !isReady || !introImage || !personalApproachImage) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <IntroSection
        image={introImage?.src?.large}
        translations={translations?.intro}
      />
      <PersonalApproach
        image={personalApproachImage?.src?.large}
        translations={translations?.personalApproach}
      />
      <OptionsSection translations={translations?.options} />
      <SignupSection translations={translations?.signup} />
       {/* New Free Trial Scroll Section */}
    <FreeTrialSection />
    </div>
  );
};

export default HomePage;
