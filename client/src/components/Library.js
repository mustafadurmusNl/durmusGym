// src/components/Library.js
import React, { useEffect, useState } from "react";
import { fetchVideos } from "../services/mediaService";

import { CATEGORIES } from "../constants/categories";
import "../styles/Library.css";

const CATEGORY_LABELS = {
  [CATEGORIES.PERSONAL]: "Body Building",
  [CATEGORIES.YOGA]: "Flexibility & Yoga",
  [CATEGORIES.DIET]: "Nutrition & Diet",
};

const DISPLAY_CATEGORIES = [
  CATEGORIES.PERSONAL,
  CATEGORIES.YOGA,
  CATEGORIES.DIET,
];

const Library = () => {
  const [categoryVideos, setCategoryVideos] = useState({});

  useEffect(() => {
    const loadVideos = async () => {
      const results = {};
      for (const category of DISPLAY_CATEGORIES) {
        const res = await fetchVideos(1, 4, category);
        results[category] = res.videos || [];
      }
      setCategoryVideos(results);
    };
    loadVideos();
  }, []);

  return (
    <div className="library-page">
      <h1 className="library-title">Explore Our Training Library</h1>

      {DISPLAY_CATEGORIES.map((category) => (
        <div key={category} className="library-section">
          <h2 className="library-category-title">
            {CATEGORY_LABELS[category]}
          </h2>
          <div className="video-grid">
            {categoryVideos[category]?.map((video) => (
              <div key={video._id} className="video-card">
                <div className="video-wrapper">
                  <video controls>
                    <source src={video.url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <p className="video-title">{video.title}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Library;
