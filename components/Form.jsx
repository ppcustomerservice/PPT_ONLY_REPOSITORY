'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

const Form = ({ delay = 5000, onClose }) => { // Added onClose prop
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    otp: '',
    pageUrl: '', // Initialize pageUrl as an empty string
  });
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [error, setError] = useState('');
  const [formVisible, setFormVisible] = useState(false); // Control form visibility
  const [isLoading, setIsLoading] = useState(false); // Loading indicator for send and verify OTP

  // Set the page URL in formData once the component is mounted (client-side)
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      pageUrl: window.location.href, // Set the page URL here
    }));
  }, []);

  // Update form data based on user input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to send OTP using the backend API
  const sendOtp = async () => {
    if (!formData.phone) return setError('Please enter a valid phone number');
    setError('');
    setIsLoading(true);
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/send-otp`, { phone: formData.phone });
      if (response.data.success) {
        setOtpSent(true);
        setError('');
      } else {
        setError(response.data.message || 'Failed to send OTP. Please try again.');
      }
    } catch (err) {
      console.log('Error in sendOtp:', err.response);
      setError('Failed to send OTP. Please try again.');
    }
    setIsLoading(false);
  };

  // Function to verify OTP, including name, email, and page URL
  const verifyOtp = async () => {
    if (!formData.otp) return setError('Please enter the OTP');
    setError('');
    setIsLoading(true);
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/verify-otp`, {
        phone: formData.phone,
        otp: formData.otp,
        name: formData.name,
        email: formData.email,
        pageUrl: formData.pageUrl,
      });
      if (response.data.success) {
        setOtpVerified(true);
        setError('');
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      console.error('Error verifying OTP:', err);
      setError('Incorrect OTP. Please try again.');
    }
    setIsLoading(false);
  };

  // Handle form submission after OTP verification
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otpVerified) return setError('Please verify the OTP first.');
    alert('Form submitted successfully!');
    if (onClose) onClose(); // Close form after successful submission
  };

  // Effect to show the form after the specified delay
  useEffect(() => {
    const timer = setTimeout(() => setFormVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  // Function to close the form
  const closeForm = () => {
    setFormVisible(false);
    if (onClose) onClose(); // Call onClose to reset visibility in the parent component
  };

  return (
    formVisible && (
      <div style={styles.overlay}>
        <div style={styles.formContainer}>
          <button onClick={closeForm} style={styles.closeButton}>X</button>
          <h2 style={styles.title}>Let's Connect</h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              style={styles.input}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              style={styles.input}
              required
            />

            {otpSent && (
              <input
                type="text"
                name="otp"
                placeholder="Enter OTP"
                value={formData.otp}
                onChange={handleChange}
                style={styles.input}
                required
              />
            )}

            {error && <p style={styles.error}>{error}</p>}
            {!otpSent ? (
              <button
                type="button"
                onClick={sendOtp}
                style={styles.button}
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Send OTP'}
              </button>
            ) : otpVerified ? (
              <button type="submit" style={styles.button}>Submit</button>
            ) : (
              <button
                type="button"
                onClick={verifyOtp}
                style={styles.button}
                disabled={!otpSent || isLoading}
              >
                {isLoading ? 'Verifying...' : 'Verify OTP'}
              </button>
            )}
          </form>
        </div>
      </div>
    )
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
  formContainer: {
    width: '300px',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    transform: 'translateY(100px)',
    animation: 'slideIn 1s forwards',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '10px',
    margin: '8px 0',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px',
    marginTop: '10px',
    backgroundColor: '#104b97',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    fontSize: '0.9em',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'transparent',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
  },
};

export default Form;
