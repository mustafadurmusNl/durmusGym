import React from "react";
import "../styles/SignupSection.css";

const SignupSection = ({ translations }) => {
  return (
    <div className="signup-section" style={{ display: "flex", height: "100vh" }}>
      <div style={{ flex: 1, padding: "20px" }}>
        <h2>{translations?.title || "Take the first step today."}</h2>
        <p>{translations?.description1 || "Looking for a personal trainer..."}</p>
        <p>{translations?.description2 || "Whether you want to get stronger..."}</p>
      </div>
      <div style={{ flex: 1, padding: "20px" }}>
        <form>
          <input type="text" placeholder={translations?.namePlaceholder || "Your Name"} />
          <input type="email" placeholder={translations?.emailPlaceholder || "Your Email"} />
          <input type="tel" placeholder={translations?.phonePlaceholder || "Your Phone Number"} />
          <textarea placeholder={translations?.messagePlaceholder || "Your Comments"}></textarea>
          <button type="submit" className="btn btn-primary">{translations?.sendButton || "Send"}</button>
          <button className="btn btn-success">{translations?.whatsappButton || "Chat on WhatsApp"}</button>
        </form>
      </div>
    </div>
  );
};

export default SignupSection;
