// "use client";
// import { useEffect, useState } from "react";
// import styles from "./NewPropertiesDetails.module.css";
// import Navbar from "../../components/Navbar";
// import axios from "axios"; // Import axios

// const NewProperties = () => {
//   const [isFilterVisible, setIsFilterVisible] = useState(false);
//   const [properties, setProperties] = useState([]);
//   const [filteredProperties, setFilteredProperties] = useState([]);
//   const [loadingProperties, setLoadingProperties] = useState(false);
//   const [loadingMore, setLoadingMore] = useState(false);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const [filters, setFilters] = useState({
//     minBudget: 10000000, // Default: 1 Cr
//     maxBudget: 100000000, // Default: 10 Cr
//     possession: [],
//     configuration: [],
//     location: [],
//   });

//   const toggleFilterVisibility = () => {
//     setIsFilterVisible((prev) => !prev);
//   };

//   const priceOptions = [
//     { label: "10 Lacs", value: 1000000 },
//     { label: "20 Lacs", value: 2000000 },
//     { label: "30 Lacs", value: 3000000 },
//     { label: "50 Lacs", value: 5000000 },
//     { label: "1 Cr", value: 10000000 },
//     { label: "2 Cr", value: 20000000 },
//     { label: "5 Cr", value: 50000000 },
//     { label: "10 Cr", value: 100000000 },
//     { label: "100 Cr", value: 1000000000 },
//   ];

//   const fetchProperties = async (currentPage, append = false) => {
//     try {
//       if (!append) setLoadingProperties(true);
//       else setLoadingMore(true);

//       // Call your API endpoint
//       const response = await axios.get('http://localhost:8000/api/properties');
//       const data = response.data;

//       const mappedData = data.map((property) => {
//         const price = property.property_price || "Price on Request";
//         const label = property.property_label || "N/A";
      
//         const formattedPrice =
//           label.toLowerCase().includes("cr")
//             ? `${price} Cr`
//             : `${price} Lacs`;
      
//         const numericPrice = label.toLowerCase().includes("cr")
//           ? parseFloat(price) * 1e7
//           : parseFloat(price) * 1e5;
      
//         return {
//           id: property._id || property.ID, // Use _id from MongoDB if available
//           title: property.post_title,
//           price: formattedPrice,
//           numericPrice,
//           label,
//           location: property.property_address?.replace(/\s+/g, " ") || "N/A",
//           carpet_area: property.Property_size
//             ? `${property.Property_size} sqft`
//             : "N/A",
//           possession_date: property.property_date
//             ? new Date(property.property_date).toLocaleDateString("en-US", {
//                 year: "numeric",
//                 month: "long",
//               })
//             : "N/A",
//           slug: property.slug,
//           image: property.images?.[0] || "default-image-url.jpg",
//           images: property.images || [],
//         };
//       });
      
//       if (mappedData.length > 0) {
//         setProperties((prevProperties) =>
//           append ? [...prevProperties, ...mappedData] : mappedData
//         );
  
//         if (mappedData.length < 10) setHasMore(false);
//       } else {
//         setHasMore(false);
//       }
//     } catch (error) {
//       console.error("Error fetching properties:", error);
//       setHasMore(false);
//     } finally {
//       setLoadingProperties(false);
//       setLoadingMore(false);
//     }
//   };

//   // Rest of your component remains the same...
//   useEffect(() => {
//     fetchProperties(1, false);
//     setPage(1);
//   }, [filters.minBudget, filters.maxBudget]);

//   const filterPropertiesLocally = () => {
//     const filtered = properties
//       .filter((property) => {
//         const possessionYear = new Date(property.possession_date).getFullYear();

//         return (
//           property.numericPrice >= filters.minBudget &&
//           property.numericPrice <= filters.maxBudget &&
//           (filters.possession.length === 0 ||
//             filters.possession.includes(possessionYear.toString())) &&
//           (filters.configuration.length === 0 ||
//             filters.configuration.includes(property.label)) &&
//           (filters.location.length === 0 ||
//             filters.location.includes(property.location))
//         );
//       })
//       .sort((a, b) => a.numericPrice - b.numericPrice);

//     setFilteredProperties(filtered);
//   };

//   // ... (keep all other existing functions and JSX the same)

//   return (
//     <>
//       <Navbar />
//       <div className={styles.mainContainer}>
//       <div
//           className={`${styles.filterContainer} ${
//             isFilterVisible ? styles.open : ""
//           }`}
//         >         
//          <h3 className={styles.filterTitle}>Advanced Search</h3>

//           {/* Min and Max Budget */}
//           <label>Min Budget:</label>
//           <select
//             name="minBudget"
//             value={filters.minBudget}
//             onChange={handleMinBudgetChange}
//           >
//             {priceOptions
//               .filter((option) => option.value < filters.maxBudget)
//               .map((option) => (
//                 <option key={option.value} value={option.value}>
//                   {option.label}
//                 </option>
//               ))}
//           </select>

//           <label>Max Budget:</label>
//           <select
//             name="maxBudget"
//             value={filters.maxBudget}
//             onChange={handleMaxBudgetChange}
//           >
//             {priceOptions
//               .filter((option) => option.value > filters.minBudget)
//               .map((option) => (
//                 <option key={option.value} value={option.value}>
//                   {option.label}
//                 </option>
//               ))}
//           </select>

//           {/* Other Filters */}
//           <h4>Possession In:</h4>
//           {["2021","2022","2023","2024", "2025", "2026", "2027", "2028","2029","2030","2031"].map((year) => (
//             <div className={styles.filterGroup} key={year}>
//               <input
//                 type="checkbox"
//                 name="possession"
//                 value={year}
//                 onChange={handleFilterChange}
//               />
//               <label>{year}</label>
//             </div>
//           ))}

//           <h4>Configuration:</h4>
//           {["1 BHK", "2 BHK", "3 BHK", "4 BHK", "5 BHK", "6 BHK"].map(
//             (config) => (
//               <div className={styles.filterGroup} key={config}>
//                 <input
//                   type="checkbox"
//                   name="configuration"
//                   value={config}
//                   onChange={handleFilterChange}
//                 />
//                 <label>{config}</label>
//               </div>
//             )
//           )}

//           <h4>Location:</h4>
//           {[
//             "Panvel",
//             "Navi Mumbai",
//             "Chembur",
//             "Andheri West",
//             "Santacruz West",
//             "Mira Road",
//             "Kalyan West",
//           ].map((location) => (
//             <div className={styles.filterGroup} key={location}>
//               <input
//                 type="checkbox"
//                 name="location"
//                 value={location}
//                 onChange={handleFilterChange}
//               />
//               <label>{location}</label>
//             </div>
//           ))}
//         </div>

