"use client";
import { useEffect, useState } from "react";
import styles from "./NewPropertiesDetails.module.css";
import Navbar from "../../components/Navbar";
import propData from "../new-properties/[slug]/prop.json";

const NewProperties = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loadingProperties, setLoadingProperties] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [filters, setFilters] = useState({
    minBudget: 10000000, // Default: 1 Cr
    maxBudget: 100000000, // Default: 10 Cr
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

  const fetchProperties = async (currentPage, append = false) => {
    try {
      if (!append) setLoadingProperties(true);
      else setLoadingMore(true);
  
      // Use prop.json data
      const data = propData;
  
      const mappedData = data.map((property) => {
        const price = property.property_price || "Price on Request";
        const label = property.property_label || "N/A";
      
        const formattedPrice =
          label.toLowerCase().includes("cr")
            ? `${price} Cr`
            : `${price} Lacs`;
      
        const numericPrice = label.toLowerCase().includes("cr")
          ? parseFloat(price) * 1e7
          : parseFloat(price) * 1e5;
      
        return {
          id: property.ID,
          title: property.post_title,
          price: formattedPrice,
          numericPrice,
          label,
          location: property.property_address?.replace(/\s+/g, " ") || "N/A",
          carpet_area: property.Property_size
            ? `${property.Property_size} sqft`
            : "N/A",
          possession_date: property.property_date
            ? new Date(property.property_date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
              })
            : "N/A",
          slug: property.slug,
          image: property.images?.[0] || "default-image-url.jpg", // First image or default fallback
          images: property.images || [], // All images array
        };
      });
      
  
      if (mappedData.length > 0) {
        setProperties((prevProperties) =>
          append ? [...prevProperties, ...mappedData] : mappedData
        );
  
        if (mappedData.length < 10) setHasMore(false);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
      setHasMore(false);
    } finally {
      setLoadingProperties(false);
      setLoadingMore(false);
    }
  };
  

  useEffect(() => {
    fetchProperties(1, false);
    setPage(1);
  }, [filters.minBudget, filters.maxBudget]);

  const filterPropertiesLocally = () => {
    const filtered = properties
      .filter((property) => {
        return (
          property.numericPrice >= filters.minBudget &&
          property.numericPrice <= filters.maxBudget &&
          (filters.possession.length === 0 ||
            filters.possession.includes(property.possession_date)) &&
          (filters.configuration.length === 0 ||
            filters.configuration.includes(property.label)) &&
          (filters.location.length === 0 ||
            filters.location.includes(property.location))
        );
      })
      .sort((a, b) => a.numericPrice - b.numericPrice);

    setFilteredProperties(filtered);
  };

  useEffect(() => {
    filterPropertiesLocally();
  }, [properties, filters]);

  const loadMore = async () => {
    if (loadingMore || !hasMore) return;

    const nextPage = page + 1;

    try {
      await fetchProperties(nextPage, true);
      setPage(nextPage);
    } catch (error) {
      console.error("Error loading more properties:", error);
    }
  };

  const handleMinBudgetChange = (e) => {
    const value = parseInt(e.target.value);
    setFilters((prev) => ({
      ...prev,
      minBudget: value,
      maxBudget: Math.max(value + 1, prev.maxBudget),
    }));
  };

  const handleMaxBudgetChange = (e) => {
    const value = parseInt(e.target.value);
    setFilters((prev) => ({
      ...prev,
      maxBudget: value,
      minBudget: Math.min(value - 1, prev.minBudget),
    }));
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
            onChange={handleMinBudgetChange}
          >
            {priceOptions
              .filter((option) => option.value < filters.maxBudget)
              .map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
          </select>

          <label>Max Budget:</label>
          <select
            name="maxBudget"
            value={filters.maxBudget}
            onChange={handleMaxBudgetChange}
          >
            {priceOptions
              .filter((option) => option.value > filters.minBudget)
              .map((option) => (
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
          {["1 BHK", "2 BHK", "3 BHK", "4 BHK", "5 BHK", "6 BHK"].map(
            (config) => (
              <div className={styles.filterGroup} key={config}>
                <input
                  type="checkbox"
                  name="configuration"
                  value={config}
                  onChange={handleFilterChange}
                />
                <label>{config}</label>
              </div>
            )
          )}

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
          {loadingProperties ? (
            <p>Loading properties...</p>
          ) : filteredProperties.length > 0 ? (
            filteredProperties.map((property) => (
              <div key={property.id} className={styles.propertyBox}>
                <div className={styles.propertyImageCarousel}>
                  <div className={styles.reraBadge}>RERA Registered</div>
                  <img
                    src={property.image}
                    alt={property.title}
                    className={styles.image}
                  />
                </div>
                <div className={styles.propertyInfo}>
                  <h2 className={styles.propertyTitle}>{property.title}</h2>
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
                      <strong>Furnishing:</strong> Unfurnished
                    </div>
                    <div>
                      <strong>Location:</strong> {property.location}
                    </div>
                  </div>
                  <p className={styles.propertyPrice}>₹ {property.price}</p>
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
            ))
          ) : (
            <p>No properties found within the selected filters.</p>
          )}
          {hasMore && !loadingProperties && (
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
