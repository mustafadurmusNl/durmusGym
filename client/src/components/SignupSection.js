import React, { useState } from "react";
import "../styles/SignupSection.css";
import { postData } from "../services/api";
import { clearMessageAfterDelay } from "../util/helpers";

const SignupSection = ({ translations }) => {
  const BASE_URL = process.env.REACT_APP_BASE_SERVER_URL;
  const WHATSAPP_NUMBER = process.env.REACT_APP_WHATSAPP_NUMBER;

  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const emailRegex = /\S+@\S+\.\S+/;
    const phoneRegex = /^\+?\d{7,15}$/;
  
    if (!emailRegex.test(formData.email)) {
      setResponseMessage("Invalid email format.");
      return clearMessageAfterDelay(setResponseMessage);
    }
  
    if (!phoneRegex.test(formData.phone)) {
      setResponseMessage("Invalid phone number.");
      return clearMessageAfterDelay(setResponseMessage);
    }
  
    try {
      const { success, data } = await postData(`${BASE_URL}/api/messages/signup`, formData);
  
      if (success) {
        setResponseMessage(data.message);
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setResponseMessage(data.error || "Something went wrong.");
      }
    } catch (error) {
      console.error("API error:", error);
      setResponseMessage("Server error. Please try again later.");
    }
  
    clearMessageAfterDelay(setResponseMessage);
  };
  

  const handleWhatsAppClick = () => {
    const whatsappNumber = WHATSAPP_NUMBER || "31633820475";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      translations?.whatsappMessage || "Hello, I am interested!"
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="signup-section" style={{ display: "flex", height: "100vh" }}>
      <div style={{ flex: 1, padding: "20px" }}>
        <h2>{translations?.title || "Take the first step today."}</h2>
        <p>{translations?.description1 || "Looking for a personal trainer..."}</p>
        <p>{translations?.description2 || "Whether you want to get stronger..."}</p>
      </div>
      <div style={{ flex: 1, padding: "20px" }}>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder={translations?.namePlaceholder || "Your Name"} value={formData.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder={translations?.emailPlaceholder || "Your Email"} value={formData.email} onChange={handleChange} required />
          <input type="tel" name="phone" placeholder={translations?.phonePlaceholder || "Your Phone Number"} value={formData.phone} onChange={handleChange} required />
          <textarea name="message" placeholder={translations?.messagePlaceholder || "Your Comments"} value={formData.message} onChange={handleChange} required />
          <button type="submit" className="btn btn-primary">{translations?.sendButton || "Send"}</button>
          <button type="button" className="btn btn-success" onClick={handleWhatsAppClick}>
            {translations?.whatsappButton || "Chat on WhatsApp"}
          </button>
        </form>
        {responseMessage && <p className="response-message">{responseMessage}</p>}
      </div>
    </div>
  );
};

export default SignupSection;
