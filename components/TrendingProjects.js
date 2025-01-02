"use client";  // Marks this component as a Client Component
/* eslint-disable @next/next/no-img-element */

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Use Next.js's router
import './TrendingProjects.css';

const TrendingVideos = () => {
  const [videos, setVideos] = useState([]);
  const router = useRouter(); // Use Next.js router

  // Hardcoded the API URL to use the correct endpoint
  // const apiUrl = "http://localhost:8000/public/posts";
  const apiUrl = "https://timesbackend.onrender.com/public/posts";


  useEffect(() => {
    const fetchTrendingNews = async () => {
      try {
        console.log('Attempting to fetch data from API...');
        
        // Making a GET request to the correct API endpoint
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        console.log('Response status:', response.status); // Log response status

        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Fetched data:', data); // Log entire data to verify

        if (Array.isArray(data) && data.length > 0) {
          console.log('Data is an array and has length:', data.length);

          // Filter to include only "TrendingNews" articles
          const trendingNews = data.filter((article) => {
            console.log(`Checking categories for article with _id: ${article._id}`);
            if (Array.isArray(article.categories)) {
              console.log(`Categories for _id ${article._id}:`, article.categories);
              return article.categories.some(category => category.trim().toLowerCase() === "trendingnews");
            } else {
              console.warn(`Article with _id ${article._id} does not have a valid categories array.`);
              return false;
            }
          });

          console.log('Filtered Trending News:', trendingNews); // Log the filtered results

          // Update state with filtered trending news
          setVideos(trendingNews);
        } else {
          console.warn('Fetched data is not an array or is empty.');
        }
      } catch (error) {
        console.error('Error fetching trending news:', error);
      }
    };

    fetchTrendingNews();
  }, []);

  const formatTitleForURL = (title) => {
    if (!title) {
      return ''; // Return an empty string or handle the error differently if title is missing
    }
    return title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');
  };

  const handleNavigation = (id, title, category) => {
    const formattedTitle = formatTitleForURL(title);
    const formattedCategory = formatTitleForURL(category);
    router.push(`/newsshorts/${formattedCategory}/${formattedTitle}/${id}`); // Pass the id in the URL
  };

  return (
    <div className="trending-videos">
      <h2 className="trending-title">TRENDING News</h2>
      <div className="videos-container">
        {videos.length > 0 ? (
          videos.map((video) => (
            <div
              className="video-card"
              key={video._id}
              onClick={() => handleNavigation(video._id, video.title, 'TrendingNews')} // Ensure id, title, and category are passed
              style={{ cursor: 'pointer' }}
            >
              <img
                className="video-image"
                src={
                  video.picture.startsWith('http')
                    ? video.picture
                    : `${apiUrl}/${video.picture}`
                }
                alt={video.title}
              />
              <div className="video-info">
                <p className="video-title">{video.title}</p>
                <div className="play-button"></div>
              </div>
            </div>
          ))
        ) : (
          <>
            <p className="no-videos-message">No trending news available at the moment.</p>
            <p className="debug-message">Check if articles with the category 'TrendingNews' exist in the data.</p>
          </>
        )}
      </div>
    </div>
  );
};

export default TrendingVideos;
