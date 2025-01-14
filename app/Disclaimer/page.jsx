"use client";

import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function Disclaimer() {
  return (
    <div style={styles.pageContainer}>
      <Navbar />
      <div style={styles.container}>
        <div style={styles.box}>
          <h1 style={styles.title}>Disclaimer for Property Plateau Times</h1>
          <p style={styles.text}>
            The content provided on Property Plateau Times is for informational purposes only. While every effort is made to ensure the accuracy and reliability of the information published, Property Plateau Times makes no warranties, express or implied, regarding the completeness, timeliness, or suitability of the content for any purpose.
          </p>
          <p style={styles.text}>
            Readers are advised to independently verify all information, including market data, property details, and legal or financial insights, before making any decisions or commitments. Opinions expressed by authors and contributors are their own and do not necessarily reflect the views of Property Plateau Times or its affiliates.
          </p>
          <p style={styles.text}>
            Property Plateau Times is not liable for any losses, damages, or consequences arising from the use or reliance on the content provided. Links to third-party websites are provided for convenience, and we do not endorse or assume responsibility for the content on those sites.
          </p>
          <p style={styles.text}>
            By accessing or using Property Plateau Times, you agree to these terms and acknowledge the importance of conducting your due diligence in all real estate matters.
          </p>
          <p style={styles.text}>
            For inquiries, corrections, or feedback, please contact our editorial team at:
          </p>
          <p style={styles.text}>Email: contact@propertyplateautimes.com</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

const styles = {
  pageContainer: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "20px",
    backgroundColor: "#f8f9fa",
    overflowY: "auto",
  },
  box: {
    backgroundColor: "#ffffff",
    border: "1px solid #104b97",
    borderRadius: "8px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    width: "80%",
    maxWidth: "800px",
  },
  title: {
    fontSize: "26px",
    fontWeight: "bold",
    color: "#104b97",
    marginBottom: "20px",
  },
  text: {
    fontSize: "16px",
    color: "#000000",
    lineHeight: "1.8",
    marginBottom: "15px",
  },
};
