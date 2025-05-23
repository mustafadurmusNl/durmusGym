import React from "react";
import { Dumbbell, HeartPulse, CalendarCheck } from "lucide-react"; // if using lucide icons
import "../styles/HeroHighlights.css";

const HeroHighlights = () => {
  return (
    <div className="hero-highlights">
      <div className="highlight-item">
        <Dumbbell className="highlight-icon" />
        <h3>Tailored Training</h3>
        <p>
          Programs built around your body and your goals — no cookie-cutter
          plans.
        </p>
      </div>

      <div className="highlight-item">
        <HeartPulse className="highlight-icon" />
        <h3>Whole-Body Wellness</h3>
        <p>Balance strength, mobility, and mindset for real transformation.</p>
      </div>

      <div className="highlight-item">
        <CalendarCheck className="highlight-icon" />
        <h3>Train on Your Time</h3>
        <p>
          Flexible scheduling that fits your lifestyle, not the other way
          around.
        </p>
      </div>
    </div>
  );
};

export default HeroHighlights;
