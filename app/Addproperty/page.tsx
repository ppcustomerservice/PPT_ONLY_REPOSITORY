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

const amenityOptions = [
  { name: "24X7", icon: "/amenities/24x7.png" },
  { name: "Grand Entrance Gate", icon: "/amenities/grand-entrance-gate.png" },
  { name: "Convenience Stores", icon: "/amenities/convenience-stores.png" },
  { name: "Rooftop Sky Lounge", icon: "/amenities/rooftop-sky-lounge.png" },
  { name: "Sky Deck", icon: "/amenities/sky-deck.png" },
  { name: "Reflexology Park Deck", icon: "/amenities/reflexology-park-deck.png" },
  { name: "Cabana Seating Park Deck", icon: "/amenities/cabana-seating-park-deck.png" },
  { name: "Mini Golf Seating Park Deck", icon: "/amenities/mini-golf-seating-park-deck.png" },
  { name: "Football", icon: "/amenities/football_1.png" },
  { name: "Steam Room", icon: "/amenities/steam-room.png" },
  { name: "Store", icon: "/amenities/store.png" },
  { name: "Amphitheater", icon: "/amenities/amphitheater_1.png" },
  { name: "Solar Water Heater", icon: "/amenities/solar-water-heater.png" },
  { name: "Maintainence Service", icon: "/amenities/maintainence-service.png" },
  { name: "Sauna", icon: "/amenities/sauna_1.png" },
  { name: "Open Air Gym", icon: "/amenities/open-air-gym.png" },
  { name: "Co Working Space", icon: "/amenities/co-working-space.png" },
  { name: "Conference Room", icon: "/amenities/conference-room.png" },
  { name: "Meditation Zone", icon: "/amenities/meditation-zone.png" },
  { name: "Paved Compound", icon: "/amenities/paved-compound.png" },
  { name: "Pool Table", icon: "/amenities/pool-table.png" },
  { name: "Theater", icon: "/amenities/theater_1.png" },
  { name: "Concierge Service", icon: "/amenities/concierge-service.png" },
  { name: "Rent Management Service", icon: "/amenities/rent-management-service.png" },
  { name: "House Keeping", icon: "/amenities/house-keeping.png" },
  { name: "Snooker Table", icon: "/amenities/snooker-table.png" },
  { name: "Star Gazing Telescope", icon: "/amenities/star-gazing-telescope.png" },
  { name: "Open Space", icon: "/amenities/open-space.png" },
  { name: "Waste Mgt", icon: "/amenities/waste-mgt.png" },
  { name: "Fire Protection System", icon: "/amenities/fire-protection-system.png" },
  { name: "Gated Community", icon: "/amenities/gated-community.png" },
  { name: "Bus Shelter", icon: "/amenities/bus-shelter.png" },
  { name: "Community Hall", icon: "/amenities/community-hall.png" },
  { name: "Squash Court", icon: "/amenities/squash-court.png" },
  { name: "Spa", icon: "/amenities/spa_1.png" },
  { name: "Restaurant", icon: "/amenities/restaurant_1.png" },
  { name: "Fire-Fighting Systems", icon: "/amenities/fire-fighting-systems.png" },
  { name: "Internal Street Lights", icon: "/amenities/internal-street-lights.png" },
  { name: "24x7 Water", icon: "/amenities/24x7-water.png" },
  { name: "Acupressure Park", icon: "/amenities/acupressure-park.png" },
  { name: "Accupressure Patchway", icon: "/amenities/accupressure-patchway.png" },
  { name: "Aerobics Center", icon: "/amenities/aerobics-center.png" },
  { name: "AC", icon: "/amenities/ac_1.png" },
  { name: "Automatic Gate", icon: "/amenities/automatic-gate.png" },
  { name: "Badminton", icon: "/amenities/badminton_1.png" },
  { name: "Banquet Hall", icon: "/amenities/banquet-hall.png" },
  { name: "BBQ", icon: "/amenities/bbq_1.png" },
  { name: "CCTV", icon: "/amenities/cctv_1.png" },
  { name: "Cricket", icon: "/amenities/cricket_1.png" },
  { name: "Elevator", icon: "/amenities/elevator_1.png" },
  { name: "Basketball", icon: "/amenities/basketball_1.png" },
  { name: "Car Parking", icon: "/amenities/car-parking.png" },
  { name: "Clubhouse", icon: "/amenities/clubhouse_1.png" },
  { name: "Kids Play", icon: "/amenities/kids-play.png" },
  { name: "Swimming Pool", icon: "/amenities/swmimg-pool.png" },
  { name: "Air Hockey", icon: "/amenities/air-hockey.png" },
  { name: "ATM", icon: "/amenities/atm_1.png" },
  { name: "Backyard", icon: "/amenities/backyard_1.png" },
  { name: "Balcony", icon: "/amenities/balcony_1.png" },
  { name: "Bar", icon: "/amenities/bar_1.png" },
  { name: "Beach Volleyball", icon: "/amenities/beach-volleyball_1.png" },
  { name: "Cafe", icon: "/amenities/cafe_1.png" },
  { name: "Campfire", icon: "/amenities/campfire_1.png" },
  { name: "Car Charger", icon: "/amenities/car-charger.png" },
  { name: "Central AC", icon: "/amenities/central-ac.png" },
  { name: "Chat Plaza", icon: "/amenities/chat-plaza.png" },
  { name: "Creche", icon: "/amenities/creche_1.png" },
  { name: "Curtains", icon: "/amenities/curtains_1.png" },
  { name: "Customized Furniture", icon: "/amenities/customized-furniture.png" },
  { name: "Cycle Track", icon: "/amenities/cycle-track.png" },
  { name: "Dance Room", icon: "/amenities/dance-room.png" },
  { name: "Dedicated Pantries", icon: "/amenities/dedicated-pantries.png" },
  { name: "Designer Entrance Lobby", icon: "/amenities/designer-entrance-lobby.png" },
  { name: "Digital Zone", icon: "/amenities/digital-zone.png" },
  { name: "Double Height Lobby", icon: "/amenities/double-height-lobby.png" },
  { name: "Earthquake Resistant", icon: "/amenities/earthquake-resistant.png" },
  { name: "Electricity", icon: "/amenities/electricity_1.png" },
  { name: "Energy and Water Solution", icon: "/amenities/energy-and-water-solution.png" },
  { name: "Entertainment Deck", icon: "/amenities/entertainment-deck.png" },
  { name: "Entertainment Zone", icon: "/amenities/entertainment-zone.png" },
  { name: "Equipped Kitchen", icon: "/amenities/equipped-kitchen.png" },
  { name: "External Amenities", icon: "/amenities/external-amenities.png" },
  { name: "False Kitchen", icon: "/amenities/false-kitchen.png" },
  { name: "Field View", icon: "/amenities/field-view.png" },
  { name: "Fire Pit", icon: "/amenities/fire-pit.png" },
  { name: "Fitness Center", icon: "/amenities/fitness-center.png" },
  { name: "Flag Hosting Zone", icon: "/amenities/flag-hosting-zone.png" },
  { name: "Flower Garden", icon: "/amenities/flower-garden.png" },
  { name: "Food Court", icon: "/amenities/food-court.png" },
  { name: "Football Court", icon: "/amenities/football-court.png" },
  { name: "Forest Walk", icon: "/amenities/forest-walk.png" },
  { name: "Fountain", icon: "/amenities/fountain_1.png" },
  { name: "Front Yard", icon: "/amenities/front-yard.png" },
  { name: "Fully Furnished", icon: "/amenities/fully-furnished.png" },
  { name: "Futsal Court", icon: "/amenities/futsal-court.png" },
  { name: "Game Area", icon: "/amenities/game-area.png" },
  { name: "Garage Attached", icon: "/amenities/garage-attached.png" },
  { name: "Garbage Disposal", icon: "/amenities/garbage-disposal.png" },
  { name: "Gated Complex", icon: "/amenities/gated-complex.png" },
  { name: "Gazebo", icon: "/amenities/gazebo_1.png" },
  { name: "Generator Backup", icon: "/amenities/generator-backup.png" },
  { name: "Geyser", icon: "/amenities/geyser_1.png" },
  { name: "Golf Course", icon: "/amenities/golf-course.png" },
  { name: "Green Area", icon: "/amenities/green-area.png" },
  { name: "Guest Bedroom", icon: "/amenities/guest-bedroom.png" },
  { name: "Helipad", icon: "/amenities/helipad_1.png" },
  { name: "Helpers Quarter", icon: "/amenities/helpers-quarter.png" },
  { name: "High End Interior", icon: "/amenities/high-end-interior.png" },
  { name: "Hot Bath", icon: "/amenities/hot-bath.png" },
  { name: "Housekeeping", icon: "/amenities/housekeeping_1.png" },
  { name: "Indoor Games", icon: "/amenities/indoor-games.png" },
  { name: "Infinity Pool", icon: "/amenities/infinity-pool.png" },
  { name: "Intercom", icon: "/amenities/intercom_1.png" },
  { name: "Internal Amenities", icon: "/amenities/internal-amenities.png" },
  { name: "Italian Furniture", icon: "/amenities/italian-furniture.png" },
  { name: "Jacuzzi", icon: "/amenities/jacuzzi_1.png" },
  { name: "Kids Pool", icon: "/amenities/kids-pool.png" },
  { name: "Laundry", icon: "/amenities/laundry.png" },
  { name: "Lawn Tennis", icon: "/amenities/lawn-tennis.png" },
  { name: "LED Lights", icon: "/amenities/led-lights.png" },
  { name: "Library", icon: "/amenities/library_1.png" },
  { name: "Lounge Area", icon: "/amenities/lounge-area.png" },
  { name: "Media Room", icon: "/amenities/media-room.png" },
  { name: "Outdoor Gym", icon: "/amenities/outdoor-gym.png" },
  { name: "Party Deck", icon: "/amenities/party-deck.png" },
  { name: "Party Hall", icon: "/amenities/party-hall.png" },
  { name: "Party Lawn", icon: "/amenities/party-lawn.png" },
  { name: "Pathway", icon: "/amenities/pathway_1.png" },
  { name: "Pergola", icon: "/amenities/pergola_1.png" },
  { name: "Pet Park", icon: "/amenities/pet-park.png" },
  { name: "Pipe Gas", icon: "/amenities/pipe-gas.png" },
  { name: "Private Terrace", icon: "/amenities/private-terrace.png" },
  { name: "Property Management", icon: "/amenities/property-management.png" },
  { name: "Proximity to Beach", icon: "/amenities/proximity-to-beach.png" },
  { name: "Rain Water Harvesting", icon: "/amenities/rain-water-harvesting.png" },
  { name: "School", icon: "/amenities/school_1.png" },
  { name: "Seating Area", icon: "/amenities/seating-area.png" },
  { name: "Seminar Hall", icon: "/amenities/seminar-hall.png" },
  { name: "Senior Citizen Area", icon: "/amenities/senior-citizen-area.png" },
  { name: "Sewage Treatment Plant", icon: "/amenities/sewage-treatment-plant.png" },
  { name: "Shopping Plaza", icon: "/amenities/shopping-plaza.png" },
  { name: "Sit Out Area", icon: "/amenities/sit-out-area.png" },
  { name: "Skating Ring", icon: "/amenities/skating-ring.png" },
  { name: "Smart Home", icon: "/amenities/smart-home.png" },
  { name: "Smoke Detection", icon: "/amenities/smoke-detection.png" },
  { name: "Wide Road 50x50", icon: "/amenities/wide-road-50z50.png" },
  { name: "Society", icon: "/amenities/society.png" },
  { name: "Society Office", icon: "/amenities/society-office.png" },
  { name: "Stilt Parking", icon: "/amenities/stilt-parking.png" },
  { name: "Sun Deck", icon: "/amenities/sun-deck.png" },
  { name: "Supermarket", icon: "/amenities/supermarket.png" },
  { name: "Table Tennis", icon: "/amenities/table-tennis.png" },
  { name: "Temple", icon: "/amenities/temple.png" },
  { name: "Theme Wall", icon: "/amenities/theme-wall.png" },
  { name: "Transformer", icon: "/amenities/transformer_1.png" },
  { name: "Tree House", icon: "/amenities/tree-house.png" },
  { name: "Utilities", icon: "/amenities/utilities_1.png" },
  { name: "Vastu Compliance", icon: "/amenities/vastu-compliance.png" },
  { name: "Ventilation", icon: "/amenities/ventilation_1.png" },
  { name: "Video Door", icon: "/amenities/video-door.png" },
  { name: "VR Game", icon: "/amenities/vr-game.png" },
  { name: "Work From Home", icon: "/amenities/work-from-home.png" },
  { name: "Yoga Room", icon: "/amenities/yoga-room.png" },
  { name: "Zen Garden", icon: "/amenities/zen-garden.png" },
  { name: "Zip Line", icon: "/amenities/zip-line.png" }
];

