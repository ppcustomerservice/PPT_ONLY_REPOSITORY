import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import './AdSlider.css';

const ads = [
  {
    id: 1,
    imageUrl: '/path/to/first-ad-image.png',
    title: 'Download the app for the best news-reading experience!',
    subtitle: 'NO subscription fee or sign-in',
    playStoreLink: 'https://play.google.com/store',
    appStoreLink: 'https://www.apple.com/app-store/',
  },
  {
    id: 2,
    imageUrl: '/path/to/second-ad-image.png',
    title: 'Your Real Estate Companion',
    subtitle: 'Stay updated with the latest market trends',
    playStoreLink: 'https://play.google.com/store',
    appStoreLink: 'https://www.apple.com/app-store/',
  },
  // Add more ads as needed
];

const AdSlider = () => {
  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAdIndex((prevIndex) => (prevIndex + 1) % ads.length);
    }, 5000); // Change ad every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const handleSwipe = (direction) => {
    if (direction === 'LEFT') {
      setCurrentAdIndex((prevIndex) => (prevIndex + 1) % ads.length);
    } else if (direction === 'RIGHT') {
      setCurrentAdIndex((prevIndex) => (prevIndex - 1 + ads.length) % ads.length);
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleSwipe('LEFT'),
    onSwipedRight: () => handleSwipe('RIGHT'),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div className="ad-slider" {...swipeHandlers}>
      <div className="ad-content" style={{ transform: `translateX(-${currentAdIndex * 100}%)` }}>
        {ads.map((ad, index) => (
          <div className="ad-item" key={index}>
            <div className="ad-text">
              <h2>{ad.title}</h2>
              <p>{ad.subtitle}</p>
              <div className="ad-links">
                <a href={ad.playStoreLink} className="store-link">
                  <img src="/path/to/google-play-badge.png" alt="Get it on Google Play" />
                </a>
                <a href={ad.appStoreLink} className="store-link">
                  <img src="/path/to/app-store-badge.png" alt="Download on the App Store" />
                </a>
              </div>
            </div>
            <div className="ad-image">
              <img src={ad.imageUrl} alt="Advertisement" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdSlider;
