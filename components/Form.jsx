'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Form = ({ section, delay = 1000, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    otp: '',
    pageUrl: '',
  });
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [error, setError] = useState('');
  const [formVisible, setFormVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // capture current URL on client
  useEffect(() => {
    setFormData(prev => ({ ...prev, pageUrl: window.location.href }));
  }, []);

  // show form after delay
  useEffect(() => {
    const timer = setTimeout(() => setFormVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const sendOtp = async () => {
    if (!formData.phone) return setError('Please enter a valid phone number');
    setError('');
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/send-otp`,
        { phone: formData.phone }
      );
      if (data.success) {
        setOtpSent(true);
      } else {
        setError(data.message || 'Failed to send OTP.');
      }
    } catch {
      setError('Failed to send OTP. Please try again.');
    }
    setIsLoading(false);
  };

  const verifyOtp = async () => {
    if (!formData.otp) return setError('Please enter the OTP');
    setError('');
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/verify-otp`,
        {
          phone: formData.phone,
          otp: formData.otp,
          name: formData.name,
          email: formData.email,
          pageUrl: formData.pageUrl,
          section,
        }
      );
      if (data.success) {
        setOtpVerified(true);
      } else {
        setError(data.message || 'OTP verification failed.');
      }
    } catch {
      setError('Incorrect OTP. Please try again.');
    }
    setIsLoading(false);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!otpVerified) return setError('Please verify the OTP first.');
    onSubmit(true);
  };

  const handleClose = () => {
    onSubmit(false);
  };

  if (!formVisible) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.formContainer}>
        <button onClick={handleClose} style={styles.closeButton}>✕</button>
        <h2 style={styles.title}>Let's Connect</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            name="name"
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <input
            name="phone"
            type="tel"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            style={styles.input}
            required
          />
          {otpSent && (
            <input
              name="otp"
              type="text"
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
              disabled={isLoading}
            >
              {isLoading ? 'Verifying...' : 'Verify OTP'}
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  formContainer: {
    width: '300px',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    transform: 'translateY(100px)',
    animation: 'slideIn 1s forwards',
    position: 'relative',
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
};

export default Form;