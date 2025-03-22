import React from "react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import "../styles/Footer.css";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer-container">
      <div className="footer-content footer-centered">
        {/* Location */}
        <div className="footer-section">
          <h3>{t("footer.location")}</h3>
          <p>{t("footer.addressLine1")}</p>
          <p>{t("footer.addressLine2")}</p>
        </div>

        {/* Socials */}
        <div className="footer-section">
          <h3>{t("footer.socials")}</h3>
          <div className="footer-icons">
            <a href="https://www.instagram.com/mdurmusnl1" className="social-icon instagram">
              <FaInstagram />
            </a>
            <a href="#" className="social-icon whatsapp">
              <FaWhatsapp />
            </a>
          </div>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h3>{t("footer.contact")}</h3>
          <p>{t("footer.email")}</p>
          <p>{t("footer.phone")}</p>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-copyright">
        &copy; 2025 {t("footer.gymName")} - {t("footer.chamberOfCommerce")}
      </div>
    </footer>
  );
};

export default Footer;