//         <div className={styles.propertiesContainer}>
//           {loadingProperties ? (
//             <p>Loading properties...</p>
//           ) : filteredProperties.length > 0 ? (
//             filteredProperties.map((property) => (
//               <div key={property.id} className={styles.propertyBox}>
//                 <div className={styles.propertyImageCarousel}>
//                   {/* <div className={styles.reraBadge}>RERA Registered</div> */}
//                   <img
//                     src={property.image}
//                     alt={property.title}
//                     className={styles.image}
//                   />
//                 </div>
//                 <div className={styles.propertyInfo}>
//                   <h2 className={styles.propertyTitle}>{property.title}</h2>
//                   <div className={styles.propertyDetails}>
//                     <div>
//                       <strong>Carpet Area:</strong> {property.carpet_area}
//                     </div>
//                     <div>
//                       <strong>Possession:</strong> {property.possession_date}
//                     </div>
//                     <div>
//                       <strong>Transaction:</strong> New Property
//                     </div>
//                     <div>
//                       <strong>Furnishing:</strong> Unfurnished
//                     </div>
//                     <div>
//                       <strong>Location:</strong> {property.location}
//                     </div>
//                   </div>
//                   <p className={styles.propertyPrice}>₹ {property.price}</p>
//                   <div className={styles.buttonContainer}>
//                     <a
//                       href={`/new-properties/${property.slug}`}
//                       className={styles.viewDetailsBtn}
//                     >
//                       View Details
//                     </a>
//                     <a
//                       href={`/contact-owner/${property.slug}`}
//                       className={styles.contactOwnerBtn}
//                     >
//                       Contact Owner
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p>No properties found within the selected filters.</p>
//           )}
//           {hasMore && !loadingProperties && (
//             <div className={styles.showMoreBtn}>
//               <button onClick={loadMore} disabled={loadingMore}>
//                 {loadingMore ? "Loading..." : "Show More Properties ↓"}
//               </button>
//             </div>
//           )}
//         </div>
//         <button className={styles.filterButton} onClick={toggleFilterVisibility}>
//           {isFilterVisible ? "Hide Filters" : "Show Filters"}
//         </button>

//       </div>
//     </>
//   );
// };

// export default NewProperties;

// "use client";
// import { useEffect, useState } from "react";
// import styles from "./NewPropertiesDetails.module.css";
// import Navbar from "../../components/Navbar";
// import axios from "axios";

// const NewProperties = () => {
//   const [isFilterVisible, setIsFilterVisible] = useState(false);
//   const [properties, setProperties] = useState([]);
//   const [filteredProperties, setFilteredProperties] = useState([]);
//   const [loadingProperties, setLoadingProperties] = useState(false);
//   const [loadingMore, setLoadingMore] = useState(false);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const [error, setError] = useState(null);

//   const [filters, setFilters] = useState({
//     minBudget: 10000000, // Default: 1 Cr
//     maxBudget: 100000000, // Default: 10 Cr
//     possession: [],
//     configuration: [],
//     location: [],
//   });

//   const toggleFilterVisibility = () => {
//     setIsFilterVisible((prev) => !prev);
//   };

//   const priceOptions = [
//     { label: "10 Lacs", value: 1000000 },
//     { label: "20 Lacs", value: 2000000 },
//     { label: "30 Lacs", value: 3000000 },
//     { label: "50 Lacs", value: 5000000 },
//     { label: "1 Cr", value: 10000000 },
//     { label: "2 Cr", value: 20000000 },
//     { label: "5 Cr", value: 50000000 },
//     { label: "10 Cr", value: 100000000 },
//     { label: "100 Cr", value: 1000000000 },
//   ];

//   const fetchProperties = async (currentPage, append = false) => {
//     try {
//       if (!append) {
//         setLoadingProperties(true);
//         setError(null);
//       } else {
//         setLoadingMore(true);
//       }

//       const response = await axios.get('http://localhost:8000/api/properties', {
//         params: {
//           page: currentPage,
//           limit: 10
//         }
//       });

//       const data = response.data;
// console.log(data);
//       const mappedData = data.map((property) => {
//         const price = property.price || "Price on Request";
//         const label = property.propertyLabel || "N/A";
      
//         const formattedPrice =
//           price.toLowerCase().includes("cr")
//             ? price.replace(/[^0-9.]/g, '') + " Cr"
//             : price.replace(/[^0-9.]/g, '') + " Lacs";
      
//         const numericPrice = price.toLowerCase().includes("cr")
//           ? parseFloat(price.replace(/[^0-9.]/g, '')) * 1e7
//           : parseFloat(price.replace(/[^0-9.]/g, '')) * 1e5;
      
//         return {
//           id: property._id,
//           title: property.title,
//           price: formattedPrice,
//           numericPrice,
//           label,
//           location: property.location || "N/A",
//           carpet_area: "N/A", // or set to actual if available
//           possession_date: property.possessionDate
//             ? new Date(property.possessionDate).toLocaleDateString("en-US", {
//                 year: "numeric",
//                 month: "long",
//               })
//             : "N/A",
//           slug: property._id,
//           image: property.propertyImages?.[0] || "",
//           images: property.propertyImages || [],
//         };
//       });
      
   
      
//       if (mappedData.length > 0) {
//         setProperties((prevProperties) =>
//           append ? [...prevProperties, ...mappedData] : mappedData
//         );
//         setHasMore(mappedData.length >= 10);
//       } else {
//         setHasMore(false);
//       }
//     } catch (error) {
//       console.error("Error fetching properties:", error);
//       setError("Failed to load properties. Please try again.");
//       setHasMore(false);
//     } finally {
//       setLoadingProperties(false);
//       setLoadingMore(false);
//     }
//   };

//   useEffect(() => {
//     fetchProperties(1, false);
//     setPage(1);
//   }, [filters.minBudget, filters.maxBudget]);

//   const filterPropertiesLocally = () => {
//     const filtered = properties
//       .filter((property) => {
//         const possessionYear = new Date(property.possession_date).getFullYear();

//         return (
//           property.numericPrice >= filters.minBudget &&
//           property.numericPrice <= filters.maxBudget &&
//           (filters.possession.length === 0 ||
//             filters.possession.includes(possessionYear.toString())) &&
//           (filters.configuration.length === 0 ||
//             filters.configuration.includes(property.label)) &&
//           (filters.location.length === 0 ||
//             filters.location.includes(property.location))
//         );
//       })
//       .sort((a, b) => a.numericPrice - b.numericPrice);

