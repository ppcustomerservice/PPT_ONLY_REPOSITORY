"use client";

import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { motion } from "framer-motion";
import "./RealEstateCards.css";

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
    <div className="real-estate-container">
      {/* Desktop Layout */}
      <div className="desktop-layout">
        <motion.div 
          className="card-container"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {cards.map((card, index) => (
            <motion.a
              key={index}
              href={card.link}
              target="_blank"
              rel="noopener noreferrer"
              className="card"
              whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <motion.img 
                src={card.imgSrc} 
                alt={card.title} 
                className="card-img"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.1 }}
              />
              <div className="card-content">
                <motion.h3 
                  whileHover={{ color: "#ff6600" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {card.title}
                </motion.h3>
                <p>{card.description}</p>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
</div>
   
  );
};
export default RealEstateCards;
