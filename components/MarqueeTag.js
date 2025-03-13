import React from 'react';
import './MarqueeTag.css';

const ScrollingText = () => {
  return (
    <div className="scrolling-container">
      <div className="scrolling-text-wrapper">
        <div className="scrolling-text">
          {/* TEXT DUPLICATION ENSURES CONTINUOUS SCROLL */}
          {[...Array(3)].map((_, index) => (
            <React.Fragment key={index}>
              <span className="highlight">EXPLAINED</span>
              <a href="#explained1" className="text-item">What Is Right To Be Forgotten? Supreme Court To Settle Law</a>

              <span className="highlight">BREAKING NEWS</span>
              <a href="#breaking1" className="text-item">Global Markets Rally Amidst Economic Uncertainty</a>

              <span className="highlight">UPDATE</span>
              <a href="#update1" className="text-item">New Technology Promises to Revolutionize Industry Standards</a>

              <span className="highlight">SPORTS</span>
              <a href="#sports1" className="text-item">Local Team Wins Championship After Intense Final Match</a>

              <span className="highlight">WEATHER</span>
              <a href="#weather1" className="text-item">Storm Warnings Issued for Coastal Regions</a>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScrollingText;