//     //setFilteredProperties(filtered);
//   };
//   useEffect(() => {
//     console.log("Showing all properties:", properties);
//     setFilteredProperties(properties);
//   }, [properties]);
  
//   const loadMore = async () => {
//     if (loadingMore || !hasMore) return;
//     const nextPage = page + 1;
//     try {
//       await fetchProperties(nextPage, true);
//       setPage(nextPage);
//     } catch (error) {
//       console.error("Error loading more properties:", error);
//     }
//   };

//   const handleMinBudgetChange = (e) => {
//     const value = parseInt(e.target.value);
//     setFilters((prev) => ({
//       ...prev,
//       minBudget: value,
//       maxBudget: Math.max(value + 1, prev.maxBudget),
//     }));
//   };

//   const handleMaxBudgetChange = (e) => {
//     const value = parseInt(e.target.value);
//     setFilters((prev) => ({
//       ...prev,
//       maxBudget: value,
//       minBudget: Math.min(value - 1, prev.minBudget),
//     }));
//   };

//   const handleFilterChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFilters((prev) => {
//       if (type === "checkbox") {
//         return {
//           ...prev,
//           [name]: checked
//             ? [...prev[name], value]
//             : prev[name].filter((v) => v !== value),
//         };
//       }
//       return { ...prev, [name]: parseInt(value) };
//     });
//   };

//   const refreshData = () => {
//     fetchProperties(1, false);
//     setPage(1);
//   };

//   return (
//     <>
//       <Navbar />
//       <div className={styles.mainContainer}>
//         <div className={`${styles.filterContainer} ${isFilterVisible ? styles.open : ""}`}>
//           <h3 className={styles.filterTitle}>Advanced Search</h3>

//           <label>Min Budget:</label>
//           <select
//             name="minBudget"
//             value={filters.minBudget}
//             onChange={handleMinBudgetChange}
//           >
//             {priceOptions
//               .filter((option) => option.value < filters.maxBudget)
//               .map((option) => (
//                 <option key={option.value} value={option.value}>
//                   {option.label}
//                 </option>
//               ))}
//           </select>

//           <label>Max Budget:</label>
//           <select
//             name="maxBudget"
//             value={filters.maxBudget}
//             onChange={handleMaxBudgetChange}
//           >
//             {priceOptions
//               .filter((option) => option.value > filters.minBudget)
//               .map((option) => (
//                 <option key={option.value} value={option.value}>
//                   {option.label}
//                 </option>
//               ))}
//           </select>

//           <h4>Possession In:</h4>
//           {["2021","2022","2023","2024", "2025", "2026", "2027", "2028","2029","2030","2031"].map((year) => (
//             <div className={styles.filterGroup} key={year}>
//               <input
//                 type="checkbox"
//                 name="possession"
//                 value={year}
//                 onChange={handleFilterChange}
//               />
//               <label>{year}</label>
//             </div>
//           ))}

//           <h4>Configuration:</h4>
//           {["1 BHK", "2 BHK", "3 BHK", "4 BHK", "5 BHK", "6 BHK"].map(
//             (config) => (
//               <div className={styles.filterGroup} key={config}>
//                 <input
//                   type="checkbox"
//                   name="configuration"
//                   value={config}
//                   onChange={handleFilterChange}
//                 />
//                 <label>{config}</label>
//               </div>
//             )
//           )}

//           <h4>Location:</h4>
//           {[
//             "Panvel",
//             "Navi Mumbai",
//             "Chembur",
//             "Andheri West",
//             "Santacruz West",
//             "Mira Road",
//             "Kalyan West",
//           ].map((location) => (
//             <div className={styles.filterGroup} key={location}>
//               <input
//                 type="checkbox"
//                 name="location"
//                 value={location}
//                 onChange={handleFilterChange}
//               />
//               <label>{location}</label>
//             </div>
//           ))}
//         </div>

//         <div className={styles.propertiesContainer}>
//           {error ? (
//             <div className={styles.errorMessage}>
//               <p>{error}</p>
//               <button onClick={refreshData}>Retry</button>
//             </div>
//           ) : loadingProperties ? (
//             <p>Loading properties...</p>
//           ) : filteredProperties.length > 0 ? (
//             filteredProperties.map((property) => (
//               <div key={property.id} className={styles.propertyBox}>
//                 <div className={styles.propertyImageCarousel}>
//                   {property.image ? (
//                     <img
//                       src={property.image}
//                       alt={property.title}
//                       className={styles.image}
//                       onError={(e) => {
//                         e.target.onerror = null;
//                         e.target.src = "";
//                         e.target.style.display = "none";
//                       }}
//                     />
//                   ) : (
//                     <div className={styles.noImagePlaceholder}>
//                       Image Coming Soon
//                     </div>
//                   )}
//                 </div>
//                 <div className={styles.propertyInfo}>
//                   <h2 className={styles.propertyTitle}>{property.title}</h2>
//                   <div className={styles.propertyDetails}>
//                     <div>
//                       <strong>Carpet Area:</strong> {property.carpet_area}
//                     </div>
//                     <div>
//                       <strong>Possession:</strong> {property.possession_date}
//                     </div>
//                     <div>
//                       <strong>Transaction:</strong> New Property
//                     </div>
//                     <div>
//                       <strong>Furnishing:</strong> Unfurnished
//                     </div>
//                     <div>
//                       <strong>Location:</strong> {property.location}
//                     </div>
//                   </div>
//                   <p className={styles.propertyPrice}>₹ {property.price}</p>
//                   <div className={styles.buttonContainer}>
//                     <a
//                       href={`/new-properties/${property.slug}`}
//                       className={styles.viewDetailsBtn}
//                     >
//                       View Details
//                     </a>
//                     <a
//                       href={`/contact-owner/${property.slug}`}
//                       className={styles.contactOwnerBtn}
//                     >
//                       Contact Owner
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p>No properties found within the selected filters.</p>
//           )}
//           {hasMore && !loadingProperties && (
//             <div className={styles.showMoreBtn}>
//               <button onClick={loadMore} disabled={loadingMore}>
//                 {loadingMore ? "Loading..." : "Show More Properties ↓"}
//               </button>
//             </div>
//           )}
//         </div>
//         <button className={styles.filterButton} onClick={toggleFilterVisibility}>
//           {isFilterVisible ? "Hide Filters" : "Show Filters"}
//         </button>
//       </div>
//     </>
//   );
// };

// export default NewProperties; 






































