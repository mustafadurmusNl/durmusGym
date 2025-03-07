import React, { useState } from "react";
import useTranslation from "../hooks/useTranslation";
import "../styles/Contact.css";

const Contact = () => {
  const { translations, isLoading } = useTranslation("contactPage");
  const BASE_URL = process.env.REACT_APP_BASE_SERVER_URL;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [responseMessage, setResponseMessage] = useState("");

  if (isLoading) {
    return <div>Loading translations...</div>;
  }

  if (!translations) {
    return <div>No translations available for this page.</div>;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`${BASE_URL}/api/messages/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setResponseMessage(data.message);
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setResponseMessage(data.error || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setResponseMessage("Server error. Please try again later.");
    }
  };

  return (
    <div className="about-container">
      <div className="about-left">
        <h2>{translations.title || "Schedule your free trial lesson"}</h2>
        <p>{translations.subtitle || "After completing the form below, we will contact you."}</p>

        <form className="about-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">{translations.name || "Name"}</label>
            <input type="text" id="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="email">{translations.email || "Email Address"}</label>
            <input type="email" id="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="phone">{translations.phone || "Phone Number"}</label>
            <input type="tel" id="phone" value={formData.phone} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="message">{translations.message || "Message"}</label>
            <textarea id="message" rows="4" value={formData.message} onChange={handleChange} required></textarea>
          </div>

          <button type="submit" className="send-button">
            {translations.sendButton || "Send"}
          </button>
        </form>

        {responseMessage && <p className="response-message">{responseMessage}</p>}
      </div>
    </div>
  );
};

export default Contact;
