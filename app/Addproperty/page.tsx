// 'use client';
// import React, { useState, useRef, useEffect } from 'react';
// import axios from 'axios';

// export default function AddPropertyPage() {
//   // Form state
//   const [title, setTitle] = useState('');
//   const [location, setLocation] = useState('');
//   const [price, setPrice] = useState('');
//   const [description, setDescription] = useState('');
//   const [amenitiesInput, setAmenitiesInput] = useState('');
//   const [plansInput, setPlansInput] = useState('');
//   const [possessionDate, setPossessionDate] = useState('');
//   const [propertyLabel, setPropertyLabel] = useState('');
  
//   // File upload state
//   const [imageFiles, setImageFiles] = useState<File[]>([]);
//   const [videoFile, setVideoFile] = useState<File | null>(null);
//   const [floorPlanFile, setFloorPlanFile] = useState<File | null>(null);
//   const [imagePreviews, setImagePreviews] = useState<string[]>([]);
//   const [videoPreview, setVideoPreview] = useState<string | null>(null);
//   const [floorPlanPreview, setFloorPlanPreview] = useState<string | null>(null);
  
//   // Refs
//   const imageInputRef = useRef<HTMLInputElement>(null);
//   const videoInputRef = useRef<HTMLInputElement>(null);
//   const floorPlanInputRef = useRef<HTMLInputElement>(null);
  
//   // Clean up object URLs
//   useEffect(() => {
//     return () => {
//       imagePreviews.forEach(url => URL.revokeObjectURL(url));
//       if (videoPreview) URL.revokeObjectURL(videoPreview);
//       if (floorPlanPreview) URL.revokeObjectURL(floorPlanPreview);
//     };
//   }, [imagePreviews, videoPreview, floorPlanPreview]);

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       const files = Array.from(e.target.files).slice(0, 10); // Limit to 10 files
//       setImageFiles(files);
      
//       // Create preview URLs
//       const previews = files.map(file => URL.createObjectURL(file));
//       setImagePreviews(previews);
//     }
//   };

//   const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       setVideoFile(file);
//       setVideoPreview(URL.createObjectURL(file));
//     }
//   };

//   const handleFloorPlanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       setFloorPlanFile(file);
//       setFloorPlanPreview(URL.createObjectURL(file));
//     }
//   };

//   const removeImage = (index: number) => {
//     const newFiles = [...imageFiles];
//     const newPreviews = [...imagePreviews];
    
//     newFiles.splice(index, 1);
//     newPreviews.splice(index, 1);
    
//     setImageFiles(newFiles);
//     setImagePreviews(newPreviews);
//   };

//   const removeVideo = () => {
//     setVideoFile(null);
//     setVideoPreview(null);
//     if (videoInputRef.current) videoInputRef.current.value = '';
//   };

//   const removeFloorPlan = () => {
//     setFloorPlanFile(null);
//     setFloorPlanPreview(null);
//     if (floorPlanInputRef.current) floorPlanInputRef.current.value = '';
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
  
//     // Convert comma-separated strings to arrays
//     const amenities = amenitiesInput.split(',').map(item => item.trim()).filter(item => item);
//     const plans = plansInput.split(',').map(item => item.trim()).filter(item => item);
  
//     const formData = new FormData();
    
//     // Append all form fields
//     formData.append('title', title);
//     formData.append('location', location);
//     formData.append('price', price);
//     formData.append('description', description);
//     formData.append('amenities', JSON.stringify(amenities));
//     formData.append('plans', JSON.stringify(plans));
//     formData.append('possessionDate', possessionDate);
//     formData.append('propertyLabel', propertyLabel);
    
//     // Append image files
//     imageFiles.forEach(file => {
//       formData.append('propertyImages', file);
//     });
    
//     // Append video file if exists
//     if (videoFile) {
//       formData.append('propertyVideo', videoFile);
//     }

//     // Append floor plan file if exists
//     if (floorPlanFile) {
//       formData.append('floorPlan', floorPlanFile);
//     }
  
//     try {
//       const response = await axios.post('https://backend-server-1smb.onrender.com/api/properties', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });
  
