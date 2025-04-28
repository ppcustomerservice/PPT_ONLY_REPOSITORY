
'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import "./editinglist.css"

const PropertyList = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    // Fetch all properties from backend
    const fetchProperties = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/getlistingProperty');
        setProperties(response.data);
      } catch (error) {
        console.error("Failed to fetch properties", error);
      }
    };
    fetchProperties();
  }, []);

  return (
    <div className="property-list">
      <h1>Property Listings</h1>
      <ul>
        {properties.map(property => (
          <li key={property._id}>
            <div>
              <h2>{property.title}</h2>
              <p>{property.location}</p>
              <p>{property.price}</p>
              <p>{property.description}</p>
              {/* Link to edit page */}
              <Link href={`/edit-property/${property._id}`} className="text-blue-500 underline">Edit</Link>

            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PropertyList;
