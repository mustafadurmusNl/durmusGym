import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useTranslation from "../hooks/useTranslation";
import { fetchImages } from "../services/mediaService";
import { CATEGORIES } from "../constants/categories";


const Yoga = () => {
  const { translations, isLoading } = useTranslation("yogaPage");
  const [yogaImage, setYogaImage] = useState(null);
  const [isImageLoading, setIsImageLoading] = useState(true);

  useEffect(() => {
    const getYogaImage = async () => {
      try {
        const [image] = await fetchImages(CATEGORIES.YOGA); // category via constant
        setYogaImage(image);
      } catch (error) {
        console.error("Error fetching yoga image:", error);
      } finally {
        setIsImageLoading(false);
      }
    };

    getYogaImage();
  }, []);

  if (isLoading) return <div>Loading translations...</div>;
  if (!translations) return <div>No translations available for Yoga page.</div>;

  return (
    <div className="yoga-container">
      <div className="hero-section">
        <div className="image-content">
          {isImageLoading ? (
            <p>Loading image...</p>
          ) : (
            yogaImage && (
              <img
                src={yogaImage?.src?.large}
                alt={yogaImage?.alt || "Yoga at KoepelGym"}
                className="hero-image"
              />
            )
          )}
        </div>
        <div className="text-content">
          <h1>{translations.title}</h1>
          <h2>{translations.subtitle}</h2>
          <p>{translations.description}</p>
          <p>{translations.description2}</p>
          <p>{translations.description3}</p>
          <Link to="/free-trial">
            <button className="cta-button">
              {translations.freeTrialText || "Free Trial Lesson"}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Yoga;
