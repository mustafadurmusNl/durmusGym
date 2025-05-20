// src/pages/PurchasePage.js
import React from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../styles/PurchasePage.css";
import { FaCcVisa, FaCcMastercard, FaCcAmex } from "react-icons/fa";
const plans = {
  "12months": {
    key: "planAnnual",
  },
  "monthly": {
    key: "planMonthly",
  },
  "lifetime": {
    key: "planLifetime",
  }
};

const PurchasePage = () => {
  const { option } = useParams();
  const { t } = useTranslation();

  const planKey = plans[option]?.key;
  if (!planKey) return <p>{t("purchasePage.invalidPlan")}</p>;

  const plan = t(`purchasePage.plans.${planKey}`, { returnObjects: true });

  return (
    <div className="purchase-container">
      <h1>{t("purchasePage.checkout")}</h1>

      <div className="purchase-content">
        {/* Left: Form */}
        <form className="checkout-form">
          <h2>{t("purchasePage.invoiceDetails")}</h2>
          <input type="text" placeholder={t("purchasePage.firstName")} required />
          <input type="text" placeholder={t("purchasePage.lastName")} required />
          <input type="email" placeholder={t("purchasePage.emailAddress")} required />
          <input type="text" placeholder={t("purchasePage.companyName")} />
          <input type="text" placeholder={t("purchasePage.vatNumber")} />
          <select required>
            <option value="">{t("purchasePage.selectCountry")}</option>
            <option value="nl">{t("purchasePage.countries.netherlands")}</option>
            <option value="be">{t("purchasePage.countries.belgium")}</option>
            <option value="de">{t("purchasePage.countries.germany")}</option>
          </select>
          <input type="text" placeholder={t("purchasePage.streetAddress")} required />
        </form>

        {/* Right: Order Summary */}
        <div className="order-summary">
          <h2>{t("purchasePage.yourOrder")}</h2>
          <table>
            <tbody>
              <tr>
                <td>{plan.name}</td>
                <td>€{plan.price.toFixed(2)}</td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <strong>{t("purchasePage.total")}</strong>: €0,01
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <p>
                    <strong>{t("purchasePage.recurring")}:</strong> {plan.recurring} <br />
                    <strong>{t("purchasePage.firstRenewal")}:</strong> {plan.renewal}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>

          {/* Payment method */}
          <div className="payment-methods">
            <label>
              <input type="radio" name="payment" defaultChecked /> iDEAL
            </label>
            <label>
              <input type="radio" name="payment" /> Creditcard
            </label>
            <div className="cards">
  <FaCcVisa size={36} title="Visa" />
  <FaCcMastercard size={36} title="Mastercard" />
  <FaCcAmex size={36} title="Amex" />
</div>
          </div>

          {/* Terms */}
          <p className="privacy">
            {t("purchasePage.termsIntro")}{" "}
            <a href="/terms">{t("purchasePage.terms")}</a> {t("purchasePage.and")}{" "}
            <a href="/privacy">{t("purchasePage.privacy")}</a>.
          </p>

          <button className="checkout-button">{t("purchasePage.startFreeTrial")}</button>
        </div>
      </div>
    </div>
  );
};

export default PurchasePage;
