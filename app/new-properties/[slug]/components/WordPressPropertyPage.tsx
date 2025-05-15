'use client';
import React, { useState, useEffect } from 'react';
import NavBar from '@/components/Navbar';
import SemiHeader from './SemiHeader';
import ImageGallery from './ImageGallery';
import Description from './Description';
import Amenities from './Amenities';
import Location from './Location';
import FloorPlan from './FloorPlan';
import Form from '@/components/Form';

export default function WordPressPropertyPage({ property }) {
  const [formOpen, setFormOpen] = useState(false);
  const [amenities, setAmenities] = useState([]);

  useEffect(() => {
    if (property?.id) {
      fetch(`https://www.propertyplateau.com/wp-json/wp/v2/property_features?post=${property.id}&per_page=100`)
        .then((res) => res.json())
        .then((data) => setAmenities(data))
        .catch((error) => console.error('Failed to fetch amenities:', error));
    }
  }, [property]);

  if (!property) {
    return <div className="p-4 text-red-500">WordPress property data missing</div>;
  }

  return (
    <div className="property-detail">
      <NavBar />

      <SemiHeader
        title={property.title.rendered}
        subtitle="PROPERTY Plateau"
        location={property.acf?.property_address || 'Location not specified'}
        price={`${property.acf?.property_price || ''} ${property.acf?.property_label || ''}`.trim()}
        possessionDate={property.acf?.property_date || 'N/A'}
      />

      <div className="container mx-auto px-4 py-8">
        <ImageGallery propertyID={property.id} />
        <div className="my-8"><Description content={property.content.rendered} /></div>
        <div className="my-8"><Amenities amenities={amenities} /></div>
        <div className="my-8"><Location propertyId={property.id.toString()} /></div>

        {property.acf?.plans?.length > 0 && (
          <div className="my-8"><FloorPlan plans={property.acf.plans} /></div>
        )}

        <div className="my-8">
        <Form
  section="property"
  onSubmit={(success: boolean) => {
    if (!success) return; // don't close on failure
    setFormOpen(false);   // close on submit
  }}
  onClose={() => setFormOpen(false)} // close on ✕
  delay={0} // optional: show form immediately
/>



        </div>
      </div>
    </div>
  );
}
