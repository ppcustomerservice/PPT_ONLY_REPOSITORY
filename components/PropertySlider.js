"use client"; 

import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './PropertySlider.css';
import Link from 'next/link';


const useFetchProperties = (regionId) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://www.propertyplateau.com/wp-json/wp/v2/estate_property?property_county_state=${regionId}&per_page=100`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch properties');
        }

        const data = await response.json();
        setProperties(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (regionId) {
      fetchProperties();
    }
  }, [regionId]);

  return { properties, loading, error };
};

const truncateTitle = (title, wordLimit = 4) => {
  const words = title.split(' ');
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(' ') + '...';
  }
  return title;
};

const PropertySlider = ({ regionId }) => {
  const { properties, loading, error } = useFetchProperties(regionId);

  const settings = {
    // dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3, 
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (loading) {
    return <p>Loading properties...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="property-slider">
      <Slider {...settings}>
        {properties.map((property) => (
          <div key={property.id} className="property-card-wrapper">
            <div className="property-card">
              <a
                href={`/property/${property.slug}`} 
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={property.yoast_head_json?.og_image?.[0]?.url || 'https://via.placeholder.com/400'}
                  alt={property.title.rendered}
                  className="property-image"
                />

                {/* Title and Meta Info */}
                <div className="property-details">
                  <h3 className="property-title">
                    {truncateTitle(decodeHtmlEntities(property.title.rendered))}
                  </h3>
                  <div className="property-meta">
                    <p className="property-size">
                      {property.property_area?.[0] || 'Area details not available'}
                    </p>
                    <p className="property-possession">
                      {property.possession || 'Possession details not available'}
                    </p>
                  </div>
                </div>

                <div className="property-footer">
                  <p className="property-price">
                    {property.price ? `₹ ${property.price}` : 'Price on request'}
                  </p>
                  <button className="contact-now-button">Contact Now</button>
                </div>
              </a>
            </div>
          </div>
        ))}

        <div className="property-card-wrapper">
          <div className="property-card view-more-card">
          <Link href="/new-properties">
              <button className="view-more-button">View More</button>
           </Link>
          </div>
        </div>
      </Slider>
    </div>
  );
};

const decodeHtmlEntities = (html) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-next-arrow`}
      style={{
        ...style,
        display: 'block',
        backgroundColor: '#104b97',
        borderRadius: '50%',
        padding: '10px',
      }}
      onClick={onClick}
    />
  );
};

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-prev-arrow`}
      style={{
        ...style,
        display: 'block',
        backgroundColor: '#104b97',
        borderRadius: '50%',
        padding: '10px',
      }}
      onClick={onClick}
    />
  );
};

export default PropertySlider;
