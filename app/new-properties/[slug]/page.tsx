import { Suspense } from 'react';
import WordPressPropertyPage from "./components/WordPressPropertyPage";
import CustomPropertyPage from "./components/CustomPropertyPage";
import { notFound } from 'next/navigation';
import PropertyPageSkeleton from './components/PropertyPageSkeleton';
import WordPressPropertyPageServer from './components/WordPressPropertyPage.server';

interface CustomProperty {
  _id: string;
  title: string;
  createdAt: string;
  location: string;
  price: string;
  description?: string;
  possessionDate: string;
  propertyImages: Array<{
    url: string;
    filename?: string;
    originalname?: string;
    mimetype?: string;
    size?: number;
  }>;
  propertyVideo?: {
    url: string;
    filename?: string;
  };
  amenities: string[];
  plans: string[];
  slug: string;
}

interface WordPressProperty {
  id: number;
  title: {
    rendered: string;
  };
  date: string;
  content: {
    rendered: string;
  };
  acf: {
    location: string;
    price: string;
    possession_date: string;
    property_images: Array<{
      url: string;
    }>;
    property_video?: {
      url: string;
    };
    amenities: string[];
    plans: string[];
    property_latitude?: string;
    property_longitude?: string;
    property_address?: string;
    property_price?: string;
    property_label?: string;
    property_date?: string;
  };
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
    }>;
  };
  slug?: string;
}

async function getPropertyData(slug: string) {
  try {
    // First try to fetch from your custom API
    const apiResponse = await fetch(
      `https://backend-server-1smb.onrender.com/api/properties/${slug}`,
      { next: { revalidate: 60 } }
    );
    console.log('API Response:', apiResponse.ok, apiResponse.status, apiResponse.statusText);

    if (apiResponse.ok) {
      const property: CustomProperty = await apiResponse.json();
      return { type: 'custom', property };
    }

    // If not found in custom API, try WordPress
    const wpResponse = await fetch(
      `https://www.propertyplateau.com/wp-json/wp/v2/estate_property?slug=${slug}&_embed`,
      { next: { revalidate: 3600 } }
    );

    if (wpResponse.ok) {
      const wpProperties: WordPressProperty[] = await wpResponse.json();
      if (wpProperties.length > 0) {
        const wpProperty = wpProperties[0];
        // Ensure slug exists (some responses may not include it)
        wpProperty.slug = wpProperty.slug || slug;
        return { type: 'wordpress', property: wpProperty };
      }
    }

    return null;
  } catch (error) {
    console.error('Error fetching property:', error);
    return null;
  }
}

// Static metadata - avoids the params.slug error
export async function generateMetadata() {
  return {
    title: "Property Details | Property Plateau",
    description: "View property details on Property Plateau",
  };
}

export default async function PropertyPage({ params }: { params: { slug: string } }) {
  const propertyData = await getPropertyData(params.slug);
  console.log(propertyData, 'Property Data');

  if (!propertyData) {
    notFound();
  }

  const pageTitle =
    propertyData.type === 'custom'
      ? `${propertyData.property.title} | Property Plateau`
      : `${propertyData.property.title.rendered} | Property Plateau`;

  const pageDescription =
    propertyData.type === 'custom'
      ? propertyData.property.description || `View details for ${propertyData.property.title}`
      : `View details for ${propertyData.property.title.rendered}`;

  const amenities =
    propertyData.type === 'wordpress' && propertyData.property.acf
      ? propertyData.property.acf.amenities || []
      : [];

  return (
    <>
      <head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={`/new-properties/${params.slug}`} />
      </head>

      <main className="container mx-auto px-4 py-8">
        <Suspense fallback={<PropertyPageSkeleton />}>
          {propertyData.type === 'custom' ? (
            <CustomPropertyPage property={propertyData.property} />
          ) : (
            <WordPressPropertyPageServer
              property={propertyData.property}
              amenities={amenities}
            />
          )}
        </Suspense>
      </main>
    </>
  );
}
