// src/pages/HomePage.js
import React, { useState, useEffect } from "react";
import { fetchImages } from "../services/mediaService";
import IntroSection from "../components/IntroSection";
import PersonalApproach from "../components/PersonalApproach";
import OptionsSection from "../components/OptionsSection";
import SignupSection from "../components/SignupSection";

const HomePage = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const getImages = async () => {
      const data = await fetchImages();
      setImages(data);
    };

    getImages();
     // Ensure the page scrolls to the top when it's loaded
     window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      {images.length > 0 && (
        <>
          <IntroSection image={images[2]?.src?.large} />
          <PersonalApproach image={images[9]?.src?.large} />
        </>
      )}
      <OptionsSection />
      <SignupSection />
    </div>
  );
};

export default HomePage;
