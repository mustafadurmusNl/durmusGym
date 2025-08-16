// client/src/components/SecureVideoPlayer.js
import React, { useEffect, useRef, useState } from "react";

const API_BASE =
  process.env.REACT_APP_BASE_SERVER_URL || "http://localhost:5000";

const SecureVideoPlayer = ({ videoId, token, autoPlay = true }) => {
  const [objectUrl, setObjectUrl] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | loading | ready | error
  const [errorMsg, setErrorMsg] = useState("");
  const abortRef = useRef(null);
  console.log("helloooo", token, videoId);
  useEffect(() => {
    if (!videoId || !token) return;

    setStatus("loading");
    setErrorMsg("");
    // Temizle
    if (abortRef.current) abortRef.current.abort();
    if (objectUrl) {
      URL.revokeObjectURL(objectUrl);
      setObjectUrl(null);
    }

    const controller = new AbortController();
    abortRef.current = controller;

    const run = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/videos/${videoId}/stream`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error(`Video fetch failed (status ${res.status})`);
        }

        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        setObjectUrl(url);
        setStatus("ready");
      } catch (err) {
        if (err.name === "AbortError") return;
        console.error("Error fetching video:", err);
        setErrorMsg(err.message || "Unknown error");
        setStatus("error");
      }
    };

    run();

    return () => {
      controller.abort();
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId, token]);
  if (status === "loading") {
    return (
      <div
        style={{
          width: "min(100%, 960px)",
          aspectRatio: "16 / 9",
          display: "grid",
          placeItems: "center",
          borderRadius: "20px",
          background: "rgba(255,255,255,0.05)",
        }}
      >
        <span>Loading video…</span>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div
        style={{
          width: "min(100%, 960px)",
          padding: "16px",
          borderRadius: "16px",
          background: "rgba(255,0,0,0.08)",
          color: "#ffb3b3",
        }}
      >
        <strong>Video yüklenemedi.</strong>
        <div style={{ marginTop: 6, opacity: 0.8, fontSize: 14 }}>
          {errorMsg}
        </div>
      </div>
    );
  }

  if (!objectUrl) return null;

  return (
    <video
      className="secure-player"
      controls
      playsInline
      autoPlay={autoPlay}
      style={{
        width: "min(100%, 960px)",
        borderRadius: "20px",
        background: "#000",
        outline: "none",
      }}
      src={objectUrl}
    />
  );
};

export default SecureVideoPlayer;
