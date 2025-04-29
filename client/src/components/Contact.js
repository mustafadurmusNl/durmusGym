import React, { useState } from "react";
import useTranslation from "../hooks/useTranslation";
import "../styles/Contact.css";
import { clearMessageAfterDelay } from "../util/helpers";

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

    const emailRegex = /\S+@\S+\.\S+/;
    const phoneRegex = /^\+?\d{7,15}$/;

    if (!emailRegex.test(formData.email)) {
      setResponseMessage("Invalid email format.");
      clearMessageAfterDelay(setResponseMessage);
      return;
    }

    if (!phoneRegex.test(formData.phone)) {
      setResponseMessage("Invalid phone number.");
      clearMessageAfterDelay(setResponseMessage);
      return;
    }

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

    clearMessageAfterDelay(setResponseMessage);
  };

  return (
    <div className="about-container">
      {/* Left Section - Contact Form */}
      <div className="about-left">
        <h2>{translations.title || "Schedule your free trial lesson"}</h2>
        <p>
          {translations.subtitle ||
            "After completing the form below, we will contact you."}
        </p>

        <form className="about-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">{translations.name || "Name"}</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">
              {translations.email || "Email Address"}
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">
              {translations.phone || "Phone Number"}
            </label>
            <input
              type="tel"
              id="phone"
              pattern="^\+?\d{7,15}$"
              required
              title="Enter a valid phone number (e.g. +31612345678)"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">{translations.message || "Message"}</label>
            <textarea
              id="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button type="submit" className="send-button">
            {translations.sendButton || "Send"}
          </button>
        </form>

        {responseMessage && (
          <p className="response-message">{responseMessage}</p>
        )}
      </div>

      {/* Right Section - Google Map */}
      <div className="about-right">
        <div className="map-container">
          <iframe
            title="Durmus Gym Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2462.875185905202!2d4.277808476015456!3d51.4954162178691!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c44259ec2f43cf%3A0x3089d22cfa8d31e9!2sMeeroeversstraat%2056%2C%204611%20Bergen%20op%20Zoom%2C%20Netherlands!5e0!3m2!1sen!2snl!4v1614975463246!5m2!1sen!2snl"
            width="100%"
            height="500"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
