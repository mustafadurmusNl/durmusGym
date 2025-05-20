// src/pages/LoginPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../styles/LoginPage.css";

const LoginPage = () => {
  const { t } = useTranslation();

  return (
    <div className="login-container">
      <div className="login-form-wrapper">
        <h1 className="login-title">{t("login.welcome")}</h1>
        <p className="login-subtitle">
          {t("login.newHere")}{" "}
          <Link to="/free-trial-page" className="free-trial-link">
            {t("login.freeTrialLink")}
          </Link>
        </p>

        <form className="login-form">
          <label>{t("login.email")}</label>
          <input type="email" placeholder="you@example.com" required />

          <label>{t("login.password")}</label>
          <input type="password" placeholder="••••••••" required />

          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" />
              {t("login.remember")}
            </label>
            <Link to="/forgot-password" className="forgot-link">
              {t("login.forgot")}
            </Link>
          </div>

          <button type="submit" className="login-button">
            {t("login.signin")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
