import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useTranslation from "../hooks/useTranslation"; // Custom translation hook
import { fetchImages } from "../services/mediaService"; // API to fetch images
import "../styles/Diet.css";

const Diet = () => {
  const { translations, isLoading } = useTranslation("dietPage"); // Fetch translations for this page
  const [images, setImages] = useState([]);
  const [isImagesLoading, setIsImagesLoading] = useState(true); // Image loading state

  useEffect(() => {
    const getImages = async () => {
      try {
        const data = await fetchImages();
        setImages(data);
        setIsImagesLoading(false); // Stop loading once images are fetched
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    getImages(); // Fetch images once on component mount
  }, []);

  // Show loading state while translations are being fetched
  if (isLoading) {
    return <div>Loading translations...</div>;
  }

  // Show fallback if no translations are found
  if (!translations) {
    return <div>No translations available for Diet page.</div>;
  }

  return (
    <div className="diet-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="text-content">
          <h1>{translations.title || "Loading..."}</h1>
          <p>{translations.subtitle || "Loading..."}</p>
          <p>{translations.description || "Loading..."}</p>
          <Link to="/free-trial">
            <button className="cta-button">{translations.freeTrialText || "Loading..."}</button>
          </Link>
        </div>
        <div className="image-content">
          {isImagesLoading ? (
            <p>Loading image...</p>
          ) : (
            images.length > 0 && (
              <img
                src={images[61]?.src?.large} // Display an appropriate image
                alt="Healthy Diet"
                className="hero-image"
              />
            )
          )}
        </div>
      </div>

      {/* Diet Details Section */}
      <div className="details-section">
        <h2>{translations.formTitle || "Get Your Personalized Diet Plan"}</h2>
        <p>{translations.description2 || "Fuel your body with balanced nutrition, fasting, and proper sleep to complement your workouts."}</p>
        <p>{translations.description3 || "Achieve your fitness goals with our tailored diet plans and expert guidance."}</p>
        <p>{translations.description4 || "Start today and transform your eating habits for a healthier lifestyle."}</p>

        {/* Diet Plan Form */}
        <form className="diet-form">
          <div className="form-group">
            <label htmlFor="name">{translations.name || "Name"}</label>
            <input type="text" id="name" name="name" placeholder={translations.placeholderName || "Your Name"} />
          </div>
          <div className="form-group">
            <label htmlFor="email">{translations.email || "Email Address"}</label>
            <input type="email" id="email" name="email" placeholder={translations.placeholderEmail || "Your Email Address"} />
          </div>
          <div className="form-group">
            <label htmlFor="phone">{translations.phone || "Phone Number"}</label>
            <input type="tel" id="phone" name="phone" placeholder={translations.placeholderPhone || "Your Phone Number"} />
          </div>
          <div className="form-group">
            <label htmlFor="comments">{translations.comments || "Comments"}</label>
            <textarea id="comments" name="comments" rows="4" placeholder={translations.placeholderComments || "Your dietary preferences, goals, etc."}></textarea>
          </div>
          <button type="submit" className="send-button">
            {translations.sendButton || "Send"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Diet;
