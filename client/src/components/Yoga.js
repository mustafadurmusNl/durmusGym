import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Import i18n translation hook
import { fetchImages } from "../services/mediaService";


const Yoga = () => {
  const { t } = useTranslation(); // Use i18n translation
  const [image, setImage] = useState(null);
  const [isImageLoading, setIsImageLoading] = useState(true);

  useEffect(() => {
    const getImage = async () => {
      try {
        const images = await fetchImages();
        if (images.length > 0) {
          setImage(images[11]?.src?.large); // Change index if needed
        }
      } catch (error) {
        console.error("Error fetching image:", error);
      } finally {
        setIsImageLoading(false);
      }
    };

    getImage();
  }, []);

  return (
    <div className="yoga-container">
      <div className="hero-section">
        <div className="image-content">
          {isImageLoading ? (
            <p>{t("loadingImage")}</p>
          ) : (
            image && <img src={image} alt="Yoga session" className="hero-image" />
          )}
        </div>
        <div className="text-content">
          <h1>{t("yogaPage.title")}</h1>
          <h2>{t("yogaPage.subtitle")}</h2>
          <p>{t("yogaPage.description")}</p>
          <p>{t("yogaPage.description2")}</p>
          <p>{t("yogaPage.description3")}</p>
          <Link to="/free-trial">
            <button className="cta-button">{t("yogaPage.freeTrialText")}</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Yoga;
