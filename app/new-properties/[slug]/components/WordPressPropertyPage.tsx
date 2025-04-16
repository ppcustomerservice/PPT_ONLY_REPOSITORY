// // WordPressPropertyPage.tsx
// 'use client';
// import React from "react";
// import propData from "../prop.json";
// import NavBar from "@/components/Navbar";
// import SemiHeader from "./SemiHeader";
// import ImageGallery from "./ImageGallery";
// import Amenities from "./Amenities";
// //import YouTubeVideo from "./YouTubeVideo";
// import Location from "./Location";
// import FloorPlan from "./FloorPlan";


// export default async function WordPressPropertyPage({ slug }: { slug: string }) {
//   const fetchAllAmenities = async (postId: number) => {
//     let allAmenities: any[] = [];
//     let page = 1;
//     let totalPages = 1;

//     do {
//       const response = await fetch(
//         `https://www.propertyplateau.com/wp-json/wp/v2/property_features?post=${postId}&per_page=100&page=${page}`
//       );
//       const data = await response.json();
//       if (response.headers.has("X-WP-TotalPages")) {
//         totalPages = parseInt(response.headers.get("X-WP-TotalPages") || "1", 10);
//       }
//       allAmenities = [...allAmenities, ...data];
//       page++;
//     } while (page <= totalPages);

//     return allAmenities;
//   };

//   const response = await fetch(
//     `https://www.propertyplateau.com/wp-json/wp/v2/estate_property?slug=${slug}&_embed`,
//     { cache: "no-store" }
//   );
//   const propertyData = await response.json();

//   if (propertyData.length === 0) return <div>No property found</div>;

//   const property = propertyData[0];
//   const amenitiesData = await fetchAllAmenities(property.id);
//   const additionalDetails = propData.find((p) => p.ID === property.id);

//   const title = property.title.rendered;
//   const location = additionalDetails?.property_address || "Location N/A";
//   const price = additionalDetails?.property_price || "0.0";
//   const propertyLabel = additionalDetails?.property_label || "";
//   const combinedPrice = `${price} ${propertyLabel}`;
//   const possessionDate = additionalDetails?.property_date || "N/A";
//   const floorPlans = additionalDetails?.plans || [];
//   const description = property.content.rendered || "No description";

//   return (
//     <div>
//       <NavBar />
//       <SemiHeader title={title} subtitle="PROPERTY Plateau" location={location} price={combinedPrice} possessionDate={possessionDate} />
//       <ImageGallery propertyID={property.id} />
//       <Amenities amenities={amenitiesData} />
     
//       <Location propertyId={property.id} />
//       <FloorPlan plans={floorPlans} />
//       <Form propertyId={property.id} />
//     </div>
//   );
// }
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
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
    }>;
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
  if (!property) return <div className="p-4 text-red-500">WordPress property data missing</div>;

  const amenities = await fetchAmenities(property.id);
  const featuredImage = property._embedded?.['wp:featuredmedia']?.[0]?.source_url;

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
        {featuredImage && <ImageGallery images={[featuredImage]} />}
        
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