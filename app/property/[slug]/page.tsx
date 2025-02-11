import React from "react";
import Head from "next/head";
import SemiHeader from "../components/SemiHeader";
import Form from "../../../components/Form";
import propData from "./prop.json";
import NavBar from "@/components/Navbar";
import ImageGallery from "../components/ImageGallery";
import Description from "../components/Description";
import Amenities from "../components/Amenities";
import YouTubeVideo from "../components/YouTubeVideo";
import Location from "../components/Location";
import FloorPlan from "../components/FloorPlan";


async function fetchAllAmenities(postId: number) {
  let allAmenities: any[] = [];
  let page = 1;
  let totalPages = 1;

  do {
    const response = await fetch(
      `https://www.propertyplateau.com/wp-json/wp/v2/property_features?post=${postId}&per_page=100&page=${page}`
    );
    const data = await response.json();

    // Check if the total pages header is provided
    if (response.headers.has("X-WP-TotalPages")) {
      totalPages = parseInt(response.headers.get("X-WP-TotalPages") || "1", 10);
    }

    // Append the current page of amenities to the result
    allAmenities = [...allAmenities, ...data];
    page++;
  } while (page <= totalPages);

  return allAmenities;
}

export default async function PropertyPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  try {
    // Fetch property data
    const response = await fetch(
      `https://www.propertyplateau.com/wp-json/wp/v2/estate_property?slug=${slug}&_embed`,
      { cache: "no-store" }
    );
    const propertyData = await response.json();

    if (propertyData.length > 0) {
      const property = propertyData[0];

      // Fetch all amenities for this property
      const amenitiesData = await fetchAllAmenities(property.id);

      // Extract Property Details
      const title = property.title.rendered || "Property Details";
      const subtitle = "Apartment by PROPERTY Plateau";
      const lastModifiedDate = property.modified
        ? new Date(property.modified).toLocaleDateString()
        : "N/A";

      const additionalDetails = propData.find((p) => p.ID === property.id);
      const location =
        additionalDetails?.property_address ||
        additionalDetails?.city ||
        "Location not available";

      const propertyPrice = additionalDetails?.property_price || "NA";
      const propertyLabel = additionalDetails?.property_label || "";
      const combinedPrice = `${propertyPrice} ${propertyLabel}`;
      const propertyDate = additionalDetails?.property_date || "Possession date not available";
      const floorPlans = additionalDetails?.plans || [];



      const propertyID = property.id;
      const description = property.content.rendered || "Description not available.";

      return (
        <div>
          <Head>
            <title>{title}</title>
          </Head>

          {/* NavBar Component */}
          <NavBar />

          {/* SemiHeader Component */}
          <SemiHeader
            title={title}
            subtitle={subtitle}
            location={location}
            price={combinedPrice}
            possessionDate={propertyDate} // Pass possession date
          />

          {/* Image Gallery */}
          <div style={{ padding: "20px 40px" }}>
            <ImageGallery propertyID={propertyID} />
          </div>

          {/* Description */}
          {/* <Description content={description} /> */}

          {/* Amenities Component */}
          <div style={{ padding: "20px 40px" }}>
            <Amenities amenities={amenitiesData} />
          </div>

            {/* YouTube Video Component */}
            <YouTubeVideo propertyId={property.id} />

            <Location propertyId={propertyID} />

            <div style={{ padding: "20px 40px" }}>
                 <FloorPlan plans={floorPlans} />
              </div>


          {/* Contact Form */}
          <div style={{ padding: "20px 40px" }}>
            <Form propertyId={property.id} />
          </div>
        </div>
      );
    } else {
      return <div>No property found for the given slug.</div>;
    }
  } catch (error) {
    console.error("Error fetching property:", error);
    return <div>Error fetching property.</div>;
  }
}
