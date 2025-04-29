// // Frontend: pages/edit-property/[id].tsx
// 'use client';

// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams, useRouter, useSearchParams } from 'next/navigation';
// import '../editProperty.css';


// export default function EditProperty() {
//     const router = useRouter();
//     const params = useParams();
//     const propertyId = params?.id;

//   console.log(propertyId);

//   const [formData, setFormData] = useState({
//     title: '',
//     location: '',
//     price: '',
//     description: '',
//     possessionDate: '',
//     propertyLabel: '',
//     amenities: [],
//     plans: [],
//     propertyImages: [],
//     propertyVideo: null,
//     floorPlan: null
//   });

//   useEffect(() => {
//     if (propertyId) {
//       axios.get(`http://localhost:8000/api/properties/listing/${propertyId}`).then(({ data }) => {
//         setFormData({ ...data.property });
//       });
//     }
//   }, [propertyId]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleArrayChange = (field, index, value) => {
//     const updatedArray = [...formData[field]];
//     updatedArray[index] = value;
//     setFormData(prev => ({ ...prev, [field]: updatedArray }));
//   };

//   const addArrayItem = (field) => {
//     setFormData(prev => ({ ...prev, [field]: [...prev[field], ''] }));
//   };

//   const handleFileChange = (e) => {
//     const { name, files } = e.target;
//     setFormData(prev => ({ ...prev, [name]: name === 'propertyImages' ? files : files[0] }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = new FormData();

//     Object.entries(formData).forEach(([key, value]) => {
//       if (Array.isArray(value)) {
//         data.append(key, JSON.stringify(value));
//       } else if (key === 'propertyImages' && value instanceof FileList) {
//         for (let i = 0; i < value.length; i++) {
//           data.append('propertyImages', value[i]);
//         }
//       } else if (value instanceof File) {
//         data.append(key, value);
//       } else {
//         data.append(key, value);
//       }
//     });

//     try {
//       await axios.put(`http://localhost:8000/api/editProperty/${propertyId}`, data, {
//         headers: { 'Content-Type': 'multipart/form-data' }
//       });
//       alert('Property updated successfully');
//       router.push('/edit-listing');
//     } catch (err) {
//       console.error(err);
//       alert('Failed to update property');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4 p-4">
//       <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" className="border p-2 w-full" />
//       <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" className="border p-2 w-full" />
//       <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" className="border p-2 w-full" />
//       <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="border p-2 w-full" />

//       <input type="date" name="possessionDate" value={formData.possessionDate?.split('T')[0]} onChange={handleChange} className="border p-2 w-full" />
//       <input type="text" name="propertyLabel" value={formData.propertyLabel} onChange={handleChange} placeholder="Label" className="border p-2 w-full" />

//       <div>
//         <label>Amenities</label>
//         {formData.amenities.map((item, i) => (
//           <input key={i} type="text" value={item} onChange={(e) => handleArrayChange('amenities', i, e.target.value)} className="border p-2 w-full my-1" />
//         ))}
//         <button type="button" onClick={() => addArrayItem('amenities')} className="bg-blue-500 text-white px-2 py-1 mt-1">Add Amenity</button>
//       </div>

//       <div>
//         <label>Plans</label>
//         {formData.plans.map((item, i) => (
//           <input key={i} type="text" value={item} onChange={(e) => handleArrayChange('plans', i, e.target.value)} className="border p-2 w-full my-1" />
//         ))}
//         <button type="button" onClick={() => addArrayItem('plans')} className="bg-blue-500 text-white px-2 py-1 mt-1">Add Plan</button>
//       </div>

//       <div>
//         <label>Property Images</label>
//         <input type="file" name="propertyImages" onChange={handleFileChange} multiple accept="image/*" className="block" />
//       </div>

//       <div>
//         <label>Property Video</label>
//         <input type="file" name="propertyVideo" onChange={handleFileChange} accept="video/*" className="block" />
//       </div>

//       <div>
//         <label>Floor Plan</label>
//         <input type="file" name="floorPlan" onChange={handleFileChange} accept="image/*,application/pdf" className="block" />
//       </div>

//       <button type="submit" className="bg-green-500 text-white px-4 py-2 mt-4">Update Property</button>
//     </form>
//   );
// }





'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { FiPlus, FiTrash2, FiUpload, FiSave } from 'react-icons/fi';
import "../editProperty.css";

