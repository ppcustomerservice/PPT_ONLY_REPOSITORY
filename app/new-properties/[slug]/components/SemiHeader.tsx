// SemiHeader.tsx
'use client';

import React, { useState } from "react";
import Form from "../../../../components/Form";
import styles from "./SemiHeader.module.css"; // Import the CSS module

interface SemiHeaderProps {
  title: string;
  location: string;
  price: string;
  possessionDate: string; // New prop for possession date
}

const SemiHeader: React.FC<SemiHeaderProps> = ({ title, location, price, possessionDate }) => {
  const [showForm, setShowForm] = useState(false);

  // Function to show the form
  const handleShowForm = () => {
    setShowForm(true);
  };

  // Function to close the form
  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <>
      <div className={styles.container}>
        {/* Mobile Responsive Layout */}
        <div className={styles.mobileLayout}>
          <h1 className={styles.title}>{title}</h1>
          <div className={styles.priceAndButtonContainer}>
            <p className={styles.price}>INR {price}</p>
            <button className={styles.contactButton} onClick={handleShowForm}>
              Contact Seller
            </button>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className={styles.desktopLayout}>
          <div className={styles.leftSection}>
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.location}>{location}</p>
            <p className={styles.possessionDate}>Possession Date: {possessionDate}</p>
          </div>

          <div className={styles.rightSection}>
            <p className={styles.price}>INR {price}</p>
            <button className={styles.contactButton} onClick={handleShowForm}>
              Contact Seller
            </button>
          </div>
        </div>
      </div>

      {showForm && <Form delay={0} onClose={handleCloseForm} />}
    </>
  );
};

export default SemiHeader;