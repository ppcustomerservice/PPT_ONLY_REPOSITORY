"use client";
import React, { useEffect, useState } from "react";
import styles from "./ImageGallery.module.css";

const ImageGallery = ({ propertyID }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          `https://www.propertyplateau.com/wp-json/wp/v2/media?parent=${propertyID}`
        );
        const mediaData = await response.json();
        const imageUrls = mediaData.map((media) => media.source_url);
        setImages(imageUrls);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [propertyID]);

  const openModal = (index) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  // const closeModal = () => setIsModalOpen(false);

  const showPreviousImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const showNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const closeModal = (e) => {
    e.stopPropagation(); // Prevent event propagation
    setIsModalOpen(false); // Close the modal
  };

  const handleKeyDown = (e) => {
    if (!isModalOpen) return;
    if (e.key === "ArrowLeft") {
      showPreviousImage();
    } else if (e.key === "ArrowRight") {
      showNextImage();
    } else if (e.key === "Escape") {
      closeModal();
    }
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (!touchStart) return;

    const touchEnd = e.touches[0].clientX;
    const diff = touchStart - touchEnd;

    if (diff > 50) {
      // Swipe left
      showNextImage();
    } else if (diff < -50) {
      // Swipe right
      showPreviousImage();
    }

    setTouchStart(null); // Reset touchStart
  };

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  if (loading) return <p>Loading images...</p>;
  if (images.length === 0) return <p>No images found for this property.</p>;

  const featuredImage = images[0];
  const rightImages = images.slice(1, 4);

  return (
    <div className={styles.galleryContainer}>
      <div className={styles.featuredImage}>
        <img
          src={featuredImage}
          alt="Featured Property"
          onClick={() => openModal(0)}
        />
      </div>

      <div className={styles.rightImages}>
        {rightImages.map((image, index) => (
          <div
            key={index}
            className={styles.squareImage}
            onClick={() => openModal(index + 1)}
          >
            <img src={image} alt={`Property Image ${index + 2}`} />
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div
          className={styles.modal}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          <span className={styles.closeButton} onClick={closeModal}>
            &times;
          </span>
          <div className={styles.modalContent}>
            <button
              className={styles.arrowButton}
              onClick={showPreviousImage}
            >
              &#8592;
            </button>
            <img
              className={styles.modalImage}
              src={images[currentImageIndex]}
              alt={`Property Image ${currentImageIndex + 1}`}
            />
            <button className={styles.arrowButton} onClick={showNextImage}>
              &#8594;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
