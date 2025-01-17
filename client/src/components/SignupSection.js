// src/components/SignupSection.js
import React from "react";
import "../styles/SignupSection.css";
const SignupSection = () => {
  return (
    <div className="signup-section" style={{ display: "flex", height: "100vh" }}>
      <div style={{ flex: 1, padding: "20px" }}>
        <h2>Take the first step today.</h2>
        <p>
          Looking for a personal trainer or Pilates instructors? In our private studio in Bergen op Zoom, our personal trainers and Pilates instructors are ready to guide you step by step to your goals.
        </p>
        <p>
          Whether you want to get stronger, lose weight, or improve your flexibility, we are happy to guide you on your journey to a healthier and fitter version of yourself.
        </p>
      </div>
      <div style={{ flex: 1, padding: "20px" }}>
        <form>
         
          <input type="text" placeholder="Your Name" />
          
          <input type="email" placeholder="Your Email" />
        
          <input type="tel" placeholder="Your Phone Number" />
      
          <textarea placeholder="Your Comments"></textarea>
          <button type="submit" className="btn btn-primary">Send</button>
          <button className="btn btn-success">Chat on WhatsApp</button>
        </form>
      </div>
    </div>
  );
};

export default SignupSection;