// "use client";
// import { useEffect, useState } from "react";
// import styles from "./NewPropertiesDetails.module.css";
// import Navbar from "../../components/Navbar";
// import propData from "../new-properties/[slug]/prop.json";
// import axios from "axios";

// const NewProperties = () => {
//   const [isFilterVisible, setIsFilterVisible] = useState(false);
//   const [localProperties, setLocalProperties] = useState([]);
//   const [apiProperties, setApiProperties] = useState([]);
//   const [filteredProperties, setFilteredProperties] = useState([]);
//   const [loadingProperties, setLoadingProperties] = useState(false);
//   const [loadingMore, setLoadingMore] = useState(false);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const [error, setError] = useState(null);

//   const [filters, setFilters] = useState({
//     minBudget: 10000000, // Default: 1 Cr
//     maxBudget: 100000000, // Default: 10 Cr
//     possession: [],
//     configuration: [],
//     location: [],
//   });

//   const toggleFilterVisibility = () => {
//     setIsFilterVisible((prev) => !prev);
//   };

//   const priceOptions = [
//     { label: "10 Lacs", value: 1000000 },
//     { label: "20 Lacs", value: 2000000 },
//     { label: "30 Lacs", value: 3000000 },
//     { label: "50 Lacs", value: 5000000 },
//     { label: "1 Cr", value: 10000000 },
//     { label: "2 Cr", value: 20000000 },
//     { label: "5 Cr", value: 50000000 },
//     { label: "10 Cr", value: 100000000 },
//     { label: "100 Cr", value: 1000000000 },
//   ];

//   // Process local prop.json data
//   const processLocalData = () => {
//     const mappedData = propData.map((property) => {
//       const price = property.property_price || "Price on Request";
//       const label = property.property_label || "N/A";
    
//       const formattedPrice =
//         label.toLowerCase().includes("cr")
//           ? `${price} Cr`
//           : `${price} Lacs`;
    
//       const numericPrice = label.toLowerCase().includes("cr")
//         ? parseFloat(price) * 1e7
//         : parseFloat(price) * 1e5;
    
//       return {
//         id: property.ID,
//         title: property.post_title,
//         price: formattedPrice,
//         numericPrice,
//         label,
//         location: property.property_address?.replace(/\s+/g, " ") || "N/A",
//         carpet_area: property.Property_size
//           ? `${property.Property_size} sqft`
//           : "N/A",
//         possession_date: property.property_date
//           ? new Date(property.property_date).toLocaleDateString("en-US", {
//               year: "numeric",
//               month: "long",
//             })
//           : "N/A",
//         slug: property.slug,
//         image: property.images?.[0] || "default-image-url.jpg",
//         images: property.images || [],
//         source: 'local' // Add source identifier
//       };
//     });
//     setLocalProperties(mappedData);
//     return mappedData;
//   };

//   // Fetch properties from API
//   const fetchApiProperties = async (currentPage, append = false) => {
//     try {
//       const response = await axios.get('http://localhost:8000/api/properties', {
//         params: {
//           page: currentPage,
//           limit: 10
//         }
//       });

//       const data = response.data;
//       const mappedData = data.map((property) => {
//         const price = property.price || "Price on Request";
//         const label = property.propertyLabel || "N/A";
      
//         const formattedPrice =
//           price.toLowerCase().includes("cr")
//             ? price.replace(/[^0-9.]/g, '') + " Cr"
//             : price.replace(/[^0-9.]/g, '') + " Lacs";
      
//         const numericPrice = price.toLowerCase().includes("cr")
//           ? parseFloat(price.replace(/[^0-9.]/g, '')) * 1e7
//           : parseFloat(price.replace(/[^0-9.]/g, '')) * 1e5;
      
//         return {
//           id: property._id,
//           title: property.title,
//           price: formattedPrice,
//           numericPrice,
//           label,
//           location: property.location || "N/A",
//           carpet_area: "N/A", // or set to actual if available
//           possession_date: property.possessionDate
//             ? new Date(property.possessionDate).toLocaleDateString("en-US", {
//                 year: "numeric",
//                 month: "long",
//               })
//             : "N/A",
//           slug: property._id,
//           image: property.propertyImages?.[0] || "",
//           images: property.propertyImages || [],
//           source: 'api' // Add source identifier
//         };
//       });
      
//       if (!append) {
//         setApiProperties(mappedData);
//       } else {
//         setApiProperties(prev => [...prev, ...mappedData]);
//       }
      
//       return mappedData;
//     } catch (error) {
//       console.error("Error fetching API properties:", error);
//       setError("Failed to load properties from server. Showing local properties only.");
//       return [];
//     }
//   };

//   const fetchProperties = async (currentPage, append = false) => {
//     try {
//       if (!append) {
//         setLoadingProperties(true);
//         setError(null);
//       } else {
//         setLoadingMore(true);
//       }

//       // Load both local and API properties in parallel
//       const [localData, apiData] = await Promise.all([
//         processLocalData(),
//         fetchApiProperties(currentPage, append)
//       ]);

//       const combinedData = [...localData, ...apiData];
//       setHasMore(apiData.length >= 10); // Only API has pagination

//     } catch (error) {
//       console.error("Error fetching properties:", error);
//       setError("Failed to load some properties. Showing available data.");
//     } finally {
//       setLoadingProperties(false);
//       setLoadingMore(false);
//     }
//   };

//   useEffect(() => {
//     fetchProperties(1, false);
//     setPage(1);
//   }, [filters.minBudget, filters.maxBudget]);

//   const filterPropertiesLocally = () => {
//     const allProperties = [...localProperties, ...apiProperties];
//     const filtered = allProperties
//       .filter((property) => {
//         const possessionYear = new Date(property.possession_date).getFullYear();

//         return (
//           property.numericPrice >= filters.minBudget &&
//           property.numericPrice <= filters.maxBudget &&
//           (filters.possession.length === 0 ||
//             filters.possession.includes(possessionYear.toString())) &&
//           (filters.configuration.length === 0 ||
//             filters.configuration.includes(property.label)) &&
//           (filters.location.length === 0 ||
//             filters.location.includes(property.location))
//         );
//       })
//       .sort((a, b) => a.numericPrice - b.numericPrice);

//     setFilteredProperties(filtered);
//   };

//   useEffect(() => {
//     filterPropertiesLocally();
//   }, [localProperties, apiProperties, filters]);

//   const loadMore = async () => {
//     if (loadingMore || !hasMore) return;
//     const nextPage = page + 1;
//     try {
//       await fetchApiProperties(nextPage, true);
//       setPage(nextPage);
//     } catch (error) {
//       console.error("Error loading more properties:", error);
//     }
//   };

