import React from "react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content footer-centered">
        {/* Location */}
        <div className="footer-section">
          <h3>Location</h3>
          <p>Moregrebstraat 56</p>
          <p>Bergen op Zoom, 4622JD</p>
        </div>

        {/* Socials */}
        <div className="footer-section">
          <h3>Socials</h3>
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
          <h3>Contact</h3>
          <p>info@durmusgym.nl</p>
          <p>+31 6 33820475</p>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-copyright">
        &copy; 2025 DurmusGym - Chamber of Commerce Number: 1111111
      </div>
    </footer>
  );
};

export default Footer;
