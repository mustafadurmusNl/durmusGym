import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchImages } from "../services/mediaService"; // Import fetchImages function
import "../styles/Pilates.css"; // Import CSS file for styling

const Pilates = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getImages = async () => {
      const data = await fetchImages();
      setImages(data);
      setIsLoading(false); // Set loading to false once images are fetched
    };

    getImages();
  }, []);

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div> // Show a loading indicator while images are being fetched
      ) : (
        <>
          {/* Page 1 */}
          <div className="pilates-container">
            <div className="hero-section">
              <div className="image-content">
                <img
                  src={images[2]?.src?.large} // Use the fetched image here
                  alt="Pilates at KoepelGym"
                  className="hero-image"
                />
              </div>
              <div className="text-content">
                <h1>Pilates at KoepelGym in Bergen op Zoom</h1>
                <p>Strengthen your balance and improve your flexibility</p>
                <p>
                  At KoepelGym we offer Pilates classes that help you strengthen
                  your balance, improve your flexibility, and promote your muscle
                  strength. Whether you are a beginner or already experienced, our
                  Pilates classes are tailored to meet your level and needs.
                </p>
                <p>
                  Our experienced, certified Pilates instructor carefully prepares
                  each lesson so that you can benefit optimally from the training.
                  Choose a private lesson for personal guidance or follow Pilates
                  in a small, intimate group of maximum 3 people. You can put
                  together your own group with friends, family, or acquaintances.
                </p>
                <p>
                  Private Pilates lessons at KoepelGym in Bergen op Zoom are
                  available from €49.99 per 4 weeks. Start today and experience
                  the benefits of Pilates!
                </p>
                <Link to="/free-trial">
                  <button className="cta-button">Free Trial Lesson</button>
                </Link>
              </div>
            </div>
          </div>

          {/* Page 2 (Second Section) */}
          <div className="details-section">
            <h2>Try it for free!</h2>
            <p>
              Pilates is the perfect way to build strength without heavy weights,
              improve your posture, and reduce stress. Our experienced Pilates
              instructor will ensure that you get the most out of every session,
              with exercises that make your body stronger and more flexible. Want
              to experience what Pilates can do for you? Sign up for a free trial
              lesson and discover the benefits of Pilates at KoepelGym in Bergen
              op Zoom.
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
        </>
      )}
    </div>
  );
};

export default Pilates;
