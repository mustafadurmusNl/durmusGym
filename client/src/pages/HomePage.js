import React, { useState, useEffect } from "react";
import { fetchImages } from "../services/mediaService";
import useTranslation from "../hooks/useTranslation";
import IntroSection from "../components/IntroSection";
import PersonalApproach from "../components/PersonalApproach";
import OptionsSection from "../components/OptionsSection";
import SignupSection from "../components/SignupSection";

const HomePage = () => {
  const { translations, isLoading: isLoadingTranslations } = useTranslation("homePage");
  const [images, setImages] = useState([]);
  const [isLoadingImages, setIsLoadingImages] = useState(true);

  useEffect(() => {
    const getImages = async () => {
      const data = await fetchImages();
      setImages(data);
      setIsLoadingImages(false);
    };
    getImages();
  }, []);

  if (isLoadingTranslations || isLoadingImages) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {images.length > 0 && (
        <>
          <IntroSection image={images[3]?.src?.large} translations={translations?.intro} />
          <PersonalApproach image={images[19]?.src?.large} translations={translations?.personalApproach} />
        </>
      )}
      <OptionsSection translations={translations?.options} />
      <SignupSection translations={translations?.signup} />
    </div>
  );
};

export default HomePage;
