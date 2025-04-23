'use client';

import { useState, useEffect, useRef } from 'react';
import styles from '../../CustomPropertyCss.module.css';
import Form from '@/components/Form';

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

interface CustomPropertyPageProps {
  property: {
    success: boolean;
    property: PropertyData;
  };
}

export default function CustomPropertyPage({ property }: CustomPropertyPageProps) {
  const [showForm, setShowForm] = useState(false);
  const [requestedSection, setRequestedSection] = useState<'video' | 'floorPlan' | null>(null);
  const [hasAccess, setHasAccess] = useState<{ video: boolean; floorPlan: boolean }>({ video: false, floorPlan: false });
  const [videoError, setVideoError] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [videoKey, setVideoKey] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const propertyData = property.success ? property.property : {
    _id: '',
    title: '',
    location: '',
    price: '',
    possessionDate: '',
    propertyImages: [],
    amenities: [],
    plans: [],
  };

  // Load saved access from localStorage
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('propertyAccess') || '{}');
      setHasAccess(saved);
    } catch (err) {
      console.error('Error parsing access flags:', err);
    }
  }, []);

  // Attempt autoplay when video unlocked
  useEffect(() => {
    if (hasAccess.video && videoRef.current) {
      setTimeout(() => {
        videoRef.current!.play().catch(err => console.warn('Autoplay prevented:', err));
      }, 300);
    }
  }, [hasAccess.video, videoKey]);

  const handleRequestAccess = (section: 'video' | 'floorPlan') => {
    setRequestedSection(section);
    setShowForm(true);
  };

  const handleFormSubmit = (success: boolean) => {
    if (success && requestedSection) {
      const updated = { ...hasAccess, [requestedSection]: true };
      setHasAccess(updated);
      localStorage.setItem('propertyAccess', JSON.stringify(updated));
      if (requestedSection === 'video') {
        setVideoKey(prev => prev + 1);
        setVideoError(false);
        setIsVideoLoading(true);
      }
    }
    setShowForm(false);
    setRequestedSection(null);
  };

  const handleVideoError = () => {
    setVideoError(true);
    setIsVideoLoading(false);
  };

  const handleVideoLoad = () => {
    setVideoError(false);
    setIsVideoLoading(false);
  };

  return (
    <div className={styles.mainContainer}>
      {/* Header */}
      <div className={styles.headerSection}>
        <h1 className={styles.propertyTitle}>{propertyData.title}</h1>
        {propertyData.propertyLabel && (
          <span className={styles.propertyLabel}>{propertyData.propertyLabel}</span>
        )}
      </div>

      {/* Image Gallery */}
      <div className={styles.imageGallery}>
        {propertyData.propertyImages.length > 0 ? (
          propertyData.propertyImages.map(img => (
            <img
              key={img._id || img.url}
              src={img.url}
              alt="Property"
              className={styles.galleryImage}
              onError={e => { (e.target as HTMLImageElement).src = '/placeholder.jpg'; }}
            />
          ))
        ) : (
          <div className={styles.noImages}>
            <img src="/placeholder.jpg" alt="No images" className={styles.galleryImage} />
            <p>No images available</p>
          </div>
        )}
      </div>

      {/* Details */}
      <div className={styles.detailsSection}>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Price:</span> ₹ {propertyData.price}
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Location:</span> {propertyData.location}
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Possession Date:</span> {propertyData.possessionDate}
        </div>
      </div>

      {/* Description */}
      {propertyData.description && (
        <div className={styles.descriptionSection}>
          <h2>Description</h2>
          <p>{propertyData.description}</p>
        </div>
      )}

      {/* Amenities */}
      {propertyData.amenities.length > 0 && (
        <div className={styles.amenitiesSection}>
          <h2>Amenities</h2>
          <ul className={styles.amenitiesList}>
            {propertyData.amenities.map((a, i) => <li key={i}>{a}</li>)}
          </ul>
        </div>
      )}

      {/* Plans */}
      {propertyData.plans.length > 0 && (
        <div className={styles.plansSection}>
          <h2>Plans</h2>
          <ul className={styles.plansList}>
            {propertyData.plans.map((p, i) => <li key={i}>{p}</li>)}
          </ul>
        </div>
      )}

      {/* Floor Plan */}
      <div className={styles.floorPlanSection}>
        <h2>Floor Plan</h2>
        {hasAccess.floorPlan ? (
          propertyData.floorPlan?.url ? (
            <img
              src={propertyData.floorPlan.url}
              alt="Floor Plan"
              className={styles.floorPlanImage}
            />
          ) : (
            <p>No floor plan available</p>
          )
        ) : propertyData.floorPlan?.url ? (
          <div
            className={styles.lockedPreviewContainer}
            onClick={() => handleRequestAccess('floorPlan')}
          >
            <img
              src={propertyData.floorPlan.url}
              alt="Locked Floor Plan"
              className={styles.previewImage}
            />
            <div className={styles.lockOverlay}>🔒 Click to unlock</div>
          </div>
        ) : (
          <p>No floor plan available</p>
        )}
      </div>

      {/* Video */}
      <div className={styles.videoSection}>
        <h2>Property Video</h2>
        {propertyData.propertyVideo?.url ? (
          hasAccess.video ? (
            <>
              {isVideoLoading && <p>Loading video...</p>}
              {videoError ? (
                <p>
                  Video failed. <a href={propertyData.propertyVideo.url}>View video</a>
                </p>
              ) : (
                <video
                  ref={videoRef}
                  key={`video-${videoKey}`}
                  controls
                  autoPlay
                  playsInline
                  className={styles.propertyVideo}
                  onError={handleVideoError}
                  onLoadedData={handleVideoLoad}
                >
                  <source
                    src={propertyData.propertyVideo.url}
                    type={propertyData.propertyVideo.mimetype || 'video/mp4'}
                  />
                  Your browser does not support the video tag.
                </video>
              )}
            </>
          ) : (
            <div
              className={styles.lockedPreviewContainer}
              onClick={() => handleRequestAccess('video')}
            >
              <video
                className={styles.previewVideo}
                muted
                playsInline
                preload="metadata"
              >
                <source
                  src={propertyData.propertyVideo.url}
                  type={propertyData.propertyVideo.mimetype || 'video/mp4'}
                />
              </video>
              <div className={styles.lockOverlay}>🔒 Click to unlock</div>
            </div>
          )
        ) : (
          <p>No video available</p>
        )}
      </div>

      {/* Access Request Form Modal */}
      {showForm && requestedSection && (
        <Form
          section={requestedSection}
          delay={0}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  );
}