const AmenitiesDropdown = ({ 
  selectedAmenities, 
  onAmenitiesChange 
}: {
  selectedAmenities: string[],
  onAmenitiesChange: (amenities: string[]) => void
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);
  
  const handleAmenityToggle = (amenity: string) => {
    const newAmenities = selectedAmenities.includes(amenity)
      ? selectedAmenities.filter(a => a !== amenity)
      : [...selectedAmenities, amenity];
    onAmenitiesChange(newAmenities);
  };

  const filteredAmenities = amenityOptions.filter(amenity =>
    amenity.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="amenities-dropdown" ref={dropdownRef}>
      <div 
        className="dropdown-toggle" 
        onClick={toggleDropdown}
      >
        <span>Select Amenities ({selectedAmenities.length})</span>
        <span className="dropdown-arrow">{isOpen ? '▲' : '▼'}</span>
      </div>
      
      {isOpen && (
        <div className="dropdown-menu">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search amenities..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="amenities-list">
            {filteredAmenities.map((amenity) => (
              <div 
                key={amenity.name}
                className={`amenity-item ${selectedAmenities.includes(amenity.name) ? 'selected' : ''}`}
                onClick={() => handleAmenityToggle(amenity.name)}
              >
                <img 
                  src={amenity.icon} 
                  alt={amenity.name} 
                  className="amenity-icon"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/amenities/default-icon.png';
                  }}
                />
                <span>{amenity.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

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
    const amenities = amenitiesInput.split(',').filter(item => item);
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
      const response = await axios.post('https://backend-ppt.onrender.com/api/properties', formData, {
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
              <label htmlFor="amenities">Amenities</label>
              <AmenitiesDropdown
                selectedAmenities={amenitiesInput.split(',').filter(item => item)}
                onAmenitiesChange={(selected) => setAmenitiesInput(selected.join(','))}
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

  /* Amenities dropdown styles */
  .amenities-dropdown {
    position: relative;
    width: 100%;
    z-index: 10;
  }

  .dropdown-toggle {
    padding: 0.75rem 1rem;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    background-color: #f8fafc;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 0.2s;
  }

  .dropdown-toggle:hover {
    border-color: #cbd5e0;
    background-color: #edf2f7;
  }

  .dropdown-arrow {
    margin-left: 8px;
    font-size: 0.8rem;
    color: #718096;
  }

  .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    max-height: 400px;
    overflow-y: auto;
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 100;
    margin-top: 4px;
    animation: fadeIn 0.2s ease-out;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .search-box {
    padding: 12px;
    border-bottom: 1px solid #e2e8f0;
    background-color: #f7fafc;
    position: sticky;
    top: 0;
    z-index: 5;
  }

  .search-input {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    font-size: 0.9rem;
    background-color: white;
    transition: border-color 0.2s;
  }

  .search-input:focus {
    outline: none;
    border-color: #4299e1;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
  }

  .amenities-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 8px;
    padding: 12px;
  }

  .amenity-item {
    display: flex;
    align-items: center;
    padding: 8px 12px;
    cursor: pointer;
    border-radius: 6px;
    transition: all 0.2s;
    font-size: 0.9rem;
  }

  .amenity-item:hover {
    background-color: #ebf8ff;
  }

  .amenity-item.selected {
    background-color: #bee3f8;
    font-weight: 500;
  }

  .amenity-icon {
    width: 20px;
    height: 20px;
    margin-right: 10px;
    object-fit: contain;
    flex-shrink: 0;
  }

  /* Responsive styles */
  @media (max-width: 768px) {
    .form-container {
      padding: 1.5rem;
      max-height: none;
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

    .amenities-list {
      grid-template-columns: 1fr;
    }

    .dropdown-menu {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 90%;
      max-height: 70vh;
    }
  }

  @media (max-width: 480px) {
    .form-container {
      padding: 1rem;
    }

    .form-title {
      font-size: 1.5rem;
    }

    .preview-image {
      width: 80px;
      height: 80px;
    }

    .preview-video {
      width: 200px;
      max-height: 120px;
    }
  }
`}</style>
</div>
  );
}
