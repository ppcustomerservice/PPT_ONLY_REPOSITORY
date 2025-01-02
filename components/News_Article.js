"use client";  

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import './NewsArticle.css';

// const apiUrl = process.env.REACT_APP_API_URL;
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
// const apiUrl="http://13.201.152.70:8000"
console.log('API URL:', apiUrl);

const NewsArticle = () => {
  const [newsTitle, setNewsTitle] = useState('');
  const [newsDescription, setNewsDescription] = useState('');
  const [newsImage, setNewsImage] = useState('');
  const [newsItems, setNewsItems] = useState([]);
  const [popularNews, setPopularNews] = useState([]); 
  const [latestPost, setLatestPost] = useState(null); 

  const router = useRouter(); 

  useEffect(() => {
    fetch(`${apiUrl}/public/posts`)
    // fetch(`http://13.201.152.70:8000/public/posts`)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched data:', data); 
        if (data && data.length > 0) {
          const sortedData = data.sort((a, b) => {
            return parseInt(b._id.slice(0, 8), 16) - parseInt(a._id.slice(0, 8), 16);
          });

          const nonPopularAndNonTrendingNewsItems = sortedData.filter(post => {
            return !post.categories.includes('PopularNews') && !post.categories.includes('TrendingNews');
          });

          if (nonPopularAndNonTrendingNewsItems.length > 0) {
            const latestPost = nonPopularAndNonTrendingNewsItems[0];
            setNewsTitle(latestPost.title);

            const imageURL = latestPost.picture.startsWith('http')
              ? latestPost.picture
              : `${apiUrl}/${latestPost.picture}`;
            setNewsImage(imageURL);

            setLatestPost({
              id: latestPost._id,
              title: latestPost.title,
              category: latestPost.categories?.[0], 
              description: latestPost.description,
            });

            const items = nonPopularAndNonTrendingNewsItems.slice(1, 5).map(post => ({
              id: post._id,
              title: post.title,
              category: post.categories?.[0], // Use first category from array
              image: post.picture.startsWith('https')
                ? post.picture
                : `${apiUrl}/${post.picture}`,
            }));

            setNewsItems(items);
          }

          // Filter the popular news items
          const popularNewsItems = sortedData.filter(post => post.categories.includes('PopularNews'));
          setPopularNews(popularNewsItems);
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Function to get the first 50 words of a description
  const getFirst50Words = (text) => {
    return text.split(' ').slice(0, 50).join(' ') + '...';
  };

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
    <div className="container">
      {/* Latest Post in the First Column */}
      <div className="main-content">
        {latestPost && (
          <div 
            onClick={() => handleNavigation(latestPost?.id, latestPost?.title, latestPost?.category)}  // Ensure id is passed
            className="news-link" 
            style={{ cursor: 'pointer' }}>
            <h1 className="title">{newsTitle}</h1>
            <img className="main-image" src={newsImage} alt="Article" />
            <p className="description" dangerouslySetInnerHTML={{ __html: getFirst50Words(latestPost?.description || '') }}></p>
          </div>
        )}
      </div>

      <div className="divider-vertical"></div>

      {/* Sidebar for 2nd to 5th Articles */}
      <div className="sidebar">
        {newsItems.map((item, index) => (
          <div 
            key={index} 
            onClick={() => handleNavigation(item.id, item.title, item.category)}  // Ensure id is passed for sidebar items
            className="news-item-link" 
            style={{ cursor: 'pointer' }}>
            <div className="news-item">
              <span className="news-text">{item.title}</span>
              <img className="featured-image" src={item.image} alt={item.title} />
            </div>
          </div>
        ))}

        <div className="advertisement">
        </div>
      </div>

      <div className="divider-vertical"></div>

      <div className="latest-news">
        <h2 className="latest-news-heading">Most Popular News</h2>
        {popularNews.map((post, index) => (
          <div 
            key={index} 
            className="latest-item" 
            onClick={() => handleNavigation(post._id, post.title, 'PopularNews')}
            style={{ cursor: 'pointer' }}>
            {post.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsArticle;
