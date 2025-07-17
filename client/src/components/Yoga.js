import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { fetchImages } from "../services/mediaService";
import { CATEGORIES } from "../constants/categories";

const Yoga = () => {
  const { t } = useTranslation(); // Using default "translation" namespace
  const [yogaImage, setYogaImage] = useState(null);
  const [isImageLoading, setIsImageLoading] = useState(true);

  useEffect(() => {
    const getYogaImage = async () => {
      try {
        const [image] = await fetchImages(CATEGORIES.YOGA);
        setYogaImage(image);
      } catch (error) {
        console.error("Error fetching yoga image:", error);
      } finally {
        setIsImageLoading(false);
      }
    };

    getYogaImage();
  }, []);

  return (
    <div className="yoga-container">
      <div className="hero-section">
        <div className="image-content">
          {isImageLoading ? (
            <p>{t("loadingImage")}</p>
          ) : (
            yogaImage && (
              <img
                src={yogaImage?.src?.original}
                alt={yogaImage?.alt || "Yoga at DurmusGym"}
                className="hero-image"
              />
            )
          )}
        </div>
        <div className="text-content">
          <h1>{t("yogaPage.title")}</h1>
          <h2>{t("yogaPage.subtitle")}</h2>
          <p>{t("yogaPage.description")}</p>
          <p>{t("yogaPage.description2")}</p>
          <p>{t("yogaPage.description3")}</p>
          <Link to="/free-trial-page" className="cta-button">
            {t("yogaPage.freeTrialText", {
              defaultValue: "Free Trial Lesson",
            })}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Yoga;
