import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { fetchVideos } from "../services/mediaService";
import { AuthContext } from "../context/AuthContext";
import SecureVideoPlayer from "./SecureVideoPlayer";
import { CATEGORIES } from "../constants/categories";
import { useTranslation } from "react-i18next";
import "../styles/Library.css";

const DISPLAY_CATEGORIES = [
  CATEGORIES.PERSONAL,
  CATEGORIES.YOGA,
  CATEGORIES.DIET,
];

const Library = () => {
  const { t } = useTranslation();
  const [categoryVideos, setCategoryVideos] = useState({});
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate(); // <- ekledik
  const CATEGORY_LABELS = {
    [CATEGORIES.PERSONAL]: t("library.categories.personal"),
    [CATEGORIES.YOGA]: t("library.categories.yoga"),
    [CATEGORIES.DIET]: t("library.categories.diet"),
  };

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
  const handleVideoClick = (id) => {
    if (!user) {
      // alert yerine window.confirm ile yönlendirme
      const goToLogin = window.confirm(
        `${t("library.loginRequired")} \n\nPress OK to login.`
      );
      if (goToLogin) {
        navigate("/login"); // <- login sayfasına yönlendiriyoruz
      }
      return;
    }
    setSelectedVideoId(id);
  };

  return (
    <div className="library-page">
      <h1 className="library-title">{t("library.title")}</h1>

      {DISPLAY_CATEGORIES.map((category) => (
        <div key={category} className="library-section">
          <h2 className="library-category-title">
            {CATEGORY_LABELS[category]}
          </h2>
          <div className="video-grid">
            {categoryVideos[category]?.map((video) => (
              <div
                key={video._id}
                className="video-card"
                onClick={() => handleVideoClick(video._id)}
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="video-thumbnail"
                />
                <p className="video-title">{video.title}</p>
              </div>
            ))}
          </div>
        </div>
      ))}

      {selectedVideoId && (
        <div className="video-modal">
          <SecureVideoPlayer videoId={selectedVideoId} token={token} />
          <button onClick={() => setSelectedVideoId(null)}>
            {t("library.closeButton")}
          </button>
        </div>
      )}
    </div>
  );
};

export default Library;
