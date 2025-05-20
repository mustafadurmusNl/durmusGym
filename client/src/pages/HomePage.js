import React, { useState, useEffect } from "react";
import { fetchImages } from "../services/mediaService";
import useTranslation from "../hooks/useTranslation";
import IntroSection from "../components/IntroSection";
import PersonalApproach from "../components/PersonalApproach";
import OptionsSection from "../components/OptionsSection";
import SignupSection from "../components/SignupSection";
import FreeTrialSection from "../components/FreeTrialSection";
import "../styles/HomePage.css"; // Make sure this is imported

const HomePage = () => {
  const { translations, isLoading: isLoadingTranslations } =
    useTranslation("homePage");
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

  if (
    isLoadingTranslations ||
    !isReady ||
    !introImage ||
    !personalApproachImage
  ) {
    return <div>Loading...</div>;
  }

  return (
    <div className="home-container">
      <section className="section section-intro">
        <IntroSection
          image={introImage?.src?.original}
          translations={translations?.intro}
        />
      </section>

      <section className="section section-personal">
        <PersonalApproach
          image={personalApproachImage?.src?.original}
          translations={translations?.personalApproach}
        />
      </section>

      <section className="section section-options">
        <OptionsSection translations={translations?.options} />
      </section>

      <section className="section section-signup">
        <SignupSection translations={translations?.signup} />
      </section>

      <section className="section section-trial">
        <FreeTrialSection />
      </section>
    </div>
  );
};

export default HomePage;
