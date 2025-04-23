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

import { useState, useEffect, useRef } from 'react';
import styles from '../../CustomPropertyCss.module.css';
import Form from '../../../../components/Form';

interface PropertyMedia {
  url: string;
  filename?: string;
  originalname?: string;
  mimetype?: string;
  size?: number;
  _id?: string;
}

interface PropertyData {
  _id: string;
  title: string;
  location: string;
  price: string;
  description?: string;
  possessionDate: string;
  propertyLabel?: string;
  propertyImages: PropertyMedia[];
  propertyVideo?: PropertyMedia;
  floorPlan?: PropertyMedia;
  amenities: string[];
  plans: string[];
  slug: string;
  createdAt: string;
  __v?: number;
}

export default function CustomPropertyPage({ property }: { property: { success: boolean; property: PropertyData } }) {
  const [videoError, setVideoError] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [hasAccess, setHasAccess] = useState<{ video: boolean; floorPlan: boolean }>({ video: false, floorPlan: false });
  const [requestedSection, setRequestedSection] = useState<'video' | 'floorPlan' | null>(null);
  const [videoKey, setVideoKey] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const propertyData = property?.property || {
    title: '',
    location: '',
    price: '',
    possessionDate: '',
    propertyImages: [],
    amenities: [],
    plans: []
  };

  useEffect(() => {
    try {
      const savedAccess = JSON.parse(localStorage.getItem('propertyAccess') || '{}');
      setHasAccess(savedAccess);
    } catch (e) {
      console.error('Failed to parse saved access from localStorage:', e);
    }
  }, []);

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const target = e.target as HTMLVideoElement;
    console.error('Video Error:', target.error);
    setVideoError(true);
    setIsVideoLoading(false);
  };

  const handleVideoLoad = () => {
    setVideoError(false);
    setIsVideoLoading(false);
  };

  const handleRequestAccess = (section: 'video' | 'floorPlan') => {
    setRequestedSection(section);
    setShowForm(true);
  };

  const handleFormSubmit = (success: boolean) => {
    console.log(`Form submitted for ${requestedSection}, success:`, success);
    if (success && requestedSection) {
      const newAccess = { ...hasAccess, [requestedSection]: true };
      setHasAccess(newAccess);
      localStorage.setItem('propertyAccess', JSON.stringify(newAccess));
      setVideoKey((prev) => prev + 1);
      setIsVideoLoading(true);
      setVideoError(false);
      setTimeout(() => {
        setShowForm(false);
        setRequestedSection(null);
      }, 300);
    } else {
      setShowForm(false);
      setRequestedSection(null);
    }
  };

  useEffect(() => {
    if (hasAccess.video && videoRef.current) {
      const video = videoRef.current;
      setTimeout(() => {
        video.play().catch((err) => {
          console.warn('Manual video play failed due to autoplay policy:', err);
        });
      }, 300);
    }
  }, [hasAccess.video, videoKey]);

  return (
    <div className={styles.mainContainer}>
      {/* Header */}
      <div className={styles.headerSection}>
        <h1 className={styles.propertyTitle}>{propertyData.title}</h1>
        {propertyData.propertyLabel && <span className={styles.propertyLabel}>{propertyData.propertyLabel}</span>}
      </div>

      {/* Image Gallery */}
      <div className={styles.imageGallery}>
        {propertyData.propertyImages?.length > 0 ? (
          propertyData.propertyImages.map((image) => (
            <img
              key={image._id || image.url}
              src={image.url}
              alt="Property Image"
              className={styles.galleryImage}
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/placeholder.jpg';
              }}
            />
          ))
        ) : (
          <div className={styles.noImages}>
            <img src="/placeholder.jpg" alt="No Images" className={styles.galleryImage} />
            <p>No images available</p>
          </div>
        )}
      </div>

      {/* Details */}
      <div className={styles.detailsSection}>
        <div className={styles.detailItem}><span className={styles.detailLabel}>Price:</span> ₹ {propertyData.price}</div>
        <div className={styles.detailItem}><span className={styles.detailLabel}>Location:</span> {propertyData.location}</div>
        <div className={styles.detailItem}><span className={styles.detailLabel}>Possession Date:</span> {propertyData.possessionDate}</div>
      </div>

      {/* Description */}
      {propertyData.description && (
        <div className={styles.descriptionSection}>
          <h2>Description</h2>
          <p>{propertyData.description}</p>
        </div>
      )}

      {/* Amenities */}
      {propertyData.amenities?.length > 0 && (
        <div className={styles.amenitiesSection}>
          <h2>Amenities</h2>
          <ul>{propertyData.amenities.map((item, i) => <li key={i}>{item}</li>)}</ul>
        </div>
      )}

      {/* Plans */}
      {propertyData.plans?.length > 0 && (
        <div className={styles.plansSection}>
          <h2>Plans</h2>
          <ul>{propertyData.plans.map((plan, i) => <li key={i}>{plan}</li>)}</ul>
        </div>
      )}

      {/* Floor Plan */}
      <div className={styles.floorPlanSection}>
        <h2>Floor Plan</h2>
        {hasAccess.floorPlan ? (
          propertyData.floorPlan?.url ? (
            <img src={propertyData.floorPlan.url} className={styles.floorPlanImage} alt="Floor Plan" />
          ) : <p>No floor plan available</p>
        ) : propertyData.floorPlan?.url ? (
          <div className={styles.lockedPreviewContainer} onClick={() => handleRequestAccess('floorPlan')}>
            <img src={propertyData.floorPlan.url} className={styles.previewImage} alt="Locked Floor Plan" />
            <div className={styles.lockOverlay}>🔒 Click to unlock</div>
          </div>
        ) : <p>No floor plan available</p>}
      </div>

      {/* Video */}
      <div className={styles.videoSection}>
        <h2>Property Video</h2>
        {propertyData.propertyVideo?.url ? (
          hasAccess.video ? (
            <>
              {isVideoLoading && <p>Loading video...</p>}
              {videoError ? (
                <p>Video failed. <a href={propertyData.propertyVideo.url}>View video</a></p>
              ) : (
                <video
                  ref={videoRef}
                  key={`video-${videoKey}`}
                  controls
                  autoPlay
                  playsInline
                  muted={false}
                  className={styles.propertyVideo}
                  onError={handleVideoError}
                  onCanPlay={handleVideoLoad}
                  onLoadedData={handleVideoLoad}
                >
                  <source src={propertyData.propertyVideo.url} type={propertyData.propertyVideo.mimetype || 'video/mp4'} />
                  Your browser does not support the video tag.
                </video>
              )}
            </>
          ) : (
            <div
              key="locked-video-preview"
              className={styles.lockedPreviewContainer}
              onClick={() => handleRequestAccess('video')}
              style={{ cursor: 'pointer' }}
            >
              <video className={styles.previewVideo} muted playsInline preload="metadata">
                <source src={propertyData.propertyVideo.url} type={propertyData.propertyVideo.mimetype || 'video/mp4'} />
              </video>
              <div className={styles.lockOverlay}>🔒 Click to unlock</div>
            </div>
          )
        ) : (
          <p>No video available</p>
        )}
      </div>

      {/* Form Modal */}
      {showForm && requestedSection && (
        <div className={styles.formModal}>
          <Form section={requestedSection} onSubmit={handleFormSubmit} />
        </div>
      )}
    </div>
  );
}