//       if (response.data.success) {
//         alert('Property added successfully!');
//         resetForm();
//       } else {
//         alert('Failed to add property: ' + (response.data.error || 'Unknown error'));
//       }
//     } catch (error: any) {
//       console.error('Error adding property:', error);
//       alert(`Error: ${error.response?.data?.error || error.message || 'Something went wrong'}`);
//     }
//   };

//   const resetForm = () => {
//     setTitle('');
//     setLocation('');
//     setPrice('');
//     setDescription('');
//     setAmenitiesInput('');
//     setPlansInput('');
//     setPossessionDate('');
//     setPropertyLabel('');
//     setImageFiles([]);
//     setVideoFile(null);
//     setFloorPlanFile(null);
//     setImagePreviews([]);
//     setVideoPreview(null);
//     setFloorPlanPreview(null);
//     if (imageInputRef.current) imageInputRef.current.value = '';
//     if (videoInputRef.current) videoInputRef.current.value = '';
//     if (floorPlanInputRef.current) floorPlanInputRef.current.value = '';
//   };

//   return (
//     <div className="page-container">
//       <div className="form-container">
//         <h2 className="form-title">Add New Property</h2>
//         <form onSubmit={handleSubmit} className="property-form">
          
//           {/* Basic Information Section */}
//           <div className="form-section">
//             <h3 className="section-title">Basic Information</h3>
//             <div className="form-group">
//               <label htmlFor="title">Title*</label>
//               <input 
//                 id="title"
//                 type="text" 
//                 value={title} 
//                 onChange={(e) => setTitle(e.target.value)} 
//                 required 
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="location">Location*</label>
//               <input 
//                 id="location"
//                 type="text" 
//                 value={location} 
//                 onChange={(e) => setLocation(e.target.value)} 
//                 required 
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="price">Price*</label>
//               <input 
//                 id="price"
//                 type="text" 
//                 value={price} 
//                 onChange={(e) => setPrice(e.target.value)} 
//                 required 
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="description">Description</label>
//               <textarea 
//                 id="description"
//                 value={description} 
//                 onChange={(e) => setDescription(e.target.value)} 
//                 rows={4}
//               />
//             </div>
//           </div>

//           {/* Details Section */}
//           <div className="form-section">
//             <h3 className="section-title">Details</h3>
//             <div className="form-group">
//               <label htmlFor="amenities">Amenities (comma separated)</label>
//               <input 
//                 id="amenities"
//                 type="text" 
//                 value={amenitiesInput}
//                 onChange={(e) => setAmenitiesInput(e.target.value)}
//                 placeholder="Swimming Pool, Gym, Parking, etc."
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="plans">Plans (comma separated)</label>
//               <input 
//                 id="plans"
//                 type="text" 
//                 value={plansInput}
//                 onChange={(e) => setPlansInput(e.target.value)}
//                 placeholder="1BHK, 2BHK, 3BHK, etc."
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="possessionDate">Possession Date</label>
//               <input 
//                 id="possessionDate"
//                 type="date" 
//                 value={possessionDate} 
//                 onChange={(e) => setPossessionDate(e.target.value)} 
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="propertyLabel">Property Label</label>
//               <input 
//                 id="propertyLabel"
//                 type="text" 
//                 value={propertyLabel} 
//                 onChange={(e) => setPropertyLabel(e.target.value)} 
//                 placeholder="Premium, Luxury, etc."
//               />
//             </div>
//           </div>

//           {/* Media Section */}
//           <div className="form-section">
//             <h3 className="section-title">Media Uploads</h3>
            
//             {/* Floor Plan Upload */}
//             <div className="form-group">
//               <label htmlFor="floorPlan">Floor Plan Image</label>
//               <input
//                 id="floorPlan"
//                 type="file"
//                 accept="image/*"
//                 onChange={handleFloorPlanChange}
//                 ref={floorPlanInputRef}
//               />
//               <p className="hint">Supported formats: JPEG, PNG, WEBP</p>
              
