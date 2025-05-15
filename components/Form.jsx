'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Form = ({ section, delay = 1000, onSubmit, onClose }) => {
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

  useEffect(() => {
    setFormData(prev => ({ ...prev, pageUrl: window.location.href }));
  }, []);

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
    if (!otpVerified) {
      setError('Please verify the OTP first.');
      return;
    }

    alert('Form submitted successfully');

    if (typeof onSubmit === 'function') onSubmit(true);
    if (typeof onClose === 'function') onClose();
  };

  const handleClose = () => {
    if (typeof onSubmit === 'function') onSubmit(false);
    if (typeof onClose === 'function') onClose();
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
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    position: 'relative',
    width: '300px',
    boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '15px',
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
  },
  title: {
    textAlign: 'center',
    fontWeight: '500',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    marginBottom: '10px',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    backgroundColor: '#0a4cb3',
    color: '#fff',
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    fontSize: '14px',
  },
};

export default Form;
