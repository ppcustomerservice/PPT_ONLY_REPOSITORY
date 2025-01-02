import React from "react";
import propData from "../../[slug]/prop.json"

type LocationProps = {
  propertyId: number;
};

const Location: React.FC<LocationProps> = ({ propertyId }) => {
  // Find the property details by ID
  const property = propData.find((item) => item.ID === propertyId);

  if (!property || !property.property_latitude || !property.property_longitude) {
    return null;
  }

  const latitude = property.property_latitude;
  const longitude = property.property_longitude;

  // Google Maps Embed URL with Marker (Pin)
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyAy38hBgh8yUTxn6-n915um1UfJU9X9A4E&q=${latitude},${longitude}`;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Location</h2>
      <div style={styles.mapWrapper}>
        <iframe
          src={mapUrl}
          title="Property Location"
          style={styles.map}
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

// Inline styles for the component
const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 0",
    backgroundColor: "#f9f9f9", // Optional background color
  },
  heading: {
    fontSize: "28px",
    marginBottom: "20px",
    color: "#2c3e50",
    fontWeight: "bold",
  },
  mapWrapper: {
    width: "85%", // Occupy 90% of the width for a modern look
    maxWidth: "1400px", // Restrict the maximum width
    height: "calc(25vw + 20px)", // Dynamic height increased by 20px
    overflow: "hidden",
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    position: "relative" as const,
  },
  map: {
    width: "100%",
    height: "100%",
    border: 0,
    borderRadius: "12px", // Matches the wrapper border-radius
  },
};

export default Location;