//               {floorPlanPreview && (
//                 <div className="preview-container">
//                   <div className="preview-item">
//                     <img 
//                       src={floorPlanPreview} 
//                       alt="Floor Plan Preview"
//                       className="preview-image"
//                     />
//                     <button 
//                       type="button" 
//                       className="remove-button"
//                       onClick={removeFloorPlan}
//                     >
//                       ×
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>

//             <div className="form-group">
//               <label htmlFor="propertyImages">Property Images (Max 10)*</label>
//               <input
//                 id="propertyImages"
//                 type="file"
//                 multiple
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 ref={imageInputRef}
//                 required
//               />
//               <p className="hint">Supported formats: JPEG, PNG, WEBP</p>
              
//               <div className="preview-container">
//                 {imagePreviews.map((preview, index) => (
//                   <div key={index} className="preview-item">
//                     <img 
//                       src={preview} 
//                       alt={`Preview ${index}`}
//                       className="preview-image"
//                     />
//                     <button 
//                       type="button" 
//                       className="remove-button"
//                       onClick={() => removeImage(index)}
//                     >
//                       ×
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="form-group">
//               <label htmlFor="propertyVideo">Property Video</label>
//               <input
//                 id="propertyVideo"
//                 type="file"
//                 accept="video/*"
//                 onChange={handleVideoChange}
//                 ref={videoInputRef}
//               />
//               <p className="hint">Supported formats: MP4, MOV, AVI (Max 100MB)</p>
              
//               {videoPreview && (
//                 <div className="preview-container">
//                   <div className="preview-item">
//                     <video 
//                       controls 
//                       src={videoPreview}
//                       className="preview-video"
//                     />
//                     <button 
//                       type="button" 
//                       className="remove-button"
//                       onClick={removeVideo}
//                     >
//                       ×
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           <div className="form-actions">
//             <button type="button" className="cancel-button" onClick={resetForm}>
//               Reset
//             </button>
//             <button type="submit" className="submit-button">
//               Add Property
//             </button>
//           </div>
//         </form>
//       </div>

//       <style jsx>{`
//         .page-container {
//           padding: 2rem;
//           background-color: #f5f7fa;
//           min-height: 100vh;
//           overflow-y: auto;    
//         }

//         .form-container {
//           max-width: 800px;
//           margin: 0 auto;
//           padding: 2rem;
//           background: #fff;
//           border-radius: 12px;
//           box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//           max-height: 90vh;
//           overflow-y: auto;
//         }

//         .form-title {
//           color: #2d3748;
//           font-size: 1.8rem;
//           margin-bottom: 1.5rem;
//           text-align: center;
//           font-weight: 600;
//         }

//         .form-section {
//           margin-bottom: 2rem;
//           padding-bottom: 1.5rem;
//           border-bottom: 1px solid #e2e8f0;
//         }

//         .section-title {
//           color: #4a5568;
//           font-size: 1.2rem;
//           margin-bottom: 1rem;
//           font-weight: 600;
//         }

//         .property-form {
//           display: flex;
//           flex-direction: column;
//           gap: 1.5rem;
//         }

//         .form-group {
//           display: flex;
//           flex-direction: column;
//           gap: 0.5rem;
//           margin-bottom: 1rem;
//         }

//         label {
//           font-size: 0.9rem;
//           color: #4a5568;
//           font-weight: 500;
//         }

//         .hint {
//           font-size: 0.8rem;
//           color: #718096;
//           margin-top: 0.25rem;
//         }

//         input, textarea, select {
//           padding: 0.75rem 1rem;
//           border: 1px solid #e2e8f0;
//           border-radius: 8px;
//           font-size: 1rem;
//           background-color: #f8fafc;
//           transition: all 0.2s;
//         }

//         input[type="file"] {
//           padding: 0.5rem;
//           background-color: transparent;
//           border: 1px dashed #cbd5e0;
//         }

//         textarea {
//           resize: vertical;
//           min-height: 100px;
//         }

//         .preview-container {
//           display: flex;
//           flex-wrap: wrap;
//           gap: 1rem;
//           margin-top: 1rem;
//         }

//         .preview-item {
//           position: relative;
//           border: 1px solid #e2e8f0;
//           border-radius: 8px;
//         }

