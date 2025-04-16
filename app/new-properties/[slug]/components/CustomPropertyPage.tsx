// // CustomPropertyPage.tsx
// 'use client';
// import React from "react";
// import propData from "../prop.json";
// import NavBar from "@/components/Navbar";
// import SemiHeader from "./SemiHeader";  // Changed from "./components/SemiHeader"
// import ImageGallery from "./ImageGallery";  // Changed from "./components/ImageGallery"
// import Amenities from "./Amenities";  // Changed from "./components/Amenities"
// //import YouTubeVideo from "./YouTubeVideo";  // Changed from "./components/YouTubeVideo"
// //import YouTubeVideo from "./YouTubeVideo";
// import Location from "./Location";
// import FloorPlan from "./FloorPlan";
// import Form from "@/components/Form";

// export default async function CustomPropertyPage({ slug }: { slug: string }) {
//   const response = await fetch(`https://localhost:8000/properties?slug=${slug}`, {
//     cache: "no-store",
//   });

//   const data = await response.json();
//   if (!data || !data.title) return <div>New Property not found</div>;

//   return (
//     <div>
//       <NavBar />
//       <SemiHeader
//         title={data.title}
//         subtitle="PROPERTY Plateau"
//         location={data.location}
//         price={data.price}
//         possessionDate={data.possessionDate}
//       />
//       <ImageGallery imageUrls={data.propertyImages} />
//       <Amenities amenities={data.amenities} />
     
//       <Location />
//       <FloorPlan plans={data.plans} />
//       <Form propertyId={data._id} />
//     </div>
//   );
// }

'use client';

import { log } from 'console';
import styles from '../../NewPropertiesDetails.module.css';


interface CustomPropertyPageProps {
  property: {
    _id: string;
    title: string;
    location: string;
    price: string;
    description?: string;
    possessionDate: string;
    propertyImages: Array<{
      url: string;
      filename?: string;
    }>;
    propertyVideo?: {
      url: string;
    };
    amenities: string[];
    plans: string[];
  };
}

export default function CustomPropertyPage({ property }: CustomPropertyPageProps) {
  console.log("ninini");
  
  return (
    <div className={styles.mainContainer}>
      <div className={styles.propertyListing}>
        {/* Header Section */}
        <div className={styles.propertyHeader}>
          <h1 className={styles.propertyTitle}>{property.title}</h1>
          <div className={styles.priceLocation}>
            <span className={styles.price}>₹ {property.price}</span>
            <span className={styles.location}>{property.location}</span>
          </div>
        </div>

        {/* Image Gallery */}
        <div className={styles.propertyGrid}>
          {property.propertyImages.length > 0 ? (
            property.propertyImages.map((image, index) => (
              <div key={index} className={styles.propertyCard}>
                <div className={styles.cardImage}>
                  <img
                    src={image.url}
                    alt={`${property.title} - Image ${index + 1}`}
                    className={styles.image}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/placeholder.jpg';
                    }}
                  />
                </div>
              </div>
            ))
          ) : (
            <div className={styles.noImages}>No images available</div>
          )}
        </div>

        {/* Property Details */}
        <div className={styles.propertyDetails}>
          <div className={styles.detailSection}>
            <h2>Property Details</h2>
            <div className={styles.detailGrid}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Location:</span>
                <span>{property.location}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Possession Date:</span>
                <span>{property.possessionDate}</span>
              </div>
            </div>
          </div>

          {/* Amenities */}
          {property.amenities.length > 0 && (
            <div className={styles.detailSection}>
              <h2>Amenities</h2>
              <div className={styles.amenitiesGrid}>
                {property.amenities.map((amenity, index) => (
                  <span key={index} className={styles.amenity}>
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Plans */}
          {property.plans.length > 0 && (
            <div className={styles.detailSection}>
              <h2>Plans</h2>
              <div className={styles.plansGrid}>
                {property.plans.map((plan, index) => (
                  <span key={index} className={styles.plan}>
                    {plan}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Contact Section */}
        <div className={styles.contactSection}>
          <button className={styles.contactButton}>Contact Owner</button>
        </div>
      </div>
    </div>
  );
}
