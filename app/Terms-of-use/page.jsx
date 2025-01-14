"use client";

import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function TermsOfUse() {
  return (
    <div style={styles.pageContainer}>
      <Navbar />
      <div style={styles.container}>
        <div style={styles.box}>
          <h1 style={styles.title}>Terms of Use for Property Plateau Times</h1>
          <p style={styles.text}>
            Welcome to Property Plateau Times ("we," "our," or "us"), a digital newspaper platform providing real estate news, insights, and updates. By accessing or using our website or services ("Services"), you agree to comply with these Terms of Use ("Terms"). Please read them carefully.
          </p>

          <h2 style={styles.subheading}>1. Acceptance of Terms</h2>
          <p style={styles.text}>
            By accessing or using our Services, you agree to be bound by these Terms, along with our Privacy Policy. If you do not agree to these Terms, you must not use our Services.
          </p>

          <h2 style={styles.subheading}>2. Eligibility</h2>
          <p style={styles.text}>
            You must be at least 18 years old to use our Services. By using our platform, you confirm that you meet this requirement.
          </p>

          <h2 style={styles.subheading}>3. Use of Services</h2>
          <p style={styles.text}>
            You agree to use the Services only for lawful purposes and in compliance with these Terms. You will not:
          </p>
          <ul style={styles.list}>
            <li>Use the platform for any fraudulent or unauthorized purpose.</li>
            <li>Distribute, modify, or reproduce content without proper authorization.</li>
            <li>Engage in activities that could harm the platform or its users.</li>
          </ul>

          <h2 style={styles.subheading}>4. Intellectual Property Rights</h2>
          <p style={styles.text}>
            All content on Property Plateau Times, including articles, graphics, logos, and software, is protected by intellectual property laws. You may not copy, distribute, or use any content without prior written consent.
          </p>

          <h2 style={styles.subheading}>5. User Contributions</h2>
          <p style={styles.text}>
            By submitting any content, including comments, articles, or feedback, you:
          </p>
          <ul style={styles.list}>
            <li>Grant us a non-exclusive, royalty-free, perpetual license to use, display, and distribute your content.</li>
            <li>Confirm that you own or have the necessary rights to the content.</li>
          </ul>
          <p style={styles.text}>
            We reserve the right to remove or edit user contributions at our discretion.
          </p>

          <h2 style={styles.subheading}>6. Third-Party Links and Content</h2>
          <p style={styles.text}>
            Our platform may include links to third-party websites or content. We are not responsible for the accuracy, availability, or practices of these third parties.
          </p>

          <h2 style={styles.subheading}>7. Disclaimer of Warranties</h2>
          <p style={styles.text}>
            The Services are provided "as is" and "as available." We make no warranties, expressed or implied, regarding the accuracy, reliability, or availability of the platform.
          </p>

          <h2 style={styles.subheading}>8. Limitation of Liability</h2>
          <p style={styles.text}>
            To the fullest extent permitted by law, Property Plateau Times and its affiliates will not be liable for any indirect, incidental, or consequential damages arising from your use of the Services.
          </p>

          <h2 style={styles.subheading}>9. Indemnification</h2>
          <p style={styles.text}>
            You agree to indemnify and hold harmless Property Plateau Times, its employees, and affiliates from any claims, damages, or expenses arising from your use of the Services or violation of these Terms.
          </p>

          <h2 style={styles.subheading}>10. Termination</h2>
          <p style={styles.text}>
            We reserve the right to suspend or terminate your access to the Services at our discretion, without prior notice, for any reason, including a breach of these Terms.
          </p>

          <h2 style={styles.subheading}>11. Changes to Terms</h2>
          <p style={styles.text}>
            We may update these Terms from time to time. Any changes will be effective immediately upon posting on our platform. Your continued use of the Services constitutes your acceptance of the updated Terms.
          </p>

          <h2 style={styles.subheading}>12. Governing Law</h2>
          <p style={styles.text}>
            These Terms are governed by the laws of [Insert Jurisdiction], without regard to its conflict of laws principles.
          </p>

          <h2 style={styles.subheading}>13. Contact Us</h2>
          <p style={styles.text}>
            If you have any questions about these Terms, please contact us at:
          </p>
          <p style={styles.text}>Email: contacts@propertyplateautimes.com</p>
          <p style={styles.text}>Phone: +91 91560 91640</p>

          <p style={styles.text}>
            By using Property Plateau Times, you acknowledge that you have read, understood, and agree to these Terms of Use.
          </p>
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
  subheading: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#000000",
    marginTop: "20px",
    marginBottom: "10px",
  },
  text: {
    fontSize: "16px",
    color: "#000000",
    lineHeight: "1.8",
    marginBottom: "15px",
  },
  list: {
    paddingLeft: "25px",
    marginBottom: "15px",
    color: "#000000",
  },
};
