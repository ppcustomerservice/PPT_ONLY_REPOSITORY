'use client';

import { useState, useEffect, useRef } from 'react';
import styles from '../../CustomPropertyCss.module.css';
import Form from '@/components/Form';

// --- ADD AMENITIES ICONS MAP ---
const amenitiesIcons: Record<string, string> = {
  "24X7": "/amenities/24x7.png",
  "Grand Entrance Gate": "/amenities/grand-entrance-gate.png",
  "Convenience Stores": "/amenities/convenience-stores.png",
  "Rooftop Sky Lounge": "/amenities/rooftop-sky-lounge.png",
  "Sky Deck": "/amenities/sky-deck.png",
  "Reflexology Park Deck": "/amenities/reflexology-park-deck.png",
  "Cabana Seating Park Deck": "/amenities/cabana-seating-park-deck.png",
  "Mini Golf Seating Park Deck": "/amenities/mini-golf-seating-park-deck.png",
  "Football": "/amenities/football_1.png",
  "Steam Room": "/amenities/steam-room.png",
  "Store": "/amenities/store.png",
  "Amphitheater": "/amenities/amphitheater_1.png",
  "Solar Water Heater": "/amenities/solar-water-heater.png",
  "Maintainence Service": "/amenities/maintainence-service.png",
  "Sauna": "/amenities/sauna_1.png",
  "Open Air Gym": "/amenities/open-air-gym.png",
  "Co Working Space": "/amenities/co-working-space.png",
  "Conference Room": "/amenities/conference-room.png",
  "Meditation Zone": "/amenities/meditation-zone.png",
  "Paved Compound": "/amenities/paved-compound.png",
  "Pool Table": "/amenities/pool-table.png",
  "Theater": "/amenities/theater_1.png",
  "Concierge Service": "/amenities/concierge-service.png",
  "Rent Management Service": "/amenities/rent-management-service.png",
  "House Keeping": "/amenities/house-keeping.png",
  "Snooker Table": "/amenities/snooker-table.png",
  "Star Gazing Telescope": "/amenities/star-gazing-telescope.png",
  "Open Space": "/amenities/open-space.png",
  "Waste Mgt": "/amenities/waste-mgt.png",
  "Fire Protection System": "/amenities/fire-protection-system.png",
  "Gated Community": "/amenities/gated-community.png",
  "Bus Shelter": "/amenities/bus-shelter.png",
  "Community Hall": "/amenities/community-hall.png",
  "Squash Court": "/amenities/squash-court.png",
  "Spa": "/amenities/spa_1.png",
  "Restaurant": "/amenities/restaurant_1.png",
  "Fire-Fighting Systems": "/amenities/fire-fighting-systems.png",
  "Internal Street Lights": "/amenities/internal-street-lights.png",
  "24x7 Water": "/amenities/24x7-water.png",
  "Acupressure Park": "/amenities/acupressure-park.png",
  "Accupressure Patchway": "/amenities/accupressure-patchway.png",
  "Aerobics Center": "/amenities/aerobics-center.png",
  "AC": "/amenities/ac_1.png",
  "Automatic Gate": "/amenities/automatic-gate.png",
  "Badminton": "/amenities/badminton_1.png",
  "Banquet Hall": "/amenities/banquet-hall.png",
  "BBQ": "/amenities/bbq_1.png",
  "CCTV": "/amenities/cctv_1.png",
  "Cricket": "/amenities/cricket_1.png",
  "Elevator": "/amenities/elevator_1.png",
  "Basketball": "/amenities/basketball_1.png",
  "Car Parking": "/amenities/car-parking.png",
  "Clubhouse": "/amenities/clubhouse_1.png",
  "Kids Play": "/amenities/kids-play.png",
  "Swimming Pool": "/amenities/swmimg-pool.png",
  "Air Hockey": "/amenities/air-hockey.png",
  "ATM": "/amenities/atm_1.png",
  "Backyard": "/amenities/backyard_1.png",
  "Balcony": "/amenities/balcony_1.png",
  "Bar": "/amenities/bar_1.png",
  "Beach Volleyball": "/amenities/beach-volleyball_1.png",
  "Cafe": "/amenities/cafe_1.png",
  "Campfire": "/amenities/campfire_1.png",
  "Car Charger": "/amenities/car-charger.png",
  "Central AC": "/amenities/central-ac.png",
  "Chat Plaza": "/amenities/chat-plaza.png",
  "Creche": "/amenities/creche_1.png",
  "Curtains": "/amenities/curtains_1.png",
  "Customized Furniture": "/amenities/customized-furniture.png",
  "Cycle Track": "/amenities/cycle-track.png",
  "Dance Room": "/amenities/dance-room.png",
  "Dedicated Pantries": "/amenities/dedicated-pantries.png",
  "Designer Entrance Lobby": "/amenities/designer-entrance-lobby.png",
  "Digital Zone": "/amenities/digital-zone.png",
  "Double Height Lobby": "/amenities/double-height-lobby.png",
  "Earthquake Resistant": "/amenities/earthquake-resistant.png",
  "Electricity": "/amenities/electricity_1.png",
  "Energy and Water Solution": "/amenities/energy-and-water-solution.png",
  "Entertainment Deck": "/amenities/entertainment-deck.png",
  "Entertainment Zone": "/amenities/entertainment-zone.png",
  "Equipped Kitchen": "/amenities/equipped-kitchen.png",
  "External Amenities": "/amenities/external-amenities.png",
  "False Kitchen": "/amenities/false-kitchen.png",
  "Field View": "/amenities/field-view.png",
  "Fire Pit": "/amenities/fire-pit.png",
  "Fitness Center": "/amenities/fitness-center.png",
  "Flag Hosting Zone": "/amenities/flag-hosting-zone.png",
  "Flower Garden": "/amenities/flower-garden.png",
  "Food Court": "/amenities/food-court.png",
  "Football Court": "/amenities/football-court.png",
  "Forest Walk": "/amenities/forest-walk.png",
  "Fountain": "/amenities/fountain_1.png",
  "Front Yard": "/amenities/front-yard.png",
  "Fully Furnished": "/amenities/fully-furnished.png",
  "Futsal Court": "/amenities/futsal-court.png",
  "Game Area": "/amenities/game-area.png",
  "Garage Attached": "/amenities/garage-attached.png",
  "Garbage Disposal": "/amenities/garbage-disposal.png",
  "Gated Complex": "/amenities/gated-complex.png",
  "Gazebo": "/amenities/gazebo_1.png",
  "Generator Backup": "/amenities/generator-backup.png",
  "Geyser": "/amenities/geyser_1.png",
  "Golf Course": "/amenities/golf-course.png",
  "Green Area": "/amenities/green-area.png",
  "Guest Bedroom": "/amenities/guest-bedroom.png",
  "Helipad": "/amenities/helipad_1.png",
  "Helpers Quarter": "/amenities/helpers-quarter.png",
  "High End Interior": "/amenities/high-end-interior.png",
  "Hot Bath": "/amenities/hot-bath.png",
  "Housekeeping": "/amenities/housekeeping_1.png",
  "Indoor Games": "/amenities/indoor-games.png",
  "Infinity Pool": "/amenities/infinity-pool.png",
  "Intercom": "/amenities/intercom_1.png",
  "Internal Amenities": "/amenities/internal-amenities.png",
  "Italian Furniture": "/amenities/italian-furniture.png",
  "Jacuzzi": "/amenities/jacuzzi_1.png",
  "Kids Pool": "/amenities/kids-pool.png",
  "Laundry": "/amenities/laundry.png",
  "Lawn Tennis": "/amenities/lawn-tennis.png",
  "LED Lights": "/amenities/led-lights.png",
  "Library": "/amenities/library_1.png",
  "Lounge Area": "/amenities/lounge-area.png",
  "Media Room": "/amenities/media-room.png",
  "Outdoor Gym": "/amenities/outdoor-gym.png",
  "Party Deck": "/amenities/party-deck.png",
  "Party Hall": "/amenities/party-hall.png",
  "Party Lawn": "/amenities/party-lawn.png",
  "Pathway": "/amenities/pathway_1.png",
  "Pergola": "/amenities/pergola_1.png",
  "Pet Park": "/amenities/pet-park.png",
  "Pipe Gas": "/amenities/pipe-gas.png",
  "Private Terrace": "/amenities/private-terrace.png",
  "Property Management": "/amenities/property-management.png",
  "Proximity to Beach": "/amenities/proximity-to-beach.png",
  "Rain Water Harvesting": "/amenities/rain-water-harvesting.png",
  "School": "/amenities/school_1.png",
  "Seating Area": "/amenities/seating-area.png",
  "Seminar Hall": "/amenities/seminar-hall.png",
  "Senior Citizen Area": "/amenities/senior-citizen-area.png",
  "Sewage Treatment Plant": "/amenities/sewage-treatment-plant.png",
  "Shopping Plaza": "/amenities/shopping-plaza.png",
  "Sit Out Area": "/amenities/sit-out-area.png",
  "Skating Ring": "/amenities/skating-ring.png",
  "Smart Home": "/amenities/smart-home.png",
  "Smoke Detection": "/amenities/smoke-detection.png",
  "Wide Road 50x50": "/amenities/wide-road-50z50.png",
  "Society": "/amenities/society.png",
  "Society Office": "/amenities/society-office.png",
  "Stilt Parking": "/amenities/stilt-parking.png",
  "Sun Deck": "/amenities/sun-deck.png",
  "Supermarket": "/amenities/supermarket.png",
  "Table Tennis": "/amenities/table-tennis.png",
  "Temple": "/amenities/temple.png",
  "Theme Wall": "/amenities/theme-wall.png",
  "Transformer": "/amenities/transformer_1.png",
  "Tree House": "/amenities/tree-house.png",
  "Utilities": "/amenities/utilities_1.png",
  "Vastu Compliance": "/amenities/vastu-compliance.png",
  "Ventilation": "/amenities/ventilation_1.png",
  "Video Door": "/amenities/video-door.png",
  "VR Game": "/amenities/vr-game.png",
  "Work From Home": "/amenities/work-from-home.png",
  "Yoga Room": "/amenities/yoga-room.png",
  "Zen Garden": "/amenities/zen-garden.png",
  "Zip Line": "/amenities/zip-line.png",
};



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

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('propertyAccess') || '{}');
      setHasAccess(saved);
    } catch (err) {
      console.error('Error parsing access flags:', err);
    }
  }, []);

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
          <div className={styles.amenitiesGrid}>
            {propertyData.amenities.map((amenity, idx) => (
              <div key={idx} className={styles.amenityItem}>
                <img
                  src={amenitiesIcons[amenity] || '/amenities/default.png'}
                  alt={amenity}
                  className={styles.amenityIcon}
                />
                <span>{amenity}</span>
              </div>
            ))}
          </div>
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
        {hasAccess.video ? (
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
            onClick={() => handleRequestAccess('video')}
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

{/* Map Section */}
<div className={styles.mapSection}>
  <h2>Location Map</h2>
  <iframe
    src={`https://www.google.com/maps?q=${encodeURIComponent(propertyData.location)}&output=embed`}
    width="100%"
    height="400"
    style={{ border: 0 }}
    allowFullScreen
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  ></iframe>
</div>

      {/* Form Modal */}
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
