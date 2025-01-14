"use client"; // Ensure this is a Client Component

import React, { useState } from "react";

const FloorPlan: React.FC<{
  plans: Array<{
    title: string;
    image: string;
    size: string | null;
    rooms: string | null;
    baths: string | null;
    price: string | null;
  }>;
}> = ({ plans }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!plans || plans.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h2>No Floor Plans Available</h2>
      </div>
    );
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 2 >= plans.length ? 0 : prevIndex + 2
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 2 < 0 ? plans.length - 2 : prevIndex - 2
    );
  };

  const visiblePlans = plans.slice(currentIndex, currentIndex + 2);

  return (
    <div
      style={{
        padding: "20px 40px",
        maxWidth: "90%",
        margin: "0 auto",
        backgroundColor: "#f9f9f9",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: "24px",
          marginBottom: "20px",
          color: "#333",
        }}
      >
        Floor Plans
      </h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          position: "relative",
        }}
      >
        {plans.length > 2 && (
          <button
            onClick={handlePrev}
            style={{
              position: "absolute",
              left: "-40px",
              backgroundColor: "#fff",
              border: "2px solid #ddd",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
              cursor: "pointer",
              transition: "transform 0.2s",
            }}
          >
            <span
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                color: "#333",
                transform: "rotate(180deg)", // Left arrow
              }}
            >
              ➔
            </span>
          </button>
        )}
        <div
          style={{
            display: "flex",
            flexWrap: "nowrap",
            gap: "20px",
            overflow: "hidden",
            width: "100%",
            justifyContent: "center",
          }}
        >
          {visiblePlans.map((plan, index) => (
            <div
              key={index}
              style={{
                flex: "0 0 calc(50% - 20px)", // Two items visible at a time
                maxWidth: "calc(50% - 20px)",
                border: "1px solid #ddd",
                borderRadius: "10px",
                backgroundColor: "#fff",
                padding: "15px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                textAlign: "center",
                boxSizing: "border-box",
              }}
            >
              <img
                src={plan.image}
                alt={plan.title}
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  marginBottom: "10px",
                  objectFit: "cover",
                }}
              />
              <h3
                style={{
                  fontSize: "18px",
                  color: "#444",
                  marginBottom: "10px",
                }}
              >
                {plan.title}
              </h3>
              {plan.size && (
                <p
                  style={{
                    fontSize: "14px",
                    color: "#666",
                    margin: "5px 0",
                  }}
                >
                  Size: {plan.size} sq. ft.
                </p>
              )}
              {plan.rooms && (
                <p
                  style={{
                    fontSize: "14px",
                    color: "#666",
                    margin: "5px 0",
                  }}
                >
                  Rooms: {plan.rooms}
                </p>
              )}
              {plan.baths && (
                <p
                  style={{
                    fontSize: "14px",
                    color: "#666",
                    margin: "5px 0",
                  }}
                >
                  Baths: {plan.baths}
                </p>
              )}
              {plan.price && (
                <p
                  style={{
                    fontSize: "14px",
                    color: "#666",
                    margin: "5px 0",
                  }}
                >
                  Price: {plan.price}
                </p>
              )}
            </div>
          ))}
        </div>
        {plans.length > 2 && (
          <button
            onClick={handleNext}
            style={{
              position: "absolute",
              right: "-40px",
              backgroundColor: "#fff",
              border: "2px solid #ddd",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
              cursor: "pointer",
              transition: "transform 0.2s",
            }}
          >
            <span
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                color: "#333",
              }}
            >
              ➔
            </span>
          </button>
        )}
      </div>
      {plans.length > 2 && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button
            style={{
              backgroundColor: "#28a745",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
            }}
            onClick={() => alert("Call +919156091640 for more details!")}
          >
            Get a Call Back
          </button>
        </div>
      )}
    </div>
  );
};

export default FloorPlan;
