'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import router for navigation
import Navbar from '../../../components/Navbar';
import styles from './CategoryPage.module.css';

export default function CategoryPage({ params }) {
  const router = useRouter();
  const category = params.category.toLowerCase();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoryArticles = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/public/posts `, {
          next: { revalidate: 10 },
        });

        if (!res.ok) {
          throw new Error('API request failed');
        }

        const data = await res.json();
console.log("fjdfjdkfdkf")
console.log(data)
        const filteredArticles = data.filter((article) =>
          article.categories.some((cat) => cat.toLowerCase() === category)
        );

        setArticles(filteredArticles);
      } catch (error) {
        console.error('Error fetching category articles:', error);
        setError('Failed to load articles. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryArticles();
  }, [category]);

  if (loading) {
    return <div style={{width:"100vw",height:"100vh",display:"flex",justifyContent:"center",alignItems:"center"}}>

      <img src="/loading.gif" alt="loading" style={{height:"12vh"}} />
    </div>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!articles || articles.length === 0) {
    return <p>No articles available for this category.</p>;
  }

  const featuredArticle = articles[0];
  const firstTwoRows = articles.slice(1, 5); // Next four articles for two rows
  const remainingArticles = articles.slice(5); // Remaining articles

  // Helper function to format titles for URLs
  const formatTitleForURL = (title) => {
    return title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');
  };

  // Helper function to strip HTML tags from text
  const stripHTML = (html) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  };

  // Navigation handler
  const handleNavigation = (id, title, category) => {
    const formattedTitle = formatTitleForURL(title);
    const formattedCategory = formatTitleForURL(category);
    router.push(`/newsshorts/${formattedCategory}/${formattedTitle}/${id}`);
  };

  const truncateText = (text, wordLimit) => {
    const words = text.split(' ');
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(' ') + '...'
      : text;
  };

  return (
    <>
      <Navbar />
      
      <div className={styles.pageLayout}>
        <h1 className={styles.categoryTitle}>{category.toUpperCase()}</h1>

        {/* Featured Article */}
        <div
          className={styles.featuredArticle}
          onClick={() => handleNavigation(featuredArticle._id, featuredArticle.title, category)}
          style={{ cursor: 'pointer' }}
        >
          <img
            src={featuredArticle.picture}
            alt={featuredArticle.title}
            className={styles.featuredImage}
          />
          <div className={styles.featuredContent}>
            <h2>{featuredArticle.title}</h2>
            <p>{truncateText(stripHTML(featuredArticle.description), 20)}</p>
          </div>
        </div>

        {/* Two Rows of Articles */}
        <div className={styles.twoRows}>
          {firstTwoRows.map((article, index) => (
            <div
              key={index}
              className={styles.twoRowArticleCard}
              onClick={() => handleNavigation(article._id, article.title, category)}
              style={{ cursor: 'pointer' }}
            >
              <img
                src={article.picture}
                alt={article.title}
                className={styles.twoRowImage}
              />
              <div className={styles.twoRowDetails}>
                <h3>{truncateText(article.title, 10)}</h3>
                <p>{truncateText(stripHTML(article.description), 15)}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Compact List of Remaining Articles */}
        <div className={styles.remainingArticles}>
          {remainingArticles.map((article, index) => (
            <div
              key={index}
              className={styles.remainingArticleCard}
              onClick={() => handleNavigation(article._id, article.title, category)}
              style={{ cursor: 'pointer' }}
            >
              <div className={styles.remainingArticleContent}>
                <h3>{truncateText(article.title, 10)}</h3>
                <p>{truncateText(stripHTML(article.description), 15)}</p>
              </div>
              <img
                src={article.picture}
                alt={article.title}
                className={styles.remainingArticleImage}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