//   // Rest of your component code remains the same...
//   // (handleMinBudgetChange, handleMaxBudgetChange, handleFilterChange, refreshData, etc.)

//   return (
//     <>
//       <Navbar />
//       <div className={styles.mainContainer}>
//         {/* Filter UI remains the same */}
//         <div className={`${styles.filterContainer} ${isFilterVisible ? styles.open : ""}`}>
//           {/* ... existing filter code ... */}
//         </div>

//         <div className={styles.propertiesContainer}>
//           {error && (
//             <div className={styles.errorMessage}>
//               <p>{error}</p>
//               <button onClick={refreshData}>Retry</button>
//             </div>
//           )}
          
//           {loadingProperties ? (
//             <p>Loading properties...</p>
//           ) : filteredProperties.length > 0 ? (
//             filteredProperties.map((property) => (
//               <div key={`${property.source}-${property.id}`} className={styles.propertyBox}>
//                 <div className={styles.propertyImageCarousel}>
//                   {property.image ? (
//                     <img
//                       src={property.image}
//                       alt={property.title}
//                       className={styles.image}
//                       onError={(e) => {
//                         e.target.onerror = null;
//                         e.target.src = "";
//                         e.target.style.display = "none";
//                       }}
//                     />
//                   ) : (
//                     <div className={styles.noImagePlaceholder}>
//                       Image Coming Soon
//                     </div>
//                   )}
//                 </div>
//                 <div className={styles.propertyInfo}>
//                   <h2 className={styles.propertyTitle}>{property.title}</h2>
//                   <div className={styles.propertyDetails}>
//                     <div>
//                       <strong>Carpet Area:</strong> {property.carpet_area}
//                     </div>
//                     <div>
//                       <strong>Possession:</strong> {property.possession_date}
//                     </div>
//                     <div>
//                       <strong>Source:</strong> {property.source === 'local' ? 'Local' : 'API'}
//                     </div>
//                     <div>
//                       <strong>Location:</strong> {property.location}
//                     </div>
//                   </div>
//                   <p className={styles.propertyPrice}>₹ {property.price}</p>
//                   <div className={styles.buttonContainer}>
//                     <a
//                       href={`/new-properties/${property.slug}`}
//                       className={styles.viewDetailsBtn}
//                     >
//                       View Details
//                     </a>
//                     <a
//                       href={`/contact-owner/${property.slug}`}
//                       className={styles.contactOwnerBtn}
//                     >
//                       Contact Owner
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p>No properties found within the selected filters.</p>
//           )}
//           {hasMore && !loadingProperties && (
//             <div className={styles.showMoreBtn}>
//               <button onClick={loadMore} disabled={loadingMore}>
//                 {loadingMore ? "Loading..." : "Show More Properties ↓"}
//               </button>
//             </div>
//           )}
//         </div>
//         <button className={styles.filterButton} onClick={toggleFilterVisibility}>
//           {isFilterVisible ? "Hide Filters" : "Show Filters"}
//         </button>
//       </div>
//     </>
//   );
// };

// export default NewProperties;







// "use client";
// import { useEffect, useState } from "react";
// import styles from "./NewPropertiesDetails.module.css";
// import Navbar from "../../components/Navbar";
// import propData from "../new-properties/[slug]/prop.json";
// import axios from "axios";

// const NewProperties = () => {
//   // State management
//   const [isFilterVisible, setIsFilterVisible] = useState(true);
//   const [localProperties, setLocalProperties] = useState<any[]>([]);
//   const [apiProperties, setApiProperties] = useState<any[]>([]);
//   const [filteredProperties, setFilteredProperties] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [loadingMore, setLoadingMore] = useState(false);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // Filter state
//   const [filters, setFilters] = useState({
//     minBudget: 1000000, // 10 Lacs
//     maxBudget: 100000000, // 10 Cr
//     possession: [] as string[],
//     configuration: [] as string[],
//     location: [] as string[],
//   });

//   // Price options for dropdown
//   const priceOptions = [
//     { label: "10 Lacs", value: 1000000 },
//     { label: "20 Lacs", value: 2000000 },
//     { label: "30 Lacs", value: 3000000 },
//     { label: "50 Lacs", value: 5000000 },
//     { label: "1 Cr", value: 10000000 },
//     { label: "2 Cr", value: 20000000 },
//     { label: "5 Cr", value: 50000000 },
//     { label: "10 Cr", value: 100000000 },
//   ];

//   // Enhanced PropertyImage component with your image display logic
//   const PropertyImage = ({ images, alt }: { images: any[] | undefined, alt: string }) => {
//     if (!images || images.length === 0) {
//       return (
//         <div className={styles.noImages}>
//           <div className={styles.noImagesMessage}>No images available</div>
//         </div>
//       );
//     }

//     // Handle both string URLs (local) and object URLs (API)
//     const firstImage = images[0];
//     const imageUrl = typeof firstImage === 'string' ? firstImage : firstImage.url;

//     return (
//       <div className={styles.imageWrapper}>
//         <img
//           src={imageUrl}
//           alt={alt}
//           className={styles.image}
//           onError={(e) => {
//             (e.target as HTMLImageElement).src = '/placeholder.jpg';
//             (e.target as HTMLImageElement).className = `${styles.image} ${styles.placeholder}`;
//           }}
//           loading="lazy"
//         />
//       </div>
//     );
//   };

//   // Process local JSON data with image handling
//   const processLocalData = () => {
//     return propData.map((property) => ({
//       id: property.ID,
//       title: property.post_title,
//       price: property.property_price ? 
//             `${property.property_price} ${property.property_label?.includes("Cr") ? "Cr" : "Lacs"}` : 
//             "Price on Request",
//       numericPrice: property.property_price ? 
//                   (property.property_label?.includes("Cr") ? 
//                    parseFloat(property.property_price) * 10000000 : 
//                    parseFloat(property.property_price) * 100000) : 
//                   0,
//       label: property.property_label || "N/A",
//       location: property.property_address?.replace(/\s+/g, " ") || "N/A",
//       carpet_area: property.Property_size ? `${property.Property_size} sqft` : "N/A",
//       possession_date: property.property_date ?
//                       new Date(property.property_date).toLocaleDateString("en-US", {
//                         year: "numeric",
//                         month: "long",
//                       }) : "N/A",
//       slug: property.slug,
//       images: property.images || [],
//       source: 'local'
//     }));
//   };

