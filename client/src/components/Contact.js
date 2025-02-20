import React from "react";
import useTranslation from "../hooks/useTranslation"; // Import translation hook
import "../styles/Contact.css"; // Optional: for styling

const Contact = () => {
  const { translations, isLoading } = useTranslation("contactPage"); // Fetch translations for this page

  if (isLoading) {
    return <div>Loading translations...</div>;
  }

  if (!translations) {
    return <div>No translations available for this page.</div>;
  }

  return (
    <div className="about-container">
      {/* Left Section */}
      <div className="about-left">
        <h2>{translations.title || "Schedule your free trial lesson"}</h2>
        <p>{translations.subtitle || "After completing the form below, we will contact you."}</p>
        <form className="about-form">
          <div className="form-group">
            <label htmlFor="name">{translations.name || "Name"}</label>
            <input
              type="text"
              id="name"
              placeholder={translations.placeholderName || "Enter your name"}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">{translations.email || "Email Address"}</label>
            <input
              type="email"
              id="email"
              placeholder={translations.placeholderEmail || "Enter your email"}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">{translations.phone || "Phone Number"}</label>
            <input
              type="tel"
              id="phone"
              placeholder={translations.placeholderPhone || "Enter your phone number"}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">{translations.message || "Message"}</label>
            <textarea
              id="message"
              rows="4"
              placeholder={translations.placeholderMessage || "Enter your message"}
            ></textarea>
          </div>
          <button type="submit" className="send-button">
            {translations.sendButton || "Send"}
          </button>
        </form>
      </div>

      {/* Right Section */}
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
        <div className="about-contact-row">
          <div className="whatsapp-section">
            <p>{translations.whatsappText || "WhatsApp with us"}</p>
            <button className="whatsapp-button">
              <i className="fab fa-whatsapp"></i> {translations.whatsappButton || "Chat on WhatsApp"}
            </button>
          </div>
          <div className="contact-info">
            <p>{translations.contactButton || "Contact with us"}</p>
            <p>{translations.emailContact || "info@durmusgym.nl"}</p>
            <p>{translations.phoneContact || "+31633000111"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
