// src/components/PurchaseSuccess.js
import React from "react";
import { useTranslation } from "react-i18next";
import "../styles/PurchaseSuccess.css"; // Optional: style it with confetti, colors, etc.
import { Link } from "react-router-dom";

const PurchaseSuccess = () => {
  const { t } = useTranslation();

  return (
    <div className="purchase-success-container">
      <div className="confetti" />
      <div className="success-card">
        <h1>{t("purchaseSuccess.congratulations")}</h1>
        <p>{t("purchaseSuccess.welcomeMessage")}</p>
        <p>{t("purchaseSuccess.checkEmail")}</p>
        <div className="success-actions">
          <Link to="/login" className="success-actions-link">
            {t("purchaseSuccess.loginNow")}
          </Link>
          <p>{t("purchaseSuccess.resetInfo")}</p>
        </div>
      </div>
    </div>
  );
};

export default PurchaseSuccess;
