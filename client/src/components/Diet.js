import React, { useEffect, useState } from "react";
import { fetchImages } from "../services/mediaService";
import "../styles/Diet.css";

const Diet = () => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    const loadImage = async () => {
      const images = await fetchImages();
      if (images && images.length > 0) {
        setImage(images[0].src.large); 
      }
    };
    loadImage();
  }, []);

  return (
    <div className="diet-container">
      {/* Image Section */}
      <div className="diet-image">
        {image ? (
          <img src={image} alt="Healthy Diet" />
        ) : (
          <p>Loading image...</p>
        )}
      </div>

      {/* Content Section */}
      <div className="diet-content">
        <h1>Personalized Diet Plans</h1>
        <p>
          Fuel your body with balanced nutrition, intermittent fasting, and
          proper sleep to complement your workouts. Achieve your fitness goals
          with our tailored diet plans.
        </p>

        <div className="diet-form">
          <h2>Get Your Personalized Diet Plan</h2>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input type="tel" id="phone" name="phone" required />
            </div>
            <button type="submit" className="send-button">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Diet;
