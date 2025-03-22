// src/components/GymMedia.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GymMedia = () => {
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);

  // Fetch images and videos from backend server
  useEffect(() => {
    const getMedia = async () => {
      try {
        // Fetch images
        const imagesResponse = await axios.get(`${process.env.REACT_APP_BASE_SERVER_URL}/api/images`);
        setImages(imagesResponse.data);

        // Fetch videos
        const videosResponse = await axios.get(`${process.env.REACT_APP_BASE_SERVER_URL}/api/videos`);
        setVideos(videosResponse.data);
      } catch (error) {
        console.error('Error fetching media:', error);
      }
    };

    getMedia();
  }, []);

  return (
    <div>
      <h1>Gym Images</h1>
      <div className="images">
        {images.length > 0 ? (
          images.map((image) => (
            <div key={image.id} className="image-item">
              <img src={image.src?.medium} alt={image.alt} />
              <p>{image.photographer}</p>
              <a href={image.url} target="_blank" rel="noopener noreferrer">
                View on Pexels
              </a>
            </div>
          ))
        ) : (
          <p>No images found</p>
        )}
      </div>

      <h1>Gym Videos</h1>
      <div className="videos">
        {videos.length > 0 ? (
          videos.map((video) => (
            <div key={video.id} className="video-item">
              <video controls width="400">
                <source src={video.video_files?.[0]?.link} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          ))
        ) : (
          <p>No videos found</p>
        )}
      </div>
    </div>
  );
};

export default GymMedia;
