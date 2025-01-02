import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './NewsShorts.css';

const apiUrl = process.env.REACT_APP_API_URL;

const NewsShorts = () => {
  const { title } = useParams(); // Get the title from the URL
  const [article, setArticle] = useState(null);

  useEffect(() => {
    // Fetch the article data from the backend using the title
    fetch(`${apiUrl}/public/posts/title/${title}`)
      .then(response => response.json())
      .then(data => {
        setArticle(data);
      })
      .catch(error => console.error('Error fetching article:', error));
  }, [title]);

  // Helper function to get the first 30-50 words as an introduction
  const getFirst50Words = (text) => {
    return text.split(' ').slice(0, 50).join(' ') + '...';
  };

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div className="news-article-container">
      {/* Title */}
      <h1 className="news-title">{article.title}</h1>

      {/* Introduction */}
      {/* <p className="news-introduction">{getFirst50Words(article.description)}</p> */}

      {/* Thin grey divider */}
      <hr className="news-divider" />

      {/* Image with rounded borders */}
      <img className="news-image" src={article.picture} alt={article.title} />

      {/* Full description */}
      <p className="news-full-description">{article.description}</p>
    </div>
  );
};

export default NewsShorts;
