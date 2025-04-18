
'use client';

import styles from '../../CustomPorpertyCss.module.css';

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
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>{property.title}</h1>
          <div className={styles.heroDetails}>
            <div className={styles.priceTag}>
              ₹{property.price}
              <div className={styles.priceSubtext}>Total Price</div>
            </div>
            <div className={styles.locationBadge}>
              <span className="material-icons">pin_drop</span>
              {property.location}
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <section className={styles.gallerySection}>
        <div className={styles.galleryGrid}>
          {property.propertyImages.map((image, index) => (
            <div 
              key={index} 
              className={`${styles.galleryItem} ${index === 0 ? styles.featuredImage : ''}`}
            >
              <img
                src={image.url}
                alt={`${property.title} - Image ${index + 1}`}
                className={styles.image}
                loading="lazy"
              />
              <div className={styles.imageOverlay}></div>
            </div>
          ))}
        </div>
      </section>

      {/* Details Section */}
      <section className={styles.detailsSection}>
        {/* Key Details Card */}
        <div className={styles.detailsCard}>
          <h2 className={styles.sectionTitle}>
            <span className="material-icons">info</span>
            Property Details
          </h2>
          
          <div className={styles.detailGrid}>
            <div className={styles.detailItem}>
              <span className="material-icons">calendar_month</span>
              <div>
                <h3>Possession Date</h3>
                <p>{property.possessionDate}</p>
              </div>
            </div>
            
            {property.description && (
              <div className={styles.detailItem}>
                <span className="material-icons">description</span>
                <div>
                  <h3>Description</h3>
                  <p className={styles.descriptionText}>{property.description}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Amenities Section */}
        {property.amenities.length > 0 && (
          <div className={styles.amenitiesCard}>
            <h2 className={styles.sectionTitle}>
              <span className="material-icons">apartment</span>
              Amenities
            </h2>
            <div className={styles.amenitiesGrid}>
              {property.amenities.map((amenity, index) => (
                <div key={index} className={styles.amenityItem}>
                  <span className="material-icons">check_circle</span>
                  {amenity}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Floor Plans Section */}
        {property.plans.length > 0 && (
          <div className={styles.plansCard}>
            <h2 className={styles.sectionTitle}>
              <span className="material-icons">design_services</span>
              Floor Plans
            </h2>
            <div className={styles.plansGrid}>
              {property.plans.map((plan, index) => (
                <div key={index} className={styles.planItem}>
                  <span className="material-icons">floorplan</span>
                  {plan}
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Fixed CTA */}
      <div className={styles.fixedCTA}>
        <button className={styles.ctaButton}>
          <span className="material-icons">message</span>
          Schedule a Visit
        </button>
      </div>
    </div>
  );
}