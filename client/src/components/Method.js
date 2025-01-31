import React, { useEffect, useState } from "react";
import { fetchImages } from "../services/mediaService";
import "../styles/Method.css"; 

const Method = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const loadImages = async () => {
      const fetchedImages = await fetchImages();
      if (fetchedImages && fetchedImages.length > 0) {
        setImages(fetchedImages.map(img => img.src.large));
      }
    };
    loadImages();
  }, []);

  const steps = [
    { title: "Step1 : Getting to know each other", description: "During this introductory meeting we will discuss your fitness goals, any limitations or injuries and your training history. We will get to know each other and tune in to your personal needs and wishes." },
    { title: "Step 2 : Trial lesson", description: "The trial lesson gives you the chance to try out our training methods under supervision. We adapt the training to your level and needs, so that you get a good idea of ​​what we have to offer." },
    { title: "Step 3 : Objectives", description: "After a trial lesson, we will discuss your experience and determine specific fitness goals. We will also include any limitations or special requirements in the personal plan." },
    { title: "Step 4 : Transform", description: "Based on your goals and personal situation, we create a personalized training schedule. During the training sessions, we work together to achieve your goals, with regular evaluations and adjustments if necessary." },
  ];

  return (
    <div className="method-container">
      <h1 className="method-title">Our Working Method</h1>
      <div className="method-steps">
        {steps.map((step, index) => (
          <div key={index} className="method-step">
            <h2>{step.title}</h2>
            {images[index] ? (
              <img src={images[index+6]} alt={step.title} />
            ) : (
              <p>Loading image...</p>
            )}
            <p>{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Method;
