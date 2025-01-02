"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MultiStepForm.css'; // Import the CSS file

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    otp: '',
    professional: '',
    propertyType: '',
    housingFinance: '',
    appointmentType: '',
    lastSeenProjects: '',
    pageUrl: '',
  });
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      pageUrl: window.location.href,
    }));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.name && formData.professional && formData.propertyType;
      case 2:
        return formData.housingFinance && formData.appointmentType;
      case 3:
        return formData.lastSeenProjects;
      case 4:
        return formData.email && formData.phone && otpVerified;
      default:
        return false;
    }
  };

  const sendOtp = async () => {
    if (!formData.phone) return setError('Please enter a valid phone number');
    setError('');
    setIsLoading(true);
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/send-otp`, {
        phone: formData.phone,
      });
      if (response.data.success) {
        setOtpSent(true);
        setError('');
      } else {
        setError(response.data.message || 'Failed to send OTP. Please try again.');
      }
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
    }
    setIsLoading(false);
  };

  const verifyOtp = async () => {
    if (!formData.otp) return setError('Please enter the OTP');
    setError('');
    setIsLoading(true);
    try {
      const nameWithDetails = `Name: ${formData.name} | Professional: ${formData.professional} | Property Type: ${formData.propertyType} | Housing Finance: ${formData.housingFinance} | Appointment Type: ${formData.appointmentType} | Last Seen Projects: ${formData.lastSeenProjects}`;
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/verify-otp`, {
        phone: formData.phone,
        otp: formData.otp,
        name: nameWithDetails,
        email: formData.email,
        pageUrl: formData.pageUrl,
      });
      if (response.data.success) {
        setOtpVerified(true);
        setError('');
        alert('OTP verified and form submitted successfully!');
      } else {
        setError(response.data.message || 'Failed to verify OTP. Please try again.');
      }
    } catch (err) {
      setError('Failed to verify OTP. Please try again.');
    }
    setIsLoading(false);
  };

  const nextStep = () => {
    if (!isStepValid()) {
      setError('Please fill in all required fields before proceeding.');
      return;
    }
    setError('');
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setError('');
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const renderStep = () => {
    switch (currentStep) {
        case 1:
            return (
              <div className="form-step">
                <h2>Step 1: Additional Details</h2>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="professional"
                  placeholder="Professional"
                  value={formData.professional}
                  onChange={handleChange}
                />
                <div className="property-type-container">
                  <h4>Select Type of Property</h4>
                  <div className="property-options">
                    {['Flat/Apartment', 'Independent House/Villa', 'Independent/Builder Floor', '1 RK/Studio Apartment'].map((type) => (
                      <button
                        type="button"
                        key={type}
                        className={`property-option ${formData.propertyType === type ? 'selected' : ''}`}
                        onClick={() => setFormData({ ...formData, propertyType: type })}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            );
          
            case 2:
                return (
                  <div className="form-step">
                    <h2>Step 2: Housing Finance & Appointment</h2>
              
                    {/* Housing Finance Options */}
                    <div className="clickable-options-container">
                      <h4>Do you need Housing Finance?</h4>
                      <div className="clickable-options">
                        {['Yes', 'No'].map((option) => (
                          <button
                            type="button"
                            key={option}
                            className={`clickable-option ${formData.housingFinance === option ? 'selected' : ''}`}
                            onClick={() => setFormData({ ...formData, housingFinance: option })}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
              
                    {/* Appointment Type Options */}
                    <div className="clickable-options-container">
                      <h4>Select Appointment Type</h4>
                      <div className="clickable-options">
                        {['Virtual Call', 'Face-to-Face Meeting'].map((option) => (
                          <button
                            type="button"
                            key={option}
                            className={`clickable-option ${formData.appointmentType === option ? 'selected' : ''}`}
                            onClick={() => setFormData({ ...formData, appointmentType: option })}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                );              
      case 3:
        return (
          <div className="form-step">
            <h2>Step 3: Last Seen Projects</h2>
            <textarea
              name="lastSeenProjects"
              placeholder="Last Seen Projects"
              value={formData.lastSeenProjects}
              onChange={handleChange}
            />
          </div>
        );
      case 4:
        return (
          <div className="form-step">
            <h2>Step 4: Contact Details & OTP Verification</h2>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
            />
            {otpSent ? (
              <div>
                <input
                  type="text"
                  name="otp"
                  placeholder="Enter OTP"
                  value={formData.otp}
                  onChange={handleChange}
                />
                <button className="button" onClick={verifyOtp} disabled={isLoading}>
                  {isLoading ? 'Verifying...' : 'Verify OTP'}
                </button>
              </div>
            ) : (
              <button className="button" onClick={sendOtp} disabled={isLoading}>
                {isLoading ? 'Sending OTP...' : 'Send OTP'}
              </button>
            )}
          </div>
        );
      default:
        return <div>Unknown step</div>;
    }
  };

 
  return (
 
    <div className="container123">
  {/* Left Section - Text */}
  <div className="text-section">
    <h1 className="heading">
      Buy your dream Property <span className="highlight">online faster</span> with Us
    </h1>
    <ul className="benefits">
      <li>✔ Instant Call Back</li>
      <li>✔ Free Site Visit</li>
      <li>✔ Unmatched Price*</li>
      <li>✔ Assistance in coordinating site visits*</li>
    </ul>
  </div>

  {/* Right Section - Form */}
  <div className="form-section">
  {/* Multi-Step Form Section */}
  <div className="multi-step-form-container">
        {/* Progress Bar */}
       <div className="progress-bar">
         Step {currentStep} of 4
       </div>
        {/* Render Current Step */}
       {renderStep()}
        {/* Navigation Buttons */}
       <div className="navigation-buttons">
         {/* Previous Button */}
         {currentStep > 1 && (
           <button
             className="button prev-button"
             onClick={prevStep}
           >
             Previous
           </button>
         )}
          {/* Next Button */}
         {currentStep < 4 && (
           <button
             className="button next-button"
             onClick={nextStep}
             disabled={!isStepValid()}
           >
             Next
           </button>
         )}
       </div>
        {/* Error Message */}
       {error && (
         <p className="error-message">
           {error}
         </p>
       )}
     </div>
   </div>
</div>


  );
  
};

export default MultiStepForm;