//   // Fetch API data with proper image handling
//   const fetchApiProperties = async (page = 1) => {
//     try {
//       const response = await axios.get('http://localhost:8000/api/properties', {
//         params: { page, limit: 100}
//       });
      
//       return response.data.map((property: any) => ({
//         id: property._id,
//         title: property.title,
//         price: property.price || "Price on Request",
//         numericPrice: property.price ? 
//                     (property.price.includes("Cr") ? 
//                      parseFloat(property.price.replace(/[^0-9.]/g, '')) * 10000000 : 
//                      parseFloat(property.price.replace(/[^0-9.]/g, '')) * 100000) : 
//                     0,
//         label: property.propertyLabel || "N/A",
//         location: property.location || "N/A",
//         carpet_area: "N/A",
//         possession_date: property.possessionDate ?
//                         new Date(property.possessionDate).toLocaleDateString("en-US", {
//                           year: "numeric",
//                           month: "long",
//                         }) : "N/A",
//         slug: property.slug,
//         images: property.propertyImages || [],
//         source: 'api'
//       }));
//     } catch (err) {
//       console.error("API Error:", err);
//       setError("Failed to load some properties. Showing available data.");
//       return [];
//     }
//   };

//   // Load all properties
//   const loadProperties = async () => {
//     setLoading(true);
//     try {
//       const [apiData,localData ] = await Promise.all([
//         fetchApiProperties(1),
//         Promise.resolve(processLocalData())
      
//       ]);
      
//       setLocalProperties(localData);
//       setApiProperties(apiData);
//       setHasMore(apiData.length > 0);
//     } catch (err) {
//       console.error("Loading Error:", err);
//       setError("Failed to load properties");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Load more API properties
//   const loadMore = async () => {
//     if (loadingMore || !hasMore) return;
//     setLoadingMore(true);
    
//     try {
//       const nextPage = page + 1;
//       const newData = await fetchApiProperties(nextPage);
      
//       if (newData.length > 0) {
//         setApiProperties(prev => [...prev, ...newData]);
//         setPage(nextPage);
//       } else {
//         setHasMore(false);
//       }
//     } catch (err) {
//       console.error("Load More Error:", err);
//     } finally {
//       setLoadingMore(false);
//     }
//   };

//   // Apply filters
//   useEffect(() => {
//     const allProperties = [...apiProperties,...localProperties];
    
//     const filtered = allProperties.filter(property => {
//       const matchesBudget = property.numericPrice >= filters.minBudget && 
//                           property.numericPrice <= filters.maxBudget;
      
//       const matchesPossession = filters.possession.length === 0 || 
//                               filters.possession.includes(
//                                 new Date(property.possession_date).getFullYear().toString()
//                               );
      
//       const matchesConfig = filters.configuration.length === 0 || 
//                           filters.configuration.some(config => 
//                             property.label.includes(config)
//                           );
      
//       const matchesLocation = filters.location.length === 0 || 
//                             filters.location.some(loc => 
//                               property.location.includes(loc)
//                             );
      
//       return matchesBudget && matchesPossession && matchesConfig && matchesLocation;
//     }).sort((a, b) => {
//       // API properties first
//       if (a.source !== b.source) {
//         return a.source === 'api' ? -1 : 1;
//       }
//       // Then sort by price (optional)
//       return a.numericPrice - b.numericPrice;
//     });
    
//     setFilteredProperties(filtered);
//   }, [localProperties, apiProperties, filters]);

//   // Initial load
//   useEffect(() => {
//     loadProperties();
//   }, []);

//   // Filter handlers
//   const handleBudgetChange = (e: React.ChangeEvent<HTMLSelectElement>, type: 'minBudget' | 'maxBudget') => {
//     const value = parseInt(e.target.value);
//     setFilters(prev => ({
//       ...prev,
//       [type]: value,
//       ...(type === 'minBudget' && { maxBudget: Math.max(value, prev.maxBudget) }),
//       ...(type === 'maxBudget' && { minBudget: Math.min(value, prev.minBudget) })
//     }));
//   };

//   const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value, checked } = e.target;
//     setFilters(prev => ({
//       ...prev,
//       [name]: checked 
//         ? [...prev[name as keyof typeof prev], value] 
//         : (prev[name as keyof typeof prev] as string[]).filter(item => item !== value)
//     }));
//   };

//   const resetFilters = () => {
//     setFilters({
//       minBudget: 1000000,
//       maxBudget: 100000000,
//       possession: [],
//       configuration: [],
//       location: [],
//     });
//   };

//   return (
//     <>
//       <Navbar />
//       <div className={styles.mainContainer}>
//         {/* Filter Sidebar */}
//         <aside className={`${styles.filterSidebar} ${isFilterVisible ? styles.visible : ''}`}>
//           <div className={styles.filterHeader}>
//             <h3>Filters</h3>
//             <button onClick={resetFilters} className={styles.resetBtn}>
//               Reset All
//             </button>
//           </div>

//           {/* Budget Range Filter */}
//           <div className={styles.filterSection}>
//             <h4>Budget Range (₹)</h4>
//             <div className={styles.budgetInputs}>
//               <div>
//                 <label>Min:</label>
//                 <select
//                   value={filters.minBudget}
//                   onChange={(e) => handleBudgetChange(e, 'minBudget')}
//                 >
//                   {priceOptions
//                     .filter(opt => opt.value < filters.maxBudget)
//                     .map(opt => (
//                       <option key={`min-${opt.value}`} value={opt.value}>
//                         {opt.label}
//                       </option>
//                     ))}
//                 </select>
//               </div>
//               <div>
//                 <label>Max:</label>
//                 <select
//                   value={filters.maxBudget}
//                   onChange={(e) => handleBudgetChange(e, 'maxBudget')}
//                 >
//                   {priceOptions
//                     .filter(opt => opt.value > filters.minBudget)
//                     .map(opt => (
//                       <option key={`max-${opt.value}`} value={opt.value}>
//                         {opt.label}
//                       </option>
//                     ))}
//                 </select>
//               </div>
//             </div>
//           </div>

//           {/* Possession Year Filter */}
//           <div className={styles.filterSection}>
//             <h4>Possession Year</h4>
//             <div className={styles.checkboxGroup}>
//               {['2023', '2024', '2025', '2026', '2027', '2028'].map(year => (
//                 <label key={year} className={styles.checkboxLabel}>
//                   <input
//                     type="checkbox"
//                     name="possession"
//                     value={year}
//                     checked={filters.possession.includes(year)}
//                     onChange={handleCheckboxChange}
//                   />
//                   {year}
//                 </label>
//               ))}
//             </div>
//           </div>

