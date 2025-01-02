import React from "react";
import propData from "../[slug]/prop.json";

type YouTubeVideoProps = {
  propertyId: number;
};

const YouTubeVideo: React.FC<YouTubeVideoProps> = ({ propertyId }) => {
  // Find the property details by ID
  const property = propData.find((item) => item.ID === propertyId);

  // If no video is available, return null (do not render anything)
  if (!property || !property.embed_video_id) {
    return null;
  }

  const videoId = property.embed_video_id;

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h2 style={styles.heading}>Take a Virtual Tour</h2>
        <p style={styles.subheading}>
          Explore this property's unique features and imagine yourself in this stunning space.
        </p>
        <div style={styles.videoWrapper}>
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            style={styles.video}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

// Inline styling with matching `border-radius` for the frame and video
const styles = {
  container: {
    padding: "20px 0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  content: {
    width: "90%",
    maxWidth: "1000px",
    textAlign: "center" as const,
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    padding: "15px",
  },
  heading: {
    fontSize: "24px",
    marginBottom: "8px",
    color: "#2c3e50",
    fontWeight: "bold",
  },
  subheading: {
    fontSize: "14px",
    marginBottom: "15px",
    color: "#7f8c8d",
  },
  videoWrapper: {
    position: "relative" as const,
    paddingBottom: "50%", // Maintain aspect ratio
    height: 0,
    overflow: "hidden",
    borderRadius: "12px", // Matches the video `border-radius`
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    border: "6px solid #104b97", // Thicker border with custom color
  },
  video: {
    position: "absolute" as const,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    borderRadius: "1px", // Matches the wrapper `border-radius`
  },
};

export default YouTubeVideo;
