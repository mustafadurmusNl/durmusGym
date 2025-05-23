import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useTranslation from "../hooks/useTranslation";
import { fetchImages } from "../services/mediaService";
import { CATEGORIES } from "../constants/categories"; // ✅ Import the constant
import "../styles/PersonalTraining.css";

const PersonalTraining = () => {
  const { translations, isLoading } = useTranslation("personalTrainingPage");
  const [image, setImage] = useState(null);
  const [isImageLoading, setIsImageLoading] = useState(true);

  useEffect(() => {
    const getImage = async () => {
      try {
        const [img] = await fetchImages(CATEGORIES.PERSONAL); // ✅ Use constant
        setImage(img);
      } catch (error) {
        console.error("Error fetching personal training image:", error);
      } finally {
        setIsImageLoading(false);
      }
    };

    getImage();
  }, []);

  if (isLoading) return <div>Loading translations...</div>;
  if (!translations)
    return <div>No translations available for Personal Training page.</div>;

  return (
    <div className="personal-training-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="text-content">
          <h1>{translations.title}</h1>
          <p>{translations.subtitle}</p>
          <p>{translations.description}</p>
          <Link to="/free-trial-page">
            <button className="cta-button">{translations.freeTrialText}</button>
          </Link>
        </div>
        <div className="image-content">
          {isImageLoading ? (
            <p>Loading image...</p>
          ) : (
            image && (
              <img
                src={image?.src?.original}
                alt={image?.alt || "Personal Training"}
                className="hero-image"
              />
            )
          )}
        </div>
      </div>

      {/* Details Section */}
      <div className="details-section">
        <h2>{translations.tryForFree}</h2>
        <p>{translations.description2}</p>
        <p>{translations.description3}</p>
        <p>{translations.description4}</p>

        {/* Form Section */}
        <form className="trial-form">
          <div className="form-group">
            <label htmlFor="name">{translations.name}</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder={translations.placeholderName}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">{translations.email}</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder={translations.placeholderEmail}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">{translations.phone}</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder={translations.placeholderPhone}
            />
          </div>
          <div className="form-group">
            <label htmlFor="comments">{translations.comments}</label>
            <textarea
              id="comments"
              name="comments"
              rows="4"
              placeholder={translations.placeholderComments}
            ></textarea>
          </div>
          <button type="submit" className="send-button">
            {translations.sendButton}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PersonalTraining;
