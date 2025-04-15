import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { fetchImages } from "../services/mediaService";


const Yoga = () => {
  const { t } = useTranslation();
  const [yogaImage, setYogaImage] = useState(null);
  const [isImageLoading, setIsImageLoading] = useState(true);

  useEffect(() => {
    const getYogaImage = async () => {
      try {
        const [image] = await fetchImages("yoga");
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
                src={yogaImage?.src?.large}
                alt={yogaImage?.alt || "Yoga at KoepelGym"}
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
          <Link to="/free-trial">
            <button className="cta-button">
              {t("yogaPage.freeTrialText")}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Yoga;
