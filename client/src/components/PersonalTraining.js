import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useTranslation from "../hooks/useTranslation"; // Import custom hook
import { fetchImages } from "../services/mediaService"; // Import image fetch API
import "../styles/PersonalTraining.css";

const PersonalTraining = () => {
  const { translations, isLoading } = useTranslation("personalTrainingPage"); // Fetch translations for this page
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

  //console.log("Translations for PersonalTraining page:", translations); // Log translations object

  // Render Loading State if translations are still loading
  if (isLoading) {
    return <div>Loading translations...</div>; // Show a loading text if translations are being fetched
  }

  // Render if no translations are found (fallback)
  if (!translations) {
    return <div>No translations available for PersonalTraining page.</div>;
  }

  return (
    <div className="personal-training-container">
      {/* First Section */}
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
            <p>Loading image...</p> // Show loading text while images are being fetched
          ) : (
            images.length > 0 && (
              <img
                src={images[8]?.src?.large} // Display the first image
                alt="Personal Training"
                className="hero-image"
              />
            )
          )}
        </div>
      </div>

      {/* Second Section */}
      <div className="details-section">
        <h2>{translations.tryForFree || "Try it for free"}</h2>
        <p>{translations.description2 || "Do you want to work effectively and personally on your fitness goals?"}</p>
        <p>{translations.description3 || "At KoepelGym, we offer tailor-made personal training programs to fit your needs."}</p>
        <p>{translations.description4 || "Start a free trial lesson today and discover how we can help you become fitter, stronger, and healthier."}</p>

        {/* Form Section */}
        <form className="trial-form">
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
            <textarea id="comments" name="comments" rows="4" placeholder={translations.placeholderComments || "Availability, questions, etc."}></textarea>
          </div>
          <button type="submit" className="send-button">
            {translations.sendButton || "Send"}
          </button>
        </form>
      </div>
    </div>
  );
};
export default PersonalTraining;