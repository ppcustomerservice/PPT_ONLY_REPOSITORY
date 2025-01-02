'use client';

import React, { useState } from "react";
import Form from "../../../../components/Form";

interface SemiHeaderProps {
  title: string;
  location: string;
  price: string;
}

const SemiHeader: React.FC<SemiHeaderProps> = ({ title, location, price }) => {
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
          width: "84%",
          margin: "0 7%",
          padding: "30px 40px",
          borderBottom: "1px solid #e0e0e0",
          fontFamily: "'Arial', sans-serif",
          color: "#333",
          backgroundColor: "#fff",
        }}
      >
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
            color: "#555",
            marginBottom: "20px",
          }}
        >
          {location}
        </p>

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
                fontSize: "14px",
                color: "#777",
                marginBottom: "5px",
              }}
            ></p>
            <p
              style={{
                fontSize: "28px",
                fontWeight: "700",
                color: "#104b97",
                margin: "0",
              }}
            >
              Starting at INR {price}
            </p>
          </div>

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
