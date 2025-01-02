"use client";

import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";
import "./RealEstateCards.css"; // Import the CSS file

const RealEstateCards = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const cards = [
    {
      title: "WhatsApp Channel",
      description: "Tune in to know the latest updates on the real estate industry.",
      imgSrc: "https://propertyplateaumedia.s3.ap-south-1.amazonaws.com/wp-content/uploads/2024/10/23170117/Whatsapp.png",
      link: "https://whatsapp.com/channel/0029ValQ5IkCcW4wYhAV0k13/", 
    },
    {
      title: "Linktree",
      description: "One-stop destination for all your real estate needs and services.",
      imgSrc: "https://propertyplateaumedia.s3.ap-south-1.amazonaws.com/wp-content/uploads/2024/10/23170326/Link-1.png",
      link: "#", 
    },
    {
      title: "Real Estate Podcast",
      description: "Gain insights and skills to make smart real estate decisions.",
      imgSrc: "https://propertyplateaumedia.s3.ap-south-1.amazonaws.com/wp-content/uploads/2024/10/23165610/podcast-1.png",
      link: "https://latitudeandlongitudegroup.com/", 
    },
  ];

  const handleSwipe = (direction) => {
    if (direction === "LEFT" && currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (direction === "RIGHT" && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe("LEFT"),
    onSwipedRight: () => handleSwipe("RIGHT"),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div style={{ backgroundColor: "#f9f9f9", padding: "20px" }}>
      {/* Desktop Layout */}
      <div className="desktop-layout">
        <div style={{ display: "flex", justifyContent: "space-between", gap: "10px", maxWidth: "1000px", margin: "0 auto" }}>
          {cards.map((card, index) => (
            <a
              key={index}
              href={card.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: "none",
                width: "320px",
                backgroundColor: "#fff",
                padding: "15px",
                borderRadius: "16px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                display: "flex",
                alignItems: "center",
              }}
            >
              <div style={{ marginRight: "10px", flexShrink: 0 }}>
                <img src={card.imgSrc} alt={`${card.title} Icon`} style={{ width: "80px", borderRadius: "8px" }} />
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ marginBottom: "10px", color: "#333", fontSize: "16px", fontWeight: "bold" }}>
                  {card.title}
                </h3>
                <p style={{ color: "#666", fontSize: "14px", lineHeight: "1.5" }}>
                  {card.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Mobile Swipeable Layout */}
      <div className="mobile-layout" {...handlers} style={{ overflow: "hidden", maxWidth: "100%", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: "transform 0.3s ease",
            width: `${cards.length * 100}%`,
          }}
        >
          {cards.map((card, index) => (
            <a
              key={index}
              href={card.link}
              target="_blank"
              rel="noopener noreferrer"
              className="card"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <img src={card.imgSrc} alt={`${card.title} Icon`} />
              <div className="card-content">
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RealEstateCards;