//           {/* Configuration Filter */}
//           <div className={styles.filterSection}>
//             <h4>Configuration</h4>
//             <div className={styles.checkboxGroup}>
//               {['1 BHK', '2 BHK', '3 BHK', '4 BHK', '5 BHK'].map(config => (
//                 <label key={config} className={styles.checkboxLabel}>
//                   <input
//                     type="checkbox"
//                     name="configuration"
//                     value={config}
//                     checked={filters.configuration.includes(config)}
//                     onChange={handleCheckboxChange}
//                   />
//                   {config}
//                 </label>
//               ))}
//             </div>
//           </div>

//           {/* Location Filter */}
//           <div className={styles.filterSection}>
//             <h4>Location</h4>
//             <div className={styles.checkboxGroup}>
//               {['Mumbai', 'Navi Mumbai', 'Thane', 'Panvel', 'Pune'].map(location => (
//                 <label key={location} className={styles.checkboxLabel}>
//                   <input
//                     type="checkbox"
//                     name="location"
//                     value={location}
//                     checked={filters.location.includes(location)}
//                     onChange={handleCheckboxChange}
//                   />
//                   {location}
//                 </label>
//               ))}
//             </div>
//           </div>
//         </aside>

//         {/* Main Content */}
//         <main className={styles.propertyListing}>
//           {/* Toggle Filter Button */}
//           <button 
//             className={styles.filterToggle}
//             onClick={() => setIsFilterVisible(!isFilterVisible)}
//           >
//             {isFilterVisible ? 'Hide Filters' : 'Show Filters'}
//           </button>

//           {/* Property Grid */}
//           {loading ? (
//             <div className={styles.loading}>Loading properties...</div>
//           ) : error ? (
//             <div className={styles.error}>
//               <p>{error}</p>
//               <button onClick={loadProperties}>Retry</button>
//             </div>
//           ) : filteredProperties.length > 0 ? (
//             <>
//               <div className={styles.propertyGrid}>
//                 {filteredProperties.map(property => (
//                   <div key={`${property.source}-${property.id}`} className={styles.propertyCard}>
//                     <div className={styles.cardImage}>
//                       <PropertyImage images={property.images} alt={property.title} />
//                     </div>
//                     <div className={styles.cardBody}>
//                       <h3>{property.title}</h3>
//                       <div className={styles.price}>₹ {property.price}</div>
//                       <div className={styles.details}>
//                         <span><strong>Location:</strong> {property.location}</span>
//                         <span><strong>Size:</strong> {property.carpet_area}</span>
//                         <span><strong>Possession:</strong> {property.possession_date}</span>
//                       </div>
//                       <div className={styles.cardFooter}>
//                         <a href={`/new-properties/${property.slug}`} className={styles.detailsBtn}>
//                           View Details
//                         </a>
//                         <a href={`/contact-owner/${property.slug}`} className={styles.contactBtn}>
//                           Contact
//                         </a>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {hasMore && (
//                 <div className={styles.loadMore}>
//                   <button 
//                     onClick={loadMore} 
//                     disabled={loadingMore}
//                     className={styles.loadMoreBtn}
//                   >
//                     {loadingMore ? 'Loading...' : 'Load More Properties'}
//                   </button>
//                 </div>
//               )}
//             </>
//           ) : (
//             <div className={styles.noResults}>
//               <p>No properties match your filters.</p>
//               <button onClick={resetFilters} className={styles.resetFiltersBtn}>
//                 Reset Filters
//               </button>
//             </div>
//           )}
//         </main>
//       </div>
//     </>
//   );
// };

// export default NewProperties;
"use client";
import { useEffect, useState } from "react";
import styles from "./NewPropertiesDetails.module.css";
import Navbar from "../../components/Navbar";
import propData from "../new-properties/[slug]/prop.json";
import axios from "axios";

