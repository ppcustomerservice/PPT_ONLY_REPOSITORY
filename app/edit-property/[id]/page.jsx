// Frontend: pages/edit-property/[id].tsx
'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import '../editProperty.css';


export default function EditProperty() {
    const router = useRouter();
    const params = useParams();
    const propertyId = params?.id;

  console.log(propertyId);

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

  useEffect(() => {
    if (propertyId) {
      axios.get(`http://localhost:8000/api/properties/listing/${propertyId}`).then(({ data }) => {
        setFormData({ ...data.property });
      });
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

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'propertyImages' ? files : files[0] }));
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
      } else {
        data.append(key, value);
      }
    });

    try {
      await axios.put(`http://localhost:8000/api/editProperty/${propertyId}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Property updated successfully');
      router.push('/edit-listing');
    } catch (err) {
      console.error(err);
      alert('Failed to update property');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" className="border p-2 w-full" />
      <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" className="border p-2 w-full" />
      <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" className="border p-2 w-full" />
      <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="border p-2 w-full" />

      <input type="date" name="possessionDate" value={formData.possessionDate?.split('T')[0]} onChange={handleChange} className="border p-2 w-full" />
      <input type="text" name="propertyLabel" value={formData.propertyLabel} onChange={handleChange} placeholder="Label" className="border p-2 w-full" />

      <div>
        <label>Amenities</label>
        {formData.amenities.map((item, i) => (
          <input key={i} type="text" value={item} onChange={(e) => handleArrayChange('amenities', i, e.target.value)} className="border p-2 w-full my-1" />
        ))}
        <button type="button" onClick={() => addArrayItem('amenities')} className="bg-blue-500 text-white px-2 py-1 mt-1">Add Amenity</button>
      </div>

      <div>
        <label>Plans</label>
        {formData.plans.map((item, i) => (
          <input key={i} type="text" value={item} onChange={(e) => handleArrayChange('plans', i, e.target.value)} className="border p-2 w-full my-1" />
        ))}
        <button type="button" onClick={() => addArrayItem('plans')} className="bg-blue-500 text-white px-2 py-1 mt-1">Add Plan</button>
      </div>

      <div>
        <label>Property Images</label>
        <input type="file" name="propertyImages" onChange={handleFileChange} multiple accept="image/*" className="block" />
      </div>

      <div>
        <label>Property Video</label>
        <input type="file" name="propertyVideo" onChange={handleFileChange} accept="video/*" className="block" />
      </div>

      <div>
        <label>Floor Plan</label>
        <input type="file" name="floorPlan" onChange={handleFileChange} accept="image/*,application/pdf" className="block" />
      </div>

      <button type="submit" className="bg-green-500 text-white px-4 py-2 mt-4">Update Property</button>
    </form>
  );
}
