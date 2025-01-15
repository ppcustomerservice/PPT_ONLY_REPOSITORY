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
          width: "80%",
          margin: "0 auto",
          padding: "20px 0",
          fontFamily: "'Arial', sans-serif",
          color: "#333",
          backgroundColor: "#fff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        {/* Left Section: Title, Location, Possession Date */}
        <div style={{ flex: 1, paddingRight: "20px" }}>
          <h1
            style={{
              fontSize: "32px",
              fontWeight: "700",
              marginBottom: "10px",
              color: "#222",
            }}
          >
            {title}
          </h1>

          <p
            style={{
              fontSize: "16px",
              color: "#000",
              marginBottom: "10px",
            }}
          >
            {location}
          </p>

          <p
            style={{
              fontSize: "14px",
              color: "#000",
              marginBottom: "0",
            }}
          >
            Possession Date: {possessionDate}
          </p>
        </div>

        {/* Right Section: Price and Button */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <p
            style={{
              fontSize: "28px",
              fontWeight: "700",
              color: "#104b97",
              margin: "0 0 15px 0",
            }}
          >
            INR {price}
          </p>
          <button
            onClick={handleShowForm}
            style={{
              backgroundColor: "#104b97",
              color: "#fff",
              padding: "12px 25px",
              fontSize: "16px",
              fontWeight: "600",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
            }}
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