const NewProperties = () => {
  const [isFilterVisible, setIsFilterVisible] = useState(true);
  const [localProperties, setLocalProperties] = useState<any[]>([]);
  const [apiProperties, setApiProperties] = useState<any[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState({
    minBudget: 1000000,
    maxBudget: 100000000,
    possession: [] as string[],
    configuration: [] as string[],
    location: [] as string[],
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
  ];

  const PropertyImage = ({ images, alt }: { images?: any[]; alt: string }) => {
    if (!images?.length) {
      return (
        <div className={styles.noImages}>
          <div className={styles.noImagesMessage}>No images available</div>
        </div>
      );
    }
    const first = images[0];
    const url = typeof first === "string" ? first : first.url;
    return (
      <div className={styles.imageWrapper}>
        <img
          src={url}
          alt={alt}
          className={styles.image}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = "/placeholder.jpg";
            e.currentTarget.className = `${styles.image} ${styles.placeholder}`;
          }}
        />
      </div>
    );
  };

  const processLocalData = () =>
    propData.map((p) => ({
      id: p.ID,
      title: p.post_title,
      price: p.property_price
        ? `${p.property_price} ${p.property_label?.includes("Cr") ? "Cr" : "Lacs"}`
        : "Price on Request",
      numericPrice: p.property_price
        ? (p.property_label?.includes("Cr")
            ? parseFloat(p.property_price) * 1e7
            : parseFloat(p.property_price) * 1e5)
        : 0,
      label: p.property_label || "N/A",
      location: p.property_address?.replace(/\s+/g, " ") || "N/A",
      carpet_area: p.Property_size ? `${p.Property_size} sqft` : "N/A",
      possession_date: p.property_date
        ? new Date(p.property_date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
          })
        : "N/A",
      slug: p.slug,
      images: p.images || [],
      source: "local" as const,
    }));

  const fetchApiProperties = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/api/properties");
      return data.map((p: any) => ({
        id: p._id,
        title: p.title,
        price: p.price || "Price on Request",
        numericPrice: p.price
          ? p.price.toLowerCase().includes("cr")
            ? parseFloat(p.price.replace(/[^0-9.]/g, "")) * 1e7
            : parseFloat(p.price.replace(/[^0-9.]/g, "")) * 1e5
          : 0,
        label: p.propertyLabel || "N/A",
        location: p.location || "N/A",
        carpet_area: "N/A",
        possession_date: p.possessionDate
          ? new Date(p.possessionDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
            })
          : "N/A",
        slug: p.slug || "",
        images: p.propertyImages || [],
        plans: p.plans || [],
        source: "api" as const,
      }));
    } catch (err) {
      console.error("API Error:", err);
      setError("Failed to load backend properties");
      return [];
    }
  };

  const loadProperties = async () => {
    setLoading(true);
    try {
      const [apiData, localData] = await Promise.all([
        fetchApiProperties(),
        Promise.resolve(processLocalData()),
      ]);
      setApiProperties(apiData);
      setLocalProperties(localData);
    } catch {
      setError("Failed to load properties");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProperties();
  }, []);

  useEffect(() => {
    const all = [...apiProperties, ...localProperties];
    const filtered = all
      .filter((p) => {
        const mb = p.numericPrice >= filters.minBudget;
        const mb2 = p.numericPrice <= filters.maxBudget;
        const yearOK =
          !filters.possession.length ||
          filters.possession.includes(
            new Date(p.possession_date).getFullYear().toString()
          );

        const cfgOK =
          !filters.configuration.length ||
          (p.source === "api"
            ? filters.configuration.some((cfg) =>
                p.plans?.some((plan: string) =>
                  plan
                    .replace(/\s+/g, "")
                    .toLowerCase()
                    .includes(cfg.replace(/\s+/g, "").toLowerCase())
                )
              )
            : filters.configuration.some((cfg) =>
                p.label
                  .replace(/\s+/g, "")
                  .toLowerCase()
                  .includes(cfg.replace(/\s+/g, "").toLowerCase())
              ));

        const locOK =
          !filters.location.length ||
          filters.location.some((l) =>
            p.location.toLowerCase().includes(l.toLowerCase())
          );

        return mb && mb2 && yearOK && cfgOK && locOK;
      })
      .sort((a, b) => {
        if (a.source !== b.source) return a.source === "api" ? -1 : 1;
        return a.numericPrice - b.numericPrice;
      });
    setFilteredProperties(filtered);
  }, [apiProperties, localProperties, filters]);

  const handleBudgetChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    type: "minBudget" | "maxBudget"
  ) => {
    const val = +e.target.value;
    setFilters((f) => ({
      ...f,
      [type]: val,
      ...(type === "minBudget" && { maxBudget: Math.max(val, f.maxBudget) }),
      ...(type === "maxBudget" && { minBudget: Math.min(val, f.minBudget) }),
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setFilters((f) => ({
      ...f,
      [name]: checked
        ? [...(f as any)[name], value]
        : (f as any)[name].filter((v: string) => v !== value),
    }));
  };

  const resetFilters = () =>
    setFilters({
      minBudget: 1000000,
      maxBudget: 100000000,
      possession: [],
      configuration: [],
      location: [],
    });

  return (
    <>
      <Navbar />
      <div className={styles.mainContainer}>
        <aside
          className={`${styles.filterSidebar} ${
            isFilterVisible ? styles.visible : ""
          }`}
        >
          <div className={styles.filterHeader}>
            <h3>Filters</h3>
            <button onClick={resetFilters} className={styles.resetBtn}>
              Reset All
            </button>
          </div>

          <div className={styles.filterSection}>
            <h4>Budget Range (₹)</h4>
            <div className={styles.budgetInputs}>
              <div>
                <label>Min:</label>
                <select
                  value={filters.minBudget}
                  onChange={(e) => handleBudgetChange(e, "minBudget")}
                >
                  {priceOptions
                    .filter((o) => o.value < filters.maxBudget)
                    .map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <label>Max:</label>
                <select
                  value={filters.maxBudget}
                  onChange={(e) => handleBudgetChange(e, "maxBudget")}
                >
                  {priceOptions
                    .filter((o) => o.value > filters.minBudget)
                    .map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>

          <div className={styles.filterSection}>
            <h4>Possession Year</h4>
            <div className={styles.checkboxGroup}>
              {["2023", "2024", "2025", "2026", "2027", "2028"].map((y) => (
                <label key={y} className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="possession"
                    value={y}
                    checked={filters.possession.includes(y)}
                    onChange={handleCheckboxChange}
                  />
                  {y}
                </label>
              ))}
            </div>
          </div>

          <div className={styles.filterSection}>
            <h4>Configuration</h4>
            <div className={styles.checkboxGroup}>
              {["1 BHK", "2 BHK", "3 BHK", "4 BHK", "5 BHK"].map((cfg) => (
                <label key={cfg} className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="configuration"
                    value={cfg}
                    checked={filters.configuration.includes(cfg)}
                    onChange={handleCheckboxChange}
                  />
                  {cfg}
                </label>
              ))}
            </div>
          </div>

          <div className={styles.filterSection}>
            <h4>Location</h4>
            <div className={styles.checkboxGroup}>
              {["Mumbai", "Navi Mumbai", "Thane", "Panvel", "Pune"].map(
                (loc) => (
                  <label key={loc} className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      name="location"
                      value={loc}
                      checked={filters.location.includes(loc)}
                      onChange={handleCheckboxChange}
                    />
                    {loc}
                  </label>
                )
              )}
            </div>
          </div>
        </aside>

        <main className={styles.propertyListing}>
          <button
            className={styles.filterToggle}
            onClick={() => setIsFilterVisible((v) => !v)}
          >
            {isFilterVisible ? "Hide Filters" : "Show Filters"}
          </button>

          {loading ? (
            <div className={styles.loading}>Loading properties...</div>
          ) : error ? (
            <div className={styles.error}>
              <p>{error}</p>
              <button onClick={loadProperties}>Retry</button>
            </div>
          ) : filteredProperties.length ? (
            <div className={styles.propertyGrid}>
              {filteredProperties.map((p) => (
                <div key={`${p.source}-${p.id}`} className={styles.propertyCard}>
                  <div className={styles.cardImage}>
                    <PropertyImage images={p.images} alt={p.title} />
                  </div>
                  <div className={styles.cardBody}>
                    <h3>{p.title}</h3>
                    <div className={styles.price}>₹ {p.price}</div>
                    <div className={styles.details}>
                      <span>
                        <strong>Location:</strong> {p.location}
                      </span>
                      <span>
                        <strong>Size:</strong> {p.carpet_area}
                      </span>
                      <span>
                        <strong>Possession:</strong> {p.possession_date}
                      </span>
                    </div>
                    <div className={styles.cardFooter}>
                      <a
                        href={`/new-properties/${p.slug}`}
                        className={styles.detailsBtn}
                      >
                        View Details
                      </a>
                      <a
                        href={`/contact-owner/${p.slug}`}
                        className={styles.contactBtn}
                      >
                        Contact
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.noResults}>
              <p>No properties match your filters.</p>
              <button
                onClick={resetFilters}
                className={styles.resetFiltersBtn}
              >
                Reset Filters
              </button>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default NewProperties;
