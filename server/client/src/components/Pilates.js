import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useTranslation from "../hooks/useTranslation"; // Import translation hook
import { fetchImages } from "../services/mediaService";
import "../styles/Pilates.css";

const Pilates = () => {
  const { translations, isLoading } = useTranslation("pilatesPage"); // Fetch translations for this page
  const [images, setImages] = useState([]);
  const [isImagesLoading, setIsImagesLoading] = useState(true);

  useEffect(() => {
    const getImages = async () => {
      try {
        const data = await fetchImages();
        setImages(data);
        setIsImagesLoading(false);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    getImages();
  }, []);

  if (isLoading) {
    return <div>Loading translations...</div>;
  }

  if (!translations) {
    return <div>No translations available for Pilates page.</div>;
  }

  return (
    <div>
      <div className="pilates-container">
        <div className="hero-section">
          <div className="image-content">
            {isImagesLoading ? (
              <p>Loading image...</p>
            ) : (
              images.length > 0 && (
                <img
                  src={images[5]?.src?.large}
                  alt="Pilates at KoepelGym"
                  className="hero-image"
                />
              )
            )}
          </div>
          <div className="text-content">
            <h1>{translations.title || "Loading..."}</h1>
            <p>{translations.subtitle || "Loading..."}</p>
            <p>{translations.description || "Loading..."}</p>
            <p>{translations.description2 || "Loading..."}</p>
            <p>{translations.description3 || "Loading..."}</p>
            <p>{translations.description4 || "Loading..."}</p>
            <p>{translations.priceInfo || "Loading..."}</p>
            <Link to="/free-trial">
              <button className="cta-button">
                {translations.freeTrialText || "Free Trial Lesson"}
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="details-section">
        <h2>{translations.tryForFree || "Try it for free!"}</h2>
        <p>
          {translations.description4 ||
            "Pilates is the perfect way to build strength without heavy weights, improve your posture, and reduce stress."}
        </p>

        <form className="trial-form">
          <div className="form-group">
            <label htmlFor="name">{translations.name || "Name"}</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder={translations.placeholderName || "Your Name"}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">{translations.email || "Email Address"}</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder={translations.placeholderEmail || "Your Email Address"}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">{translations.phone || "Phone Number"}</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder={translations.placeholderPhone || "Your Phone Number"}
            />
          </div>
          <div className="form-group">
            <label htmlFor="comments">{translations.comments || "Comments"}</label>
            <textarea
              id="comments"
              name="comments"
              rows="4"
              placeholder={translations.placeholderComments || "Availability, questions, etc."}
            ></textarea>
          </div>
          <button type="submit" className="send-button">
            {translations.sendButton || "Send"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Pilates;
