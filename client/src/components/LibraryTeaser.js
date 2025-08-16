import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchVideos } from "../services/mediaService";
import { useTranslation } from "react-i18next";
import "../styles/LibraryTeaser.css";

const LibraryTeaser = ({ category = "intro" }) => {
  const { t } = useTranslation();
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
      <h2>{t("libraryTeaser.title")}</h2>

      {randomVideo && (
        <div className="library-teaser-video">
          <video width="100%" controls>
            <source src={randomVideo.url} type="video/mp4" />
            {t("libraryTeaser.noSupport")}
          </video>
          <p className="library-teaser-title">{randomVideo.title}</p>
        </div>
      )}

      <p className="library-teaser-message">{t("libraryTeaser.message")}</p>
    </div>
  );
};

export default LibraryTeaser;
