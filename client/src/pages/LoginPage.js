import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useLogin from "../hooks/useLogin";
import "../styles/LoginPage.css";

const LoginPage = () => {
  const { t } = useTranslation();
  const { login, loading, error } = useLogin();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result) {
      if (result.user.isTempPassword) {
        navigate("/change-password"); // Force password update
      } else {
        navigate("/"); // Normal redirect
      }
    }
  };

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

        <form className="login-form" onSubmit={handleSubmit}>
          <label>{t("login.email")}</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>{t("login.password")}</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" />
              {t("login.remember")}
            </label>
            <Link to="/forgot-password" className="forgot-link">
              {t("login.forgot")}
            </Link>
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? t("login.signingIn") : t("login.signin")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
