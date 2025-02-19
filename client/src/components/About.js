import React from "react";
import { useNavigate } from "react-router-dom";
import useTranslation from "../hooks/useTranslation"; // Custom translation hook
import "../styles/About.css"; // Optional: for styling

const About = () => {
  const navigate = useNavigate();
  const { translations, isLoading } = useTranslation("aboutPage"); // Fetch translations for About page

  // Show loading state while translations are being fetched
  if (isLoading) {
    return <div>Loading translations...</div>;
  }

  // Show fallback if no translations are found
  if (!translations) {
    return <div>No translations available for About page.</div>;
  }

  return (
    <div className="about-container">
      {/* Left Section - Text */}
      <div className="about-left">
        <h2>{translations.title || "About Durmus"}</h2>
        <p>{translations.welcomeMessage || "Welcome to DurmusGym, where I help you achieve strength, health, and balance through personalized training and mindful nutrition."}</p>
        <p>{translations.approach || "My approach combines individual training programs with a holistic lifestyle."}</p>
        <p>{translations.trainingMethods || "I use plate-based training techniques and fasting methods with water, tea, and coffee."}</p>
        <p>{translations.nutritionFocus || "I emphasize natural and healthy food for a balanced lifestyle."}</p>
        <p>{translations.homemadeSweets || "I also teach you how to prepare healthy homemade sweets—because fitness should be enjoyable!"}</p>
        <p>{translations.fitnessGoalSupport || "Whether you're building muscle, improving endurance, or looking for sustainable diet habits, I'm here to guide you every step of the way."}</p>

        <button className="contact-button" onClick={() => navigate("/contact")}>
          {translations.contactButton || "Contact Me"}
        </button>
      </div>

      {/* Right Section - Image */}
      <div className="about-right">
        <img src="/mustafa.png" alt="Durmus - Personal Trainer" className="about-image" />
      </div>
    </div>
  );
};

export default About;
