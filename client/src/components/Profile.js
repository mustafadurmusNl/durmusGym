// src/components/Profile.js
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "../context/languageContext";
import "../styles/Profile.css";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const { translations } = useContext(LanguageContext);
  const { t } = useTranslation();

  // Use your fallback translate function same as Navbar
  const translate = (key) => translations[key] || t(key);

  if (!user) {
    return (
      <div className="profile-container guest">
        <h2>{translate("profile.guestWelcome")}</h2>
        <p
          dangerouslySetInnerHTML={{
            __html: translate("profile.guestPrompt")
              .replace(
                "<login>",
                `<a href="/login" style="color: blue; text-decoration: underline;">`
              )
              .replace("</login>", "</a>")
              .replace(
                "<trial>",
                `<a href="/free-trial-page" style="color: blue; text-decoration: underline;">`
              )
              .replace("</trial>", "</a>"),
          }}
        />
      </div>
    );
  }

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    // TODO: Handle file upload to backend
    console.log("Photo selected:", file);
  };

  return (
    <div className="profile-container">
      <h2>
        {translate("profile.welcomeBack")},{" "}
        {user?.firstName || user?.name?.split(" ")[0] || user?.email || "User"}!
      </h2>

      <div className="profile-section">
        <label>{translate("profile.firstName")}</label>
        <p>{user.firstName}</p>
      </div>

      <div className="profile-section">
        <label>{translate("profile.lastName")}</label>
        <p>{user.lastName}</p>
      </div>

      <div className="profile-section">
        <label>{translate("profile.email")}</label>
        <p>{user.email}</p>
      </div>

      <div className="profile-section membership-section">
        <label>{translate("profile.membership")}</label>
        <div className="membership-info">
          <p>{user.membershipType || translate("profile.free")}</p>
          <button
            className="upgrade-btn"
            disabled={user.membershipType?.toLowerCase() === "lifetime"}
          >
            {translate("profile.upgradeMembership")}
          </button>
        </div>
      </div>

      <div className="profile-actions">
        <label className="upload-label">
          {translate("profile.uploadPhoto")}
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            hidden
          />
        </label>
      </div>
    </div>
  );
};

export default Profile;
