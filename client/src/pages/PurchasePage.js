import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../styles/PurchasePage.css";
import { FaCcVisa, FaCcMastercard, FaCcAmex } from "react-icons/fa";
import { registerUser } from "../services/registerService";
import { isValidName } from "../util/inputSanitizer";
const plans = {
  "12months": { key: "planAnnual" },
  monthly: { key: "planMonthly" },
  lifetime: { key: "planLifetime" },
};

const PurchasePage = () => {
  const { option } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    companyName: "",
    vatNumber: "",
    country: "",
    streetAddress: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const planKey = plans[option]?.key;

  if (!planKey) {
    return <p>{t("purchasePage.invalidPlan")}</p>;
  }

  const plan = t(`purchasePage.plans.${planKey}`, { returnObjects: true });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    // ✅ Basit doğrulama
    if (!isValidName(formData.firstName) || !isValidName(formData.lastName)) {
      setErrorMsg("Lütfen geçerli bir isim ve soyisim girin.");
      setLoading(false);
      return;
    }

    try {
      const response = await registerUser({
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        country: formData.country,
        streetAddress: formData.streetAddress,
        companyName: formData.companyName,
        vatNumber: formData.vatNumber,
        membershipType: option,
      });

      if (response.success) {
        navigate("/purchase-success");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setErrorMsg(
        error.message || "An unexpected error occurred during registration."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="purchase-container">
      <h1>{t("purchasePage.checkout")}</h1>

      <div className="purchase-content">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h2>{t("purchasePage.invoiceDetails")}</h2>
          <input
            type="text"
            name="firstName"
            placeholder={t("purchasePage.firstName")}
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder={t("purchasePage.lastName")}
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder={t("purchasePage.emailAddress")}
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="companyName"
            placeholder={t("purchasePage.companyName")}
            value={formData.companyName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="vatNumber"
            placeholder={t("purchasePage.vatNumber")}
            value={formData.vatNumber}
            onChange={handleChange}
          />
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          >
            <option value="">{t("purchasePage.selectCountry")}</option>
            <option value="nl">
              {t("purchasePage.countries.netherlands")}
            </option>
            <option value="be">{t("purchasePage.countries.belgium")}</option>
            <option value="de">{t("purchasePage.countries.germany")}</option>
          </select>
          <input
            type="text"
            name="streetAddress"
            placeholder={t("purchasePage.streetAddress")}
            value={formData.streetAddress}
            onChange={handleChange}
            required
          />

          <button type="submit" className="checkout-button" disabled={loading}>
            {loading
              ? t("purchasePage.loading")
              : t("purchasePage.startFreeTrial")}
          </button>

          {successMsg && <p className="success">{successMsg}</p>}
          {errorMsg && <p className="error">{errorMsg}</p>}
        </form>

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
                    <strong>{t("purchasePage.recurring")}:</strong>{" "}
                    {plan.recurring} <br />
                    <strong>{t("purchasePage.firstRenewal")}:</strong>{" "}
                    {plan.renewal}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>

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

          <p className="privacy">
            {t("purchasePage.termsIntro")}{" "}
            <a href="/terms">{t("purchasePage.terms")}</a>{" "}
            {t("purchasePage.and")}{" "}
            <a href="/privacy">{t("purchasePage.privacy")}</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PurchasePage;
