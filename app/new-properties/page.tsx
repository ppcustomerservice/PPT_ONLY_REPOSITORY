"use client";

import { useEffect, useState } from "react";
import styles from "./NewPropertiesDetails.module.css";
import Navbar from "../../components/Navbar";
import propData from "../new-properties/[slug]/prop.json";

const NewProperties = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [filters, setFilters] = useState({
    minBudget: 1000000, // Default: 10 Lacs
    maxBudget: 1000000000, // Default: 100 Cr
    possession: [],
    configuration: [],
    location: [],
  });

  const priceOptions = [
    { label: "10 Lacs", value: 1000000 },
    { label: "20 Lacs", value: 2000000 },
    { label: "30 Lacs", value: 3000000 },
    { label: "50 Lacs", value: 5000000 },
    { label: "1 Cr", value: 10000000 },
    { label: "2 Cr", value: 20000000 },
    { label: "5 Cr", value: 50000000 },
    { label: "10 Cr", value: 100000000 },
    { label: "100 Cr", value: 1000000000 },
  ];

  const fetchProperties = async (currentPage) => {
    try {
      if (currentPage === 1) setLoading(true);
      else setLoadingMore(true);

      const response = await fetch(
        `https://www.propertyplateau.com/wp-json/wp/v2/estate_property?per_page=5&page=${currentPage}&_embed`
      );
      const data = await response.json();

      if (data.length > 0) {
        const mappedData = data.map((property) => {
          const propJsonMatch = propData.find(
            (p) => String(p.ID).toLowerCase() === String(property.id).toLowerCase()
          );

          const price = propJsonMatch?.property_price || "Price on Request";
          const label = propJsonMatch?.property_label || "N/A";

          // Format price
          const formattedPrice =
            label === "CR" || label === "Cr"
              ? `${price} Cr`
              : `${price} Lacs`;

          const numericPrice = label.toLowerCase().includes("cr")
            ? parseFloat(price) * 1e7 // Convert crores to rupees
            : parseFloat(price) * 1e5; // Convert lakhs to rupees

          const location = propJsonMatch?.property_address?.replace(/\s+/g, " ") || "N/A";

          const carpetArea = propJsonMatch?.Property_size
            ? `${propJsonMatch.Property_size} sqft`
            : "N/A";

          const possessionDate = propJsonMatch?.property_date
            ? new Date(propJsonMatch.property_date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
              })
            : "N/A";

          return {
            ...property,
            price: formattedPrice,
            numericPrice,
            label: label,
            location: location,
            carpet_area: carpetArea,
            possession_date: possessionDate,
          };
        });

        setProperties((prevProperties) => [...prevProperties, ...mappedData]);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // Filter and sort properties dynamically
  useEffect(() => {
    const filtered = properties
      .filter((property) => {
        const isWithinBudget =
          property.numericPrice >= filters.minBudget &&
          property.numericPrice <= filters.maxBudget;
        return (
          isWithinBudget &&
          (filters.possession.length === 0 || filters.possession.includes(property.possession_date)) &&
          (filters.configuration.length === 0 || filters.configuration.includes(property.label)) &&
          (filters.location.length === 0 || filters.location.includes(property.location))
        );
      })
      .sort((a, b) => a.numericPrice - b.numericPrice); // Sort in ascending order

    setFilteredProperties(filtered);
  }, [filters, properties]);

  useEffect(() => {
    fetchProperties(page);
  }, [page]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prev) => {
      if (type === "checkbox") {
        return {
          ...prev,
          [name]: checked
            ? [...prev[name], value]
            : prev[name].filter((v) => v !== value),
        };
      }
      return { ...prev, [name]: parseInt(value) };
    });
  };

  if (loading) return <p>Loading properties...</p>;

  return (
    <>
      <Navbar />
      <div className={styles.mainContainer}>
        <div className={styles.filterContainer}>
          <h3 className={styles.filterTitle}>Advanced Search</h3>

          {/* Min and Max Budget */}
          <label>Min Budget:</label>
          <select
            name="minBudget"
            value={filters.minBudget}
            onChange={handleFilterChange}
          >
            {priceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <label>Max Budget:</label>
          <select
            name="maxBudget"
            value={filters.maxBudget}
            onChange={handleFilterChange}
          >
            {priceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* Other Filters */}
          <h4>Possession In:</h4>
          {["2024", "2025", "2026", "2027", "2028"].map((year) => (
            <div className={styles.filterGroup} key={year}>
              <input
                type="checkbox"
                name="possession"
                value={year}
                onChange={handleFilterChange}
              />
              <label>{year}</label>
            </div>
          ))}

          <h4>Configuration:</h4>
          {["1 BHK", "2 BHK", "3 BHK", "4 BHK", "5 BHK", "6 BHK"].map((config) => (
            <div className={styles.filterGroup} key={config}>
              <input
                type="checkbox"
                name="configuration"
                value={config}
                onChange={handleFilterChange}
              />
              <label>{config}</label>
            </div>
          ))}

          <h4>Location:</h4>
          {[
            "Panvel",
            "Navi Mumbai",
            "Chembur",
            "Andheri West",
            "Santacruz West",
            "Mira Road",
            "Kalyan West",
          ].map((location) => (
            <div className={styles.filterGroup} key={location}>
              <input
                type="checkbox"
                name="location"
                value={location}
                onChange={handleFilterChange}
              />
              <label>{location}</label>
            </div>
          ))}
        </div>

        <div className={styles.propertiesContainer}>
          {filteredProperties.map((property) => (
            <div key={property.id} className={styles.propertyBox}>
              <div className={styles.propertyImageCarousel}>
                <div className={styles.reraBadge}>RERA Registered</div>
                <img
                  src={
                    property._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
                    "/placeholder.jpg"
                  }
                  alt={property.title.rendered}
                  className={styles.image}
                />
              </div>
              <div className={styles.propertyInfo}>
                <h2
                  className={styles.propertyTitle}
                  dangerouslySetInnerHTML={{ __html: property.title.rendered }}
                />
                <div className={styles.propertyDetails}>
                  <div>
                    <strong>Carpet Area:</strong> {property.carpet_area}
                  </div>
                  <div>
                    <strong>Possession:</strong> {property.possession_date}
                  </div>
                  <div>
                    <strong>Transaction:</strong> New Property
                  </div>
                  <div>
                    <strong>Furnishing:</strong> {property.furnishing || "Unfurnished"}
                  </div>
                  <div>
                    <strong>Location:</strong> {property.location}
                  </div>
                </div>
                <p className={styles.propertyPrice}>
                  ₹ {property.price}
                </p>
                <div className={styles.buttonContainer}>
                  <a
                    href={`/new-properties/${property.slug}`}
                    className={styles.viewDetailsBtn}
                  >
                    View Details
                  </a>
                  <a
                    href={`/contact-owner/${property.slug}`}
                    className={styles.contactOwnerBtn}
                  >
                    Contact Owner
                  </a>
                </div>
              </div>
            </div>
          ))}
          {hasMore && (
            <div className={styles.showMoreBtn}>
              <button onClick={loadMore} disabled={loadingMore}>
                {loadingMore ? "Loading..." : "Show More Properties ↓"}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NewProperties;
