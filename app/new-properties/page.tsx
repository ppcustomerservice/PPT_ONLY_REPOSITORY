"use client";

import { useEffect, useState } from "react";
import styles from "./NewPropertiesDetails.module.css";
import Navbar from "../../components/Navbar"

const NewProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [filters, setFilters] = useState({
    minBudget: 0,
    maxBudget: 30000000,
    possession: [],
    configuration: [],
    location: [],
  });

  // Fetch properties from the REST API
  const fetchProperties = async (currentPage) => {
    try {
      if (currentPage === 1) setLoading(true);
      else setLoadingMore(true);

      const response = await fetch(
        `https://www.propertyplateau.com/wp-json/wp/v2/estate_property?per_page=5&page=${currentPage}&_embed`
      );
      const data = await response.json();

      if (data.length > 0) {
        setProperties((prevProperties) => [...prevProperties, ...data]);
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
      return { ...prev, [name]: value };
    });
  };

  if (loading) return <p>Loading properties...</p>;

  return (
    <>
    <Navbar/>
    <div className={styles.mainContainer}>
      {/* Advanced Search Sidebar */}
      <div className={styles.filterContainer}>
        <h3 className={styles.filterTitle}>Advanced Search</h3>

        <label>Min Budget:</label>
        <select name="minBudget" onChange={handleFilterChange}>
          <option value="0">0</option>
          <option value="500000">5 Lacs</option>
          <option value="1000000">10 Lacs</option>
          <option value="2000000">20 Lacs</option>
          <option value="5000000">50 Lacs</option>
        </select>

        <label>Max Budget:</label>
        <select name="maxBudget" onChange={handleFilterChange}>
          <option value="30000000">3 Cr</option>
          <option value="20000000">2 Cr</option>
          <option value="10000000">1 Cr</option>
          <option value="5000000">50 Lacs</option>
          <option value="2000000">20 Lacs</option>
        </select>

        <h4>Possession In:</h4>
        <div className={styles.filterGroup}>
  <input type="checkbox" id="2024" />
  <label htmlFor="2024">2024</label>
</div>

<div className={styles.filterGroup}>
  <input type="checkbox" id="2025" />
  <label htmlFor="2025">2025</label>
</div>

<div className={styles.filterGroup}>
  <input type="checkbox" id="2026" />
  <label htmlFor="2026">2026</label>
</div>

<div className={styles.filterGroup}>
  <input type="checkbox" id="2027" />
  <label htmlFor="2027">2027</label>
</div>

<div className={styles.filterGroup}>
  <input type="checkbox" id="2028" />
  <label htmlFor="2028">2028</label>
</div>

        <h4>Configuration:</h4>
        {["1 BHK", "2 BHK", "3 BHK", "4 BHK", "5 BHK", "6 BHK"].map((config) => (
          <div key={config}>
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
        {["Panvel", "Navi Mumbai", "Chembur", "Andheri West", "Santacruz West", "Mira Road", "Kalyan West"].map((location) => (
          <div key={location}>
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

      {/* Properties List */}
      <div className={styles.propertiesContainer}>
        {properties.map((property) => (
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
                  <strong>Carpet Area:</strong> {property.carpet_area || "N/A"} sqft
                </div>
                <div>
                  <strong>Possession:</strong> {property.possession || "N/A"}
                </div>
                <div>
                  <strong>Floor:</strong> {property.floor || "N/A"}
                </div>
                <div>
                  <strong>Transaction:</strong> New Property
                </div>
                <div>
                  <strong>Furnishing:</strong> {property.furnishing || "Unfurnished"}
                </div>
                <div>
                  <strong>Location:</strong> {property.location || "N/A"}
                </div>
              </div>
              <p className={styles.propertyPrice}>
                ₹{property.price || "Price on Request"}
              </p>
              <div className={styles.buttonContainer}>
                <a href={`/new-properties/${property.slug}`} className={styles.viewDetailsBtn}>
                  View Details
                </a>
                <a href={`/contact-owner/${property.slug}`} className={styles.contactOwnerBtn}>
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
