import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useTranslation from "../hooks/useTranslation";
import { fetchImages } from "../services/mediaService";
import { CATEGORIES } from "../constants/categories"; // Import categories
import "../styles/Diet.css";

const Diet = () => {
  const { translations, isLoading } = useTranslation("dietPage");
  const [dietImage, setDietImage] = useState(null);
  const [isImageLoading, setIsImageLoading] = useState(true);

  useEffect(() => {
    const getDietImage = async () => {
      try {
        const [image] = await fetchImages(CATEGORIES.DIET); // Use constant
        setDietImage(image);
      } catch (error) {
        console.error("Error fetching diet image:", error);
      } finally {
        setIsImageLoading(false);
      }
    };

    getDietImage();
  }, []);

  if (isLoading) return <div>Loading translations...</div>;
  if (!translations) return <div>No translations available for Diet page.</div>;

  return (
    <div className="diet-container">
      <div className="hero-section">
        <div className="text-content">
          <h1>{translations.title}</h1>
          <p>{translations.subtitle}</p>
          <p>{translations.description}</p>
          <Link to="/free-trial" className="cta-button">
            {translations.freeTrialText}
          </Link>
        </div>
        <div className="image-content">
          {isImageLoading ? (
            <p>Loading image...</p>
          ) : (
            dietImage && (
              <img
                src={dietImage?.src?.large}
                alt={dietImage?.alt || "Healthy Diet"}
                className="hero-image"
              />
            )
          )}
        </div>
      </div>

      <div className="details-section">
        <h2>{translations.formTitle}</h2>
        <p>{translations.description2}</p>
        <p>{translations.description3}</p>
        <p>{translations.description4}</p>

        <form className="diet-form">
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

export default Diet;
