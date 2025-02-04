import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/About.css"; // Optional: for styling

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="about-container">
      {/* Left Section - Text */}
      <div className="about-left">
        <h2>About Durmus</h2>
        <p>
          Welcome to <strong>DurmusGym</strong>, where I help you achieve strength, health, 
          and balance through personalized training and mindful nutrition.  
        </p>
        <p>
          My approach combines <strong>plate training</strong>, 
          <strong> fasting techniques</strong> with water, tea, and coffee, 
          and a focus on natural, whole foods. I also teach how to prepare 
          <strong> healthy homemade sweets</strong>—because fitness should be enjoyable!
        </p>
        <p>
          Whether you're building muscle, improving endurance, or looking for 
          sustainable diet habits, I'm here to guide you every step of the way.
        </p>
        <button className="contact-button" onClick={() => navigate("/contact")}>
          Contact Me
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
