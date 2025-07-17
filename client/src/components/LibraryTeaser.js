import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchVideos } from "../services/mediaService";
import "../styles/LibraryTeaser.css";

const LibraryTeaser = ({ category = "intro" }) => {
  const fixedTitle = "Online Training";
  const [randomVideo, setRandomVideo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadSample = async () => {
      const data = await fetchVideos(1, 20, category);
      const all = data.videos || [];
      if (all.length > 0) {
        const random = all[Math.floor(Math.random() * all.length)];
        setRandomVideo(random);
      } else {
        setRandomVideo(null);
      }
    };
    loadSample();
  }, [category]);

  const handleClick = () => {
    navigate("/library");
  };

  return (
    <div className="library-teaser-container" onClick={handleClick}>
      <h2>{fixedTitle}</h2>

      {randomVideo && (
        <div className="library-teaser-video">
          <video width="100%" controls>
            <source src={randomVideo.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <p className="library-teaser-title">{randomVideo.title}</p>
        </div>
      )}

      <p className="library-teaser-message">
        (
        <>
          Unlock your potential with our expert online training programs!
          Whether you're starting out or aiming higher, our flexible workouts
          fit your busy life. Train anywhere, anytime, and watch your strength
          and confidence grow. Start your transformation today!
        </>
        )
      </p>
    </div>
  );
};

export default LibraryTeaser;
