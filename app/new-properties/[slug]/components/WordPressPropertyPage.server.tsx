// WordPressPropertyPage.server.tsx (Server Component)
import React from 'react';
import WordPressPropertyPageClient from './WordPressPropertyPageClient';

async function fetchAmenities(postId: number) {
  try {
    const response = await fetch(
      `https://www.propertyplateau.com/wp-json/wp/v2/property_features?post=${postId}&per_page=100`
    );
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch amenities:', error);
    return [];
  }
}

export default async function WordPressPropertyPageServer({
  property,
}: {
  property: WordPressProperty;
}) {
  // Ensure property is defined and has slug
  if (!property || !property.slug) {
    return <div className="p-4 text-red-500">WordPress property data missing or incomplete</div>;
  }

  // Fetch amenities server-side
  const amenities = await fetchAmenities(property.id);

  // Pass data to the client-side component
  return <WordPressPropertyPageClient property={property} amenities={amenities} />;
}
