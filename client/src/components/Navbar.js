import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css"; // Add a CSS file for styling

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">
          <img src="/logo.png" alt="DurmusGym Logo" className="navbar-logo" />
        </Link>
        <Link to="/" className="brand-name">
          DurmusGym
        </Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/personal-training">Personal Training</Link>
        </li>
        <li>
          <Link to="/pilates">Pilates</Link>
        </li>
        <li>
          <Link to="/diet">Diet</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/method">Method</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li>
          <Link to="/free-trial" className="cta">
            Free Trial Lesson
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
