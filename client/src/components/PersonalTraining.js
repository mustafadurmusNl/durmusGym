import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchImages } from "../services/mediaService"; // Import fetchImages function
import "../styles/PersonalTraining.css"; // Create and use a CSS file for styling

const PersonalTraining = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    const getImages = async () => {
      const data = await fetchImages();
      setImages(data);
      setIsLoading(false); // Set loading to false once images are fetched
    };

    getImages();
  }, []);

  return (
    <div className="personal-training-container">
      {/* First Section */}
      <div className="hero-section">
        <div className="text-content">
          <h1>Personal Training</h1>
          <p>At your own pace to your goals!</p>
          <p>
            At DurmusGym in Bergen op Zoom, your health and comfort come first.
            Our personal guidance helps you achieve your fitness goals in a calm
            manner, without pressure. We adapt the training to your wishes and
            pace.
          </p>
          <p>
            DurmusGym guides a wide range of clients, from children to seniors
            who want to improve their strength, fitness or mobility. Whether you
            want to lose weight, get stronger or improve your fitness, we are
            here to support you in becoming the best version of yourself.
          </p>
          <Link to="/free-trial">
            <button className="cta-button">Free Trial Lesson</button>
          </Link>
        </div>
        <div className="image-content">
          {isLoading ? (
            <p>Loading image...</p> // Show a loading indicator while images are being fetched
          ) : (
            images.length > 0 && (
              <img
                src={images[8]?.src?.large} // Display the first image
                alt="Personal Training"
                className="hero-image"
              />
            )
          )}
        </div>
      </div>

      {/* Second Section */}
      <div className="details-section">
        <h2>Try it for free</h2>
        <p>
          Do you want to work effectively and personally on your fitness goals?
          At KoepelGym in Bergen op Zoom we offer tailor-made personal training
          programs that are fully aligned with your pace and needs.
        </p>
        <p>
          Thanks to our professional guidance and modern tools such as an iPad
          and Apple Watch, we closely monitor your progress and ensure
          measurable results.
        </p>
        <p>
          Start a free trial lesson today and discover how we can help you
          become fitter, stronger and healthier.
        </p>

        {/* Form Section */}
        <form className="trial-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" placeholder="Your Name" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your Email Address"
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Your Phone Number"
            />
          </div>
          <div className="form-group">
            <label htmlFor="comments">Comments</label>
            <textarea
              id="comments"
              name="comments"
              rows="4"
              placeholder="Availability, questions about the working method, etc."
            ></textarea>
          </div>
          <button type="submit" className="send-button">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default PersonalTraining;
