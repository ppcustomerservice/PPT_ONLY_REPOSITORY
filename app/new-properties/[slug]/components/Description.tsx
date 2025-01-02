"use client";

import React, { useState } from "react";
import styles from "./Description.module.css";
import Form from "../../../../components/Form";

interface DescriptionProps {
  content: string; // Pass the description as a prop
}

const Description: React.FC<DescriptionProps> = ({ content }) => {
  const [isOpen, setIsOpen] = useState(false); // For description modal
  const [formVisible, setFormVisible] = useState(false); // For form popup

  const openSlider = () => setIsOpen(true);
  const closeSlider = () => setIsOpen(false);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains(styles.slider)) {
      closeSlider();
    }
  };

  // Safely extract the first 30 words for preview
  const previewText = content
    .replace(/<[^>]+>/g, "") // Strip HTML tags for the preview
    .split(" ")
    .slice(0, 60)
    .join(" ") + "...";

  const openForm = () => {
    closeSlider();
    setFormVisible(true);
  };

  const closeForm = () => setFormVisible(false);

  return (
    <>
      <div className={styles.descriptionContainer}>
        <div className={styles.preview}>
          <h3 className={styles.previewHeader}>About the Property</h3>
          <p className={styles.previewText}>{previewText}</p>
          <button className={styles.readMoreButton} onClick={openSlider}>
            Read More
          </button>
        </div>

        {isOpen && (
          <div className={styles.slider} onClick={handleOverlayClick}>
            <div className={styles.sliderContent}>
              <button className={styles.closeButton} onClick={closeSlider}>
                ×
              </button>
              <h2 className={styles.title}>Project Details</h2>
              <div className={styles.fullDescription}>
                <div className={styles.tableContainer}>
                  <div dangerouslySetInnerHTML={{ __html: content }} />
                </div>
              </div>
              <button className={styles.ctaButton} onClick={openForm}>
                I'm Interested in This Project
              </button>
            </div>
          </div>
        )}
      </div>

      {formVisible && <Form delay={0} closeForm={closeForm} />}
    </>
  );
};

export default Description;
