
"use client";
import React, { useState } from 'react';
import '../../components/Formstyle.css';
//import 'public/Property_Plateau_logo.png'

const PropertyInquiryForm = () => {
  const initialFormData = {
    fullName: '',
    email: '',
    phone: '',
    contactMode: '',
    propertyType: [],
    location: '',
    bhkType: [],
    otherBHK: '',
    purpose: '',
    minBudget: '',
    maxBudget: '',
    finance: '',
    timeline: '',
    meetingDay: '',
    meetingDate: '',
    meetingTime: '',  
    amenities: '',
    considerations: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked
          ? [...prevData[name], value]
          : prevData[name].filter((item) => item !== value),
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (validateForm()) {
      setSuccessMessage('Submitting your form...');
      try {
        const response = await fetch('https://form2-0m5f.onrender.com/submit-form', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setSuccessMessage('Form submitted successfully! Redirecting...');
          setTimeout(() => {
            setFormData(initialFormData);
            setSubmitted(false);
            setSuccessMessage('');
          }, 2000);
        } else {
          setSuccessMessage('Failed to submit the form. Please try again.');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        setSuccessMessage('An error occurred. Please try again later.');
      }
    } else {
      setSuccessMessage('Please correct the errors before submitting.');
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Basic Info Validation
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required.';
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Valid Email is required.';
    if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Valid 10-digit Phone Number is required.';
    if (!formData.contactMode) newErrors.contactMode = 'Please select a contact mode.';

    // Property Preferences Validation
    if (formData.propertyType.length === 0) newErrors.propertyType = 'Please select at least one property type.';
    if (!formData.location.trim()) newErrors.location = 'Preferred Location is required.';
    if (formData.bhkType.length === 0) newErrors.bhkType = 'Please select at least one BHK type.';
    if (formData.bhkType.includes('Other') && !formData.otherBHK.trim()) newErrors.otherBHK = 'Please specify other BHK type.';
    if (!formData.purpose) newErrors.purpose = 'Please select a purpose.';

    // Budget & Finance Validation
    if (!formData.minBudget || isNaN(formData.minBudget) || Number(formData.minBudget) < 0) newErrors.minBudget = 'Enter a valid minimum budget.';
    if (!formData.maxBudget || isNaN(formData.maxBudget) || Number(formData.maxBudget) <= Number(formData.minBudget)) newErrors.maxBudget = 'Enter a valid maximum budget greater than minimum budget.';
    if (!formData.finance) newErrors.finance = 'Please specify if you need finance assistance.';
    if (!formData.timeline) newErrors.timeline = 'Please select a purchase timeline.';

    // Meeting Preferences Validation
    if (!formData.meetingDay) newErrors.meetingDay = 'Please select a meeting day.';
    if (!formData.meetingDate) newErrors.meetingDate = 'Please select a meeting date.';
    if (!formData.meetingTime) newErrors.meetingTime = 'Please select a meeting time.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  return (
    <div className="form-page">
      <div className="form-container">
      <img src="/Property_Plateau_logo.png" alt="Property Plateau Logo" className="logo" />

        <h2>Property Inquiry Form</h2>
        <p>Greetings! ☺</p>
        <p>Thank you for reaching out to Property Plateau Realty! Kindly take a moment to fill out this short questionnaire:</p>
        <form onSubmit={handleSubmit}>
          <h3>1. Basic Information</h3>
          <input name="fullName" type="text" placeholder="Full Name" onChange={handleChange} value={formData.fullName} />
          {errors.fullName && <p className="error">{errors.fullName}</p>}


          <input name="email" type="email" placeholder="Email" onChange={handleChange} value={formData.email} />
          {errors.email && <p className="error">{errors.email}</p>}

          <input name="phone" type="tel" placeholder="Phone Number" onChange={handleChange} value={formData.phone} />
          {errors.phone && <p className="error">{errors.phone}</p>}

          <label>Preferred Mode of Contact:</label>
          <select name="contactMode" onChange={handleChange} value={formData.contactMode}>
            <option value="">Select</option>
            <option value="Call">Call</option>
            <option value="WhatsApp">WhatsApp</option>
            <option value="Email">Email</option>
          </select>
          {errors.contactMode && <p className="error">{errors.contactMode}</p>}
        
          <h3>2. Property Preferences</h3>
          <label>Looking for:</label>
          <div className="checkbox-group">
            <label><input type="checkbox" name="propertyType" value="Apartment" onChange={handleChange} checked={formData.propertyType.includes('Apartment')} /> Apartment</label>
            <label><input type="checkbox" name="propertyType" value="Villa" onChange={handleChange} checked={formData.propertyType.includes('Villa')} /> Villa</label>
            <label><input type="checkbox" name="propertyType" value="Plot" onChange={handleChange} checked={formData.propertyType.includes('Plot')} /> Plot</label>
            <label><input type="checkbox" name="propertyType" value="Commercial" onChange={handleChange} checked={formData.propertyType.includes('Commercial')} /> Commercial Property</label>
          </div>
          {errors.propertyType && <p className="error">{errors.propertyType}</p>}
      


          <input name="location" type="text" placeholder="Preferred Location(s)" onChange={handleChange} value={formData.location} />
          {errors.location && <p className="error">{errors.location}</p>}
      
          <label>BHK Type:</label>
          <div className="checkbox-group">
            <label><input type="checkbox" name="bhkType" value="1 BHK" onChange={handleChange} checked={formData.bhkType.includes('1 BHK')} /> 1 BHK</label>
            <label><input type="checkbox" name="bhkType" value="2 BHK" onChange={handleChange} checked={formData.bhkType.includes('2 BHK')} /> 2 BHK</label>
            <label><input type="checkbox" name="bhkType" value="3 BHK+" onChange={handleChange} checked={formData.bhkType.includes('3 BHK+')} /> 3 BHK+</label>
            <label><input type="checkbox" name="bhkType" value="Other" onChange={handleChange} checked={formData.bhkType.includes('Other')} /> Other:</label>
            <input name="otherBHK" type="text" placeholder="Specify if other" onChange={handleChange} value={formData.otherBHK} />
          </div>
          {errors.bhkType && <p className="error">{errors.bhkType}</p>}

          <label>Purpose:</label>
          <select name="purpose" onChange={handleChange} value={formData.purpose}>
            <option value="">Select</option>
            <option value="New Home">New Home</option>
            <option value="Investment">Investment</option>
          </select>
          {errors.purpose && <p className="error">{errors.purpose}</p>}
          <h3>3. Budget & Financing</h3>
          <input name="minBudget" type="number" placeholder="Min Budget (₹)" onChange={handleChange} value={formData.minBudget} />
          {errors.minBudget && <p className="error">{errors.minBudget}</p>}
          <input name="maxBudget" type="number" placeholder="Max Budget (₹)" onChange={handleChange} value={formData.maxBudget} />
          {errors.maxBudget && <p className="error">{errors.maxBudget}</p>}
          <label>Do you require home finance assistance?</label>
          <div className="radio-group">
            <label><input type="radio" name="finance" value="Yes" onChange={handleChange} checked={formData.finance === 'Yes'} /> Yes</label>
            <label><input type="radio" name="finance" value="No" onChange={handleChange} checked={formData.finance === 'No'} /> No</label>
          </div>
          {errors.finance && <p className="error">{errors.finance}</p>}
          <label>Planned Purchase Timeline:</label>
          <select name="timeline" onChange={handleChange} value={formData.timeline}>
            <option value="">Select</option>
            <option value="Immediate">Immediate</option>
            <option value="3-6 Months">3-6 Months</option>
            <option value="6+ Months">6+ Months</option>
          </select>
          {errors.timeline && <p className="error">{errors.timeline}</p>}

          <h3> Meeting Preferences</h3>
          <label>Preferred Day for Meeting:</label>
          <select name="meetingDay" onChange={handleChange} value={formData.meetingDay}>
            <option value="">Select</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>
          {errors.meetingDay && <p className="error">{errors.meetingDay}</p>}

          <label>Preferred Date:</label>
          <input name="meetingDate" type="date" onChange={handleChange} value={formData.meetingDate} />
          {errors.meetingDate && <p className="error">{errors.meetingDate}</p>}

          <label>Preferred Time:</label>
          <input name="meetingTime" type="time" onChange={handleChange} value={formData.meetingTime} />
          {errors.meetingTime && <p className="error">{errors.meetingTime}</p>}

          <label>Specific Amenities or Features:</label>
          <textarea name="amenities" placeholder="Describe desired amenities" onChange={handleChange} value={formData.amenities}></textarea>

          <label>Other Important Considerations:</label>
          <textarea name="considerations" placeholder="Any additional comments" onChange={handleChange} value={formData.considerations}></textarea>

          <button type="submit">Submit</button>
          <div className="form-footer">
            {successMessage && <p className="success-message">{successMessage}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default PropertyInquiryForm;