//         .preview-image {
//           width: 100px;
//           height: 100px;
//           object-fit: cover;
//         }

//         .preview-video {
//           width: 250px;
//           max-height: 150px;
//         }

//         .remove-button {
//           position: absolute;
//           top: 0;
//           right: 0;
//           background: #e53e3e;
//           color: white;
//           border: none;
//           width: 24px;
//           height: 24px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           cursor: pointer;
//           font-weight: bold;
//           border-radius: 0 0 0 8px;
//         }

//         .form-actions {
//           display: flex;
//           justify-content: flex-end;
//           gap: 1rem;
//           margin-top: 1.5rem;
//         }

//         .submit-button {
//           background-color: #4299e1;
//           color: white;
//           padding: 0.75rem 1.5rem;
//           border: none;
//           border-radius: 8px;
//           font-size: 1rem;
//           font-weight: 600;
//           cursor: pointer;
//           transition: background-color 0.2s ease;
//         }

//         .cancel-button {
//           background-color: #e2e8f0;
//           color: #4a5568;
//           padding: 0.75rem 1.5rem;
//           border: none;
//           border-radius: 8px;
//           font-size: 1rem;
//           font-weight: 600;
//           cursor: pointer;
//           transition: background-color 0.2s ease;
//         }

//         .submit-button:hover {
//           background-color: #3182ce;
//         }

//         .cancel-button:hover {
//           background-color: #cbd5e0;
//         }

//         @media (max-width: 768px) {
//           .form-container {
//             padding: 1.5rem;
//           }
          
//           .page-container {
//             padding: 1rem;
//           }
          
//           .form-actions {
//             flex-direction: column;
//           }
          
//           .submit-button, .cancel-button {
//             width: 100%;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }




'use client';
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

