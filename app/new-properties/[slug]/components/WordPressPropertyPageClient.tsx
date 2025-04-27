// WordPressPropertyPageClient.tsx (Client Component)
'use client';

import React, { useState } from 'react';
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

interface WordPressPropertyPageClientProps {
  property: WordPressProperty;
  amenities: any[];
}

const WordPressPropertyPageClient = ({
  property,
  amenities,
}: WordPressPropertyPageClientProps) => {
  const [formOpen, setFormOpen] = useState(true);

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
         {formOpen && <Form
            propertyId={property.id.toString()}
            onSubmit={(success) => {
                console.log('Form submitted:', success);
              if (success) {
                setFormOpen(false); // close form
              }
            }}
          />}
        </div>
      </div>
    </div>
  );
};

export default WordPressPropertyPageClient;