export default function EditProperty() {
  const router = useRouter();
  const params = useParams();
  const propertyId = params?.id;

  const [formData, setFormData] = useState({
    title: '',
    location: '',
    price: '',
    description: '',
    possessionDate: '',
    propertyLabel: '',
    amenities: [],
    plans: [],
    propertyImages: [],
    propertyVideo: null,
    floorPlan: null
  });

  const [isLoading, setIsLoading] = useState(true);
  const [imagePreviews, setImagePreviews] = useState([]);

 // Updated image preview handling in the useEffect
useEffect(() => {
  if (propertyId) {
    const fetchProperty = async () => {
      try {
        const { data } = await axios.get(`https://backend-server-1smb.onrender.com/api/properties/listing/${propertyId}`);
        setFormData({ ...data.property });
        
        // Safely handle image previews
        if (data.property.propertyImages?.length) {
          const previews = data.property.propertyImages
            .filter(img => typeof img === 'string') // Ensure it's a string
            .map(img => ({
              url: img.startsWith('http') ? img : `https://backend-server-1smb.onrender.com/${img}`,
              name: img.split('/').pop() || 'property-image'
            }));
          setImagePreviews(previews);
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch property:', error);
        setIsLoading(false);
      }
    };
    fetchProperty();
  }
}, [propertyId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (field, index, value) => {
    const updatedArray = [...formData[field]];
    updatedArray[index] = value;
    setFormData(prev => ({ ...prev, [field]: updatedArray }));
  };

  const addArrayItem = (field) => {
    setFormData(prev => ({ ...prev, [field]: [...prev[field], ''] }));
  };

  const removeArrayItem = (field, index) => {
    const filteredArray = formData[field].filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, [field]: filteredArray }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    
    if (name === 'propertyImages') {
      // Create previews for new images
      const newPreviews = Array.from(files).map(file => ({
        url: URL.createObjectURL(file),
        name: file.name
      }));
      setImagePreviews(prev => [...prev, ...newPreviews]);
    }
    
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === 'propertyImages' ? files : files[0] 
    }));
  };

  const removeImagePreview = (index) => {
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        data.append(key, JSON.stringify(value));
      } else if (key === 'propertyImages' && value instanceof FileList) {
        for (let i = 0; i < value.length; i++) {
          data.append('propertyImages', value[i]);
        }
      } else if (value instanceof File) {
        data.append(key, value);
      } else if (value !== null) {
        data.append(key, value);
      }
    });

    try {
      await axios.put(`https://backend-server-1smb.onrender.com/api/editProperty/${propertyId}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Property updated successfully');
      router.push('/edit-listing');
    } catch (err) {
      console.error(err);
      alert('Failed to update property');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Property Listing</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">Basic Information</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>
          
          {/* Property Details */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">Property Details</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Possession Date</label>
              <input
                type="date"
                name="possessionDate"
                value={formData.possessionDate?.split('T')[0]}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Property Label</label>
              <input
                type="text"
                name="propertyLabel"
                value={formData.propertyLabel}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Premium, Luxury"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>
          </div>
        </div>
        
        {/* Amenities Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-700">Amenities</h2>
            <button
              type="button"
              onClick={() => addArrayItem('amenities')}
              className="flex items-center text-sm bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700"
            >
              <FiPlus className="mr-1" /> Add Amenity
            </button>
          </div>
          
          <div className="space-y-2">
            {formData.amenities.map((item, i) => (
              <div key={i} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleArrayChange('amenities', i, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Swimming Pool, Gym"
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem('amenities', i)}
                  className="p-2 text-red-500 hover:text-red-700"
                >
                  <FiTrash2 />
                </button>
              </div>
            ))}
          </div>
        </div>
        
        {/* Plans Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-700">Plans</h2>
            <button
              type="button"
              onClick={() => addArrayItem('plans')}
              className="flex items-center text-sm bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700"
            >
              <FiPlus className="mr-1" /> Add Plan
            </button>
          </div>
          
          <div className="space-y-2">
            {formData.plans.map((item, i) => (
              <div key={i} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleArrayChange('plans', i, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 2BHK, 1200 sqft"
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem('plans', i)}
                  className="p-2 text-red-500 hover:text-red-700"
                >
                  <FiTrash2 />
                </button>
              </div>
            ))}
          </div>
        </div>
        
        {/* Media Uploads */}
        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">Media Uploads</h2>
          
          {/* Property Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Property Images</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative group">
                  <img 
                    src={preview.url} 
                    alt={`Preview ${index}`}
                    className="w-full h-32 object-cover rounded-md border border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={() => removeImagePreview(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <FiTrash2 size={14} />
                  </button>
                  <div className="text-xs text-gray-500 truncate mt-1">{preview.name}</div>
                </div>
              ))}
            </div>
            <label className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500">
              <FiUpload className="w-8 h-8 text-gray-400 mb-2" />
              <span className="text-sm text-gray-600">Click to upload or drag and drop</span>
              <input 
                type="file" 
                name="propertyImages" 
                onChange={handleFileChange} 
                multiple 
                accept="image/*" 
                className="hidden" 
              />
            </label>
          </div>
          
          {/* Property Video */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Property Video</label>
            <div className="flex items-center space-x-4">
              {formData.propertyVideo ? (
                <div className="flex items-center">
                  <span className="text-sm text-gray-600">
                    {formData.propertyVideo.name || 'Video file selected'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, propertyVideo: null }))}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500">
                  <FiUpload className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-600">Upload Video (MP4, MOV)</span>
                  <input 
                    type="file" 
                    name="propertyVideo" 
                    onChange={handleFileChange} 
                    accept="video/*" 
                    className="hidden" 
                  />
                </label>
              )}
            </div>
          </div>
          
          {/* Floor Plan */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Floor Plan</label>
            <div className="flex items-center space-x-4">
              {formData.floorPlan ? (
                <div className="flex items-center">
                  <span className="text-sm text-gray-600">
                    {formData.floorPlan.name || 'Floor plan file selected'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, floorPlan: null }))}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500">
                  <FiUpload className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-600">Upload Floor Plan (PDF or Image)</span>
                  <input 
                    type="file" 
                    name="floorPlan" 
                    onChange={handleFileChange} 
                    accept="image/*,application/pdf" 
                    className="hidden" 
                  />
                </label>
              )}
            </div>
          </div>
        </div>
        
        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="flex items-center px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            <FiSave className="mr-2" />
            Update Property
          </button>
        </div>
      </form>
    </div>
  );
}