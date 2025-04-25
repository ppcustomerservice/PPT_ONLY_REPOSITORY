'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { FiEdit, FiTrash2, FiDollarSign, FiMapPin, FiHome } from 'react-icons/fi';
import "./editinglist.css"

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/getlistingProperty');
        setProperties(response.data);
      } catch (error) {
        console.error("Failed to fetch properties", error);
        setError("Failed to load properties. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProperties();
  }, []);

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this property?")) {
      try {
        await axios.delete(`http://localhost:8000/api/deleteProperty/${id}`);
        setProperties(properties.filter(property => property._id !== id));
      } catch (error) {
        console.error("Failed to delete property", error);
        alert("Failed to delete property");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center">
          <FiHome className="mr-2" /> Property Listings
        </h1>
        <Link href="/add-property" legacyBehavior>
          <a className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
            Add New Property
          </a>
        </Link>
      </div>

      {properties.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No properties found. Add a new property to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map(property => (
            <div key={property._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              {/* Robust image handling with fallback */}
              <div className="h-48 overflow-hidden bg-gray-100">
              <img 
  src={
    property.propertyImages?.[0]?.url 
      || (typeof property.propertyImages?.[0] === 'string' ? property.propertyImages[0] : '/placeholder-property.jpg')
  }
  alt={property.title || 'Property image'}
  className="w-full h-full object-cover"
  onError={(e) => {
    e.target.src = '/placeholder-property.jpg';
  }}
/>
              </div>
              
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {property.title || 'Untitled Property'}
                </h2>
                
                <div className="flex items-center text-gray-600 mb-2">
                  <FiMapPin className="mr-2" />
                  <span>{property.location || 'Location not specified'}</span>
                </div>
                
                <div className="flex items-center text-gray-800 font-medium mb-4">
                  <FiDollarSign className="mr-1" />
                  <span>
                    {property.price 
                      ? property.price.toLocaleString() 
                      : 'Price not available'}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {property.description || 'No description provided'}
                </p>
                
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <Link href={`/edit-property/${property._id}`} legacyBehavior>
                    <a className="text-blue-600 hover:text-blue-800 flex items-center">
                      <FiEdit className="mr-1" /> Edit
                    </a>
                  </Link>
                  
                  <button 
                    onClick={() => handleDelete(property._id)}
                    className="text-red-500 hover:text-red-700 flex items-center"
                  >
                    <FiTrash2 className="mr-1" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyList;