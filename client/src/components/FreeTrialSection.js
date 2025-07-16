// src/components/FreeTrialSection.js
import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../styles/FreeTrialPage.css";

const FreeTrialSection = () => {
  const { t } = useTranslation();

  return (
    <section className="free-trial-container" id="free-trial">
      <h1 className="title">{t("freeTrial.title")}</h1>
      <div className="plans-grid">
        {/* 12 Months Plan */}
        <div className="plan-card best-deal">
          <div className="plan-header">
            <h2>{t("freeTrial.option12")}</h2>
            <div className="badge-group">
              <span className="badge">{t("freeTrial.bestDeal")}</span>
              <div className="sub-badge">{t("freeTrial.saveAmount")}</div>
            </div>
          </div>
          <div className="price">
            14.99<span>/month*</span>
          </div>
          <ul className="features">
            <li>✔ {t("freeTrial.features.12months.access")}</li>
            <li>✔ {t("freeTrial.features.tv")}</li>
            <li>✔ {t("freeTrial.features.courses")}</li>
            <li>✔ {t("freeTrial.features.library")}</li>
          </ul>
          <p className="note">{t("freeTrial.annualNote")}</p>
          <Link to="/purchase/12months" className="btn-trial">
            {t("freeTrial.cta")}
          </Link>
        </div>

        {/* Monthly Plan */}
        <div className="plan-card">
          <div className="plan-header">
            <h2>{t("freeTrial.optionMonthly")}</h2>
            <span className="badge gray">{t("freeTrial.noDiscount")}</span>
          </div>
          <div className="price">
            29.99<span>/month</span>
          </div>
          <ul className="features">
            <li>✔ {t("freeTrial.features.monthly.access")}</li>
            <li>✔ {t("freeTrial.features.tv")}</li>
            <li>✔ {t("freeTrial.features.courses")}</li>
            <li>✔ {t("freeTrial.features.library")}</li>
          </ul>
          <p className="note">{t("freeTrial.monthlyNote")}</p>
          <Link to="/purchase/monthly" className="btn-trial">
            {t("freeTrial.cta")}
          </Link>
        </div>

        {/* Lifetime Plan */}
        <div className="plan-card">
          <div className="plan-header">
            <h2>{t("freeTrial.optionLifetime")}</h2>
            <span className="badge gray">{t("freeTrial.lifetimeAccess")}</span>
          </div>
          <div className="price">
            599<span> {t("freeTrial.oneTime")}</span>
          </div>
          <ul className="features">
            <li>✔ {t("freeTrial.features.lifetime.access")}</li>
            <li>✔ {t("freeTrial.features.tv")}</li>
            <li>✔ {t("freeTrial.features.courses")}</li>
            <li>✔ {t("freeTrial.features.library")}</li>
          </ul>
          <p className="note">{t("freeTrial.lifetimeNote")}</p>
          <Link to="/purchase/lifetime" className="btn-trial">
            {t("freeTrial.cta")}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FreeTrialSection;