export default function AddPropertyPage() {
  // Form state
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [amenitiesInput, setAmenitiesInput] = useState('');
  const [plansInput, setPlansInput] = useState('');
  const [possessionDate, setPossessionDate] = useState('');
  const [propertyLabel, setPropertyLabel] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // File upload state
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [floorPlanFile, setFloorPlanFile] = useState<File | null>(null);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [floorPlanPreview, setFloorPlanPreview] = useState<string | null>(null);
  
  // Refs
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const floorPlanInputRef = useRef<HTMLInputElement>(null);
  
  // Clean up object URLs
  useEffect(() => {
    return () => {
      imagePreviews.forEach(url => URL.revokeObjectURL(url));
      if (videoPreview) URL.revokeObjectURL(videoPreview);
      if (floorPlanPreview) URL.revokeObjectURL(floorPlanPreview);
    };
  }, [imagePreviews, videoPreview, floorPlanPreview]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files).slice(0, 10); // Limit to 10 files
      setImageFiles(files);
      
      // Create preview URLs
      const previews = files.map(file => URL.createObjectURL(file));
      setImagePreviews(previews);
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  const handleFloorPlanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFloorPlanFile(file);
      setFloorPlanPreview(URL.createObjectURL(file));
    }
  };

  const removeImage = (index: number) => {
    const newFiles = [...imageFiles];
    const newPreviews = [...imagePreviews];
    
    newFiles.splice(index, 1);
    newPreviews.splice(index, 1);
    
    setImageFiles(newFiles);
    setImagePreviews(newPreviews);
  };

  const removeVideo = () => {
    setVideoFile(null);
    setVideoPreview(null);
    if (videoInputRef.current) videoInputRef.current.value = '';
  };

  const removeFloorPlan = () => {
    setFloorPlanFile(null);
    setFloorPlanPreview(null);
    if (floorPlanInputRef.current) floorPlanInputRef.current.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    // Convert comma-separated strings to arrays
    const amenities = amenitiesInput.split(',').map(item => item.trim()).filter(item => item);
    const plans = plansInput.split(',').map(item => item.trim()).filter(item => item);
  
    const formData = new FormData();
    
    // Append all form fields
    formData.append('title', title);
    formData.append('location', location);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('amenities', JSON.stringify(amenities));
    formData.append('plans', JSON.stringify(plans));
    formData.append('possessionDate', possessionDate);
    formData.append('propertyLabel', propertyLabel);
    
    // Append image files
    imageFiles.forEach(file => {
      formData.append('propertyImages', file);
    });
    
    // Append video file if exists
    if (videoFile) {
      formData.append('propertyVideo', videoFile);
    }

    // Append floor plan file if exists
    if (floorPlanFile) {
      formData.append('floorPlan', floorPlanFile);
    }
  
    try {
      const response = await axios.post('https://backend-server-1smb.onrender.com/api/properties', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      if (response.data.success) {
        alert('Property added successfully!');
        resetForm();
      } else {
        alert('Failed to add property: ' + (response.data.error || 'Unknown error'));
      }
    } catch (error: any) {
      console.error('Error adding property:', error);
      alert(`Error: ${error.response?.data?.error || error.message || 'Something went wrong'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setTitle('');
    setLocation('');
    setPrice('');
    setDescription('');
    setAmenitiesInput('');
    setPlansInput('');
    setPossessionDate('');
    setPropertyLabel('');
    setImageFiles([]);
    setVideoFile(null);
    setFloorPlanFile(null);
    setImagePreviews([]);
    setVideoPreview(null);
    setFloorPlanPreview(null);
    if (imageInputRef.current) imageInputRef.current.value = '';
    if (videoInputRef.current) videoInputRef.current.value = '';
    if (floorPlanInputRef.current) floorPlanInputRef.current.value = '';
  };

  return (
    <div className="page-container">
      <div className="form-container">
        <h2 className="form-title">Add New Property</h2>
        <form onSubmit={handleSubmit} className="property-form">
          
          {/* Basic Information Section */}
          <div className="form-section">
            <h3 className="section-title">Basic Information</h3>
            <div className="form-group">
              <label htmlFor="title">Title*</label>
              <input 
                id="title"
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="location">Location*</label>
              <input 
                id="location"
                type="text" 
                value={location} 
                onChange={(e) => setLocation(e.target.value)} 
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">Price*</label>
              <input 
                id="price"
                type="text" 
                value={price} 
                onChange={(e) => setPrice(e.target.value)} 
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea 
                id="description"
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                rows={4}
              />
            </div>
          </div>

          {/* Details Section */}
          <div className="form-section">
            <h3 className="section-title">Details</h3>
            <div className="form-group">
              <label htmlFor="amenities">Amenities (comma separated)</label>
              <input 
                id="amenities"
                type="text" 
                value={amenitiesInput}
                onChange={(e) => setAmenitiesInput(e.target.value)}
                placeholder="Swimming Pool, Gym, Parking, etc."
              />
            </div>

            <div className="form-group">
              <label htmlFor="plans">Plans (comma separated)</label>
              <input 
                id="plans"
                type="text" 
                value={plansInput}
                onChange={(e) => setPlansInput(e.target.value)}
                placeholder="1BHK, 2BHK, 3BHK, etc."
              />
            </div>

            <div className="form-group">
              <label htmlFor="possessionDate">Possession Date</label>
              <input 
                id="possessionDate"
                type="date" 
                value={possessionDate} 
                onChange={(e) => setPossessionDate(e.target.value)} 
              />
            </div>

            <div className="form-group">
              <label htmlFor="propertyLabel">Property Label</label>
              <input 
                id="propertyLabel"
                type="text" 
                value={propertyLabel} 
                onChange={(e) => setPropertyLabel(e.target.value)} 
                placeholder="Premium, Luxury, etc."
              />
            </div>
          </div>

          {/* Media Section */}
          <div className="form-section">
            <h3 className="section-title">Media Uploads</h3>
            
            {/* Floor Plan Upload */}
            <div className="form-group">
              <label htmlFor="floorPlan">Floor Plan Image</label>
              <input
                id="floorPlan"
                type="file"
                accept="image/*"
                onChange={handleFloorPlanChange}
                ref={floorPlanInputRef}
              />
              <p className="hint">Supported formats: JPEG, PNG, WEBP</p>
              
              {floorPlanPreview && (
                <div className="preview-container">
                  <div className="preview-item">
                    <img 
                      src={floorPlanPreview} 
                      alt="Floor Plan Preview"
                      className="preview-image"
                    />
                    <button 
                      type="button" 
                      className="remove-button"
                      onClick={removeFloorPlan}
                    >
                      ×
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="propertyImages">Property Images (Max 10)*</label>
              <input
                id="propertyImages"
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                ref={imageInputRef}
                required
              />
              <p className="hint">Supported formats: JPEG, PNG, WEBP</p>
              
              <div className="preview-container">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="preview-item">
                    <img 
                      src={preview} 
                      alt={`Preview ${index}`}
                      className="preview-image"
                    />
                    <button 
                      type="button" 
                      className="remove-button"
                      onClick={() => removeImage(index)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="propertyVideo">Property Video</label>
              <input
                id="propertyVideo"
                type="file"
                accept="video/*"
                onChange={handleVideoChange}
                ref={videoInputRef}
              />
              <p className="hint">Supported formats: MP4, MOV, AVI (Max 100MB)</p>
              
              {videoPreview && (
                <div className="preview-container">
                  <div className="preview-item">
                    <video 
                      controls 
                      src={videoPreview}
                      className="preview-video"
                    />
                    <button 
                      type="button" 
                      className="remove-button"
                      onClick={removeVideo}
                    >
                      ×
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={resetForm}>
              Reset
            </button>
            <button 
              type="submit" 
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Adding...' : 'Add Property'}
            </button>
          </div>
        </form>
      </div>

      {isSubmitting && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}

      <style jsx>{`
        .page-container {
          padding: 2rem;
          background-color: #f5f7fa;
          min-height: 100vh;
          overflow-y: auto;    
        }

        .form-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          max-height: 90vh;
          overflow-y: auto;
        }

        .form-title {
          color: #2d3748;
          font-size: 1.8rem;
          margin-bottom: 1.5rem;
          text-align: center;
          font-weight: 600;
        }

        .form-section {
          margin-bottom: 2rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid #e2e8f0;
        }

        .section-title {
          color: #4a5568;
          font-size: 1.2rem;
          margin-bottom: 1rem;
          font-weight: 600;
        }

        .property-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        label {
          font-size: 0.9rem;
          color: #4a5568;
          font-weight: 500;
        }

        .hint {
          font-size: 0.8rem;
          color: #718096;
          margin-top: 0.25rem;
        }

        input, textarea, select {
          padding: 0.75rem 1rem;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-size: 1rem;
          background-color: #f8fafc;
          transition: all 0.2s;
        }

        input[type="file"] {
          padding: 0.5rem;
          background-color: transparent;
          border: 1px dashed #cbd5e0;
        }

        textarea {
          resize: vertical;
          min-height: 100px;
        }

        .preview-container {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-top: 1rem;
        }

        .preview-item {
          position: relative;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
        }

        .preview-image {
          width: 100px;
          height: 100px;
          object-fit: cover;
        }

        .preview-video {
          width: 250px;
          max-height: 150px;
        }

        .remove-button {
          position: absolute;
          top: 0;
          right: 0;
          background: #e53e3e;
          color: white;
          border: none;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-weight: bold;
          border-radius: 0 0 0 8px;
        }

        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          margin-top: 1.5rem;
        }

        .submit-button {
          background-color: #4299e1;
          color: white;
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .submit-button:disabled {
          background-color: #a0aec0;
          cursor: not-allowed;
        }

        .cancel-button {
          background-color: #e2e8f0;
          color: #4a5568;
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .submit-button:hover:not(:disabled) {
          background-color: #3182ce;
        }

        .cancel-button:hover {
          background-color: #cbd5e0;
        }

        .loading-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(255, 255, 255, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .loading-spinner {
          border: 4px solid rgba(0, 0, 0, 0.1);
          border-radius: 50%;
          border-top: 4px solid #4299e1;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .form-container {
            padding: 1.5rem;
          }
          
          .page-container {
            padding: 1rem;
          }
          
          .form-actions {
            flex-direction: column;
          }
          
          .submit-button, .cancel-button {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}