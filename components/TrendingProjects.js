"use client"; 
/* eslint-disable @next/next/no-img-element */

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import "./TrendingProjects.css";

const TrendingVideos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const sliderRef = useRef(null);

  const apiUrl = "https://timesbackend.onrender.com/public/posts";

  useEffect(() => {
    setIsClient(true);
    const fetchTrendingNews = async () => {
      try {
        const response = await fetch(apiUrl, { method: "GET" });
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        const trendingNews = data.filter((article) =>
          Array.isArray(article.categories) &&
          article.categories.some(
            (category) => category.trim().toLowerCase() === "trendingnews"
          )
        );
        if (trendingNews.length > 0) {
          setVideos([...trendingNews, ...trendingNews]); // Circular scrolling
        }
      } catch (error) {
        console.error("Error fetching trending news:", error);
      }
    };

    fetchTrendingNews();
  }, []);

  const formatTitleForURL = (title) =>
    title ? title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "") : "";

  const handleNavigation = (id, title, category) => {
    setLoading(true);
    router.push(
      `/newsshorts/${formatTitleForURL(category)}/${formatTitleForURL(title)}/${id}`
    );
  };

  const handleMouseEnter = () => {
    if (sliderRef.current) sliderRef.current.style.animationPlayState = "paused";
  };

  const handleMouseLeave = () => {
    if (sliderRef.current) sliderRef.current.style.animationPlayState = "running";
  };

  return (
    <div className="trending-videos">
      <h1 className="trending-title">TRENDING NEWS</h1>
      {loading && <div className="loading-overlay">Loading...</div>}
      <div className="videos-container">
        <div
          className="video-slider slower-scroll" 
          ref={sliderRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {videos.length > 0 ? (
            videos.map((video, index) => (
              <div
                className="video-card"
                key={`${video._id}-${index}`}
                onClick={() => handleNavigation(video._id, video.title, "TrendingNews")}
              >
                <img
                  className="video-image"
                  src={
                    video.picture.startsWith("http")
                      ? video.picture
                      : `${apiUrl}/${video.picture}`
                  }
                  alt={video.title}
                />
                <div className="video-info">{video.title}</div>
              </div>
            ))
          ) : (
            <p className="no-videos-message">Loading trending news...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrendingVideos;
