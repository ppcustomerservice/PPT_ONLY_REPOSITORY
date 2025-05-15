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

interface WordPressProperty {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  acf?: {
    property_address?: string;
    property_full_address?: string;
    property_price?: string;
    property_label?: string;
    property_date?: string;
    property_location?: { // For Google Maps
      address?: string;
      lat?: string;
      lng?: string;
    };
    plans?: {
      title: string;
      image: string;
      description?: string;
    }[];
    featured_image?: string;
    gallery_images?: string[];
  };
}

interface PropertyDetailProps {
  property: WordPressProperty;
  initialAmenities?: any[]; // For server-side pre-fetching
}

const PropertyDetail: React.FC<PropertyDetailProps> = ({ 
  property, 
  initialAmenities = [] 
}) => {
  const [amenities, setAmenities] = useState(initialAmenities);
  const [formOpen, setFormOpen] = useState(true);

  // Fetch amenities if not provided initially
  useEffect(() => {
    if (property?.id && initialAmenities.length === 0) {
      const fetchAmenities = async () => {
        try {
          const response = await fetch(
            `https://www.propertyplateau.com/wp-json/wp/v2/property_features?post=${property.id}&per_page=100`
          );
          const data = await response.json();
          setAmenities(data);
        } catch (error) {
          console.error('Failed to fetch amenities:', error);
        }
      };
      fetchAmenities();
    }
  }, [property?.id, initialAmenities]);

  if (!property) {
    return <div className="p-4 text-red-500">Property data not available</div>;
  }

  // Extract property details
  const {
    title,
    content,
    acf = {}
  } = property;

  const address = acf.property_full_address || acf.property_address || 'Location not specified';
  const price = `${acf.property_price || ''} ${acf.property_label || ''}`.trim();
  const possessionDate = acf.property_date || 'N/A';

  return (
    <div className="bg-white text-gray-800 min-h-screen">
      <NavBar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Property Header */}
        <SemiHeader
          title={title.rendered}
          subtitle="PROPERTY Plateau"
          location={address}
          price={price}
          possessionDate={possessionDate}
        />

        {/* Main Content */}
        <div className="space-y-12">
          {/* Image Gallery */}
          <section>
            <ImageGallery 
              propertyID={property.id} 
              featuredImage={acf.featured_image}
              galleryImages={acf.gallery_images}
            />
          </section>

          {/* Basic Info */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-50 p-6 rounded-lg">
            <div className="space-y-1">
              <h3 className="font-semibold text-gray-600">Location</h3>
              <p className="text-lg">{address}</p>
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold text-gray-600">Price</h3>
              <p className="text-lg">{price || 'Price on request'}</p>
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold text-gray-600">Possession</h3>
              <p className="text-lg">{possessionDate}</p>
            </div>
          </section>

          {/* Description */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Property Details</h2>
            <Description content={content.rendered} />
          </section>

          {/* Amenities */}
          {amenities.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-4">Amenities</h2>
              <Amenities amenities={amenities} />
            </section>
          )}

          {/* Floor Plans */}
          {acf.plans?.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-4">Floor Plans</h2>
              <FloorPlan plans={acf.plans} />
            </section>
          )}

          {/* Location Map */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Location</h2>
            <Location 
              propertyId={property.id.toString()}
              address={address}
              lat={acf.property_location?.lat}
              lng={acf.property_location?.lng}
            />
          </section>

          {/* Contact Form */}
          {formOpen && (
            <section className="bg-gray-50 p-6 rounded-lg">
              <Form
                section="property"
                propertyId={property.id.toString()}
                propertyTitle={title.rendered}
                onSubmit={(success) => success && setFormOpen(false)}
                onClose={() => setFormOpen(false)}
              />
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;