import React, { useState, useEffect } from "react";
import { fetchImages } from "../services/mediaService";
import IntroSection from "../components/IntroSection";
import PersonalApproach from "../components/PersonalApproach";
import OptionsSection from "../components/OptionsSection";
import SignupSection from "../components/SignupSection";

const HomePage = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    const getImages = async () => {
      const data = await fetchImages();
      setImages(data);
      setIsLoading(false); // Set loading to false once images are fetched
    };

    getImages();
  }, []);

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div> // Show a loading indicator while images are being fetched
      ) : (
        <>
          {images.length > 0 && (
            <>
              <IntroSection image={images[3]?.src?.large} />
              <PersonalApproach image={images[19]?.src?.large} />
            </>
          )}
          <OptionsSection />
          <SignupSection />
        </>
      )}
    </div>
  );
};

export default HomePage;
