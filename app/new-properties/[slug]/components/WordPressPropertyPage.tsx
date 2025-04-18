import React from 'react';
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
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  acf?: {
    property_address?: string;
    property_price?: string;
    property_label?: string;
    property_date?: string;
    plans?: {
      title: string;
      image: string;
    }[];
  };
}

async function fetchAmenities(postId: number) {
  try {
    const response = await fetch(
      `https://www.propertyplateau.com/wp-json/wp/v2/property_features?post=${postId}&per_page=100`
    );
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch amenities:', error);
    return [];
  }
}

export default async function WordPressPropertyPage({ 
  property 
}: { 
  property: WordPressProperty 
}) {
  if (!property) {
    return <div className="p-4 text-red-500">WordPress property data missing</div>;
  }

  const amenities = await fetchAmenities(property.id);

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

        <div className="my-8">
          <Description content={property.content.rendered} />
        </div>

        <div className="my-8">
          <Amenities amenities={amenities} />
        </div>

        <div className="my-8">
          <Location propertyId={property.id.toString()} />
        </div>

        {property.acf?.plans?.length > 0 && (
          <div className="my-8">
            <FloorPlan plans={property.acf.plans} />
          </div>
        )}

        <div className="my-8">
          <Form propertyId={property.id.toString()} />
        </div>
      </div>
    </div>
  );
}
