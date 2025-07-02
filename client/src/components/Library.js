// src/pages/Library.js
import React, { useEffect, useState } from "react";
import { fetchImages } from "../services/mediaService";

const Library = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadImages = async () => {
      const data = await fetchImages("all", 10); // Example: fetch all categories with limit
      setImages(data);
      setLoading(false);
    };

    loadImages();
  }, []);

  if (loading) return <div>Loading media...</div>;

  return (
    <div className="library-page">
      <h2>Media Library</h2>
      <div className="media-grid">
        {images.length > 0 ? (
          images.map((img, index) => (
            <div key={index} className="media-item">
              <img src={img.url} alt={img.title || `media-${index}`} />
              <p>{img.title}</p>
            </div>
          ))
        ) : (
          <p>No media found.</p>
        )}
      </div>
    </div>
  );
};

export default Library;
