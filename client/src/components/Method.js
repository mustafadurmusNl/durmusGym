import React, { useEffect, useState } from "react";
import useTranslation from "../hooks/useTranslation"; 
import { fetchImages } from "../services/mediaService"; 
import { CATEGORIES } from "../constants/categories"; // ✅ Use constants
import "../styles/Method.css"; 

const Method = () => {
  const { translations, isLoading } = useTranslation("methodPage");
  const [images, setImages] = useState([]);
  const [isImagesLoading, setIsImagesLoading] = useState(true); 

  useEffect(() => {
    const loadImages = async () => {
      try {
        const fetchedImages = await Promise.all(
          [
            CATEGORIES.ASSESSMENT,
            CATEGORIES.CUSTOM_PLAN,
            CATEGORIES.TRAINING,
            CATEGORIES.PROGRESS_TRACKING
          ].map(async (category) => {
            const image = await fetchImages(category, 1); 
            return image?.[0]?.src?.large;
          })
        );
        setImages(fetchedImages); 
      } catch (error) {
        console.error("Error fetching method images:", error);
      } finally {
        setIsImagesLoading(false);
      }
    };

    loadImages(); 
  }, []);

  if (isLoading) return <div>Loading translations...</div>;
  if (!translations || !translations.steps) return <div>No translations available for this page.</div>;

  return (
    <div className="method-container">
      <h1 className="method-title">{translations.title || "Our Working Method"}</h1>
      <div className="method-steps">
        {translations.steps.map((step, index) => (
          <div key={index} className="method-step">
            <h2>{step.stepTitle || `Step ${index + 1}`}</h2>
            {isImagesLoading ? (
              <p>Loading image...</p>
            ) : (
              images[index] && (
                <img src={images[index]} alt={step.stepTitle} className="step-image" />
              )
            )}
            <p>{step.stepDescription || "Description not available"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Method;
