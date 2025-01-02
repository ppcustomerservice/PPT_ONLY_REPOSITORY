"use client";

import React, { useState } from "react";
import Form from "./../../../components/Form";

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
      <div
        style={{
          width: "80%", // Set width to 80%
          margin: "30px 8%", // Shift the box slightly to the left
          padding: "30px 40px", // Adjusted padding for a less overwhelming design
          border: "1px solid #e0e0e0",
          fontFamily: "'Arial', sans-serif",
          color: "#333",
          backgroundColor: "#fff",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Reduced shadow intensity
          borderRadius: "12px", // Slightly reduced border radius for subtler effect
        }}
      >
        {/* Title */}
        <h1
          style={{
            fontSize: "24px", // Updated font size
            fontWeight: 600, // Updated font weight
            lineHeight: "36px", // Updated line height
            marginBottom: "8px", // Updated margin
            color: "#222",
          }}
        >
          {title}
        </h1>

        {/* Location */}
        <p
          style={{
            fontSize: "14px", // Updated font size for location
            fontWeight: 400, // Updated font weight for location
            lineHeight: "21px", // Updated line height for location
            color: "#212529", // Updated color for location
            marginBottom: "8px", // Updated margin for location
          }}
        >
          {location}
        </p>

        {/* Possession Date */}
        <div
          style={{
            display: "inline-block",
            padding: "6px 12px",
            backgroundColor: "#f8f9fa",
            border: "1px solid #e0e0e0",
            borderRadius: "6px",
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: "21px",
            color: "#212529",
            marginBottom: "16px",
          }}
        >
          Possession: {possessionDate}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "24px", // Reduced font size for price
                fontWeight: 700,
                color: "#104b97",
                margin: "0",
              }}
            >
              Starting at INR {price}
            </p>
          </div>

          {/* Contact Seller Button */}
          <button
            onClick={handleShowForm}
            style={{
              backgroundColor: "#104b97",
              color: "#fff",
              padding: "12px 20px", // Reduced padding for button
              fontSize: "16px", // Slightly smaller font size for button
              fontWeight: 600,
              borderRadius: "8px", // Slightly smaller radius for button
              border: "none",
              cursor: "pointer",
              boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.15)", // Reduced shadow intensity
              transition: "background-color 0.3s ease",
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#083f7d")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#104b97")}
          >
            Contact Seller
          </button>
        </div>
      </div>

      {showForm && <Form delay={0} onClose={handleCloseForm} />}
    </>
  );
};

export default SemiHeader;
