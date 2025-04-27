// // import WordPressPropertyPage from "./components/WordPressPropertyPage";
// // import CustomPropertyPage from "./components/CustomPropertyPage";
// // import { notFound } from 'next/navigation';

// // interface CustomProperty {
// //   _id: string;
// //   title: string;
// //   createdAt: string;
// //   location: string;
// //   price: string;
// //   possessionDate: string;
// //   propertyImages: string[];
// //   amenities: string[];
// //   plans: any[];
// //   videoId?: string;
// // }

// // export default async function PropertyPage({ params }: { params: { slug: string } }) {
// //   try {
// //     const { slug } = params;
// //     console.log('Fetching property for slug:', slug);

// //     // 1. Try custom API first
// //     const apiResponse = await fetch(
// //       `http://localhost:8000/api/properties/${slug}`,
// //       { next: { revalidate: 60 } } // Revalidate every 60 seconds
// //     );

// //     if (apiResponse.ok) {
// //       const property: CustomProperty = await apiResponse.json();
// //       const createdAt = new Date(property.createdAt);
// //       const cutoffDate = new Date('2025-04-08'); // Your cutoff date

// //       if (createdAt >= cutoffDate) {
// //         console.log('Using custom API property:', property._id);
// //         return <CustomPropertyPage property={property} />;
// //       }
// //     }

// //     // 2. Fallback to WordPress API
// //     const wpResponse = await fetch(
// //       `https://www.propertyplateau.com/wp-json/wp/v2/estate_property?slug=${slug}&_embed`,
// //       { next: { revalidate: 3600 } } // Revalidate hourly
// //     );

// //     if (wpResponse.ok) {
// //       const wpProperties = await wpResponse.json();
// //       if (wpProperties.length > 0) {
// //         console.log('Using WordPress property:', wpProperties[0].id);
// //         return <WordPressPropertyPage property={wpProperties[0]} />;
// //       }
// //     }

// //     // 3. If neither API has the property
// //     console.warn('Property not found in either API');
// //     return notFound();

// //   } catch (error) {
// //     console.error('Property page error:', error);
// //     return notFound();
// //   }
// // }
// import { Suspense } from 'react';
// import WordPressPropertyPage from "./components/WordPressPropertyPage";
// import CustomPropertyPage from "./components/CustomPropertyPage";
// import { notFound } from 'next/navigation';
// import PropertyPageSkeleton from './components/PropertyPageSkeleton';

// interface CustomProperty {
//   _id: string;
//   title: string;
//   createdAt: string;
//   location: string;
//   price: string;
//   possessionDate: string;
//   propertyImages: string[];
//   amenities: string[];
//   plans: any[];
//   videoId?: string;
// }

// async function getPropertyData(slug: string) {
//   try {
//     // 1. Try custom API first
//     const apiResponse = await fetch(
//       `http://localhost:8000/api/properties/${slug}`,
//       { next: { revalidate: 60 } }
//     );

//     if (apiResponse.ok) {
//       const property: CustomProperty = await apiResponse.json();
//       const createdAt = new Date(property.createdAt);
//       const cutoffDate = new Date('2025-04-08');

//       if (createdAt >= cutoffDate) {
//         return { type: 'custom', property };
//       }
//     }

//     // 2. Fallback to WordPress API
//     const wpResponse = await fetch(
//       `https://www.propertyplateau.com/wp-json/wp/v2/estate_property?slug=${slug}&_embed`,
//       { next: { revalidate: 3600 } }
//     );

//     if (wpResponse.ok) {
//       const wpProperties = await wpResponse.json();
//       if (wpProperties.length > 0) {
//         return { type: 'wordpress', property: wpProperties[0] };
//       }
//     }

//     return null;
//   } catch (error) {
//     console.error('Error fetching property:', error);
//     return null;
//   }
// }

// // This is the key change - we make the component synchronous
// export default function PropertyPage({ params }: { params: { slug: string } }) {
//   return (
//     <Suspense fallback={<PropertyPageSkeleton />}>
//       {/* We pass the entire params object */}
//       <PropertyContent params={params} />
//     </Suspense>
//   );
// }


// // The async operation happens in this nested component
// async function PropertyContent({ params }: { params: { slug: string } }) {
//   const propertyData = await getPropertyData(params.slug);

//   if (!propertyData) {
//     return notFound();
//   }

//   return propertyData.type === 'custom' ? (
//     <CustomPropertyPage property={propertyData.property} />
//   ) : (
//     <WordPressPropertyPage property={propertyData.property} />
//   );
// }

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
  };
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
    }>;
  };
  slug: string;
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
        return { type: 'wordpress', property: wpProperties[0] };
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

  // Dynamic metadata set client-side
  const pageTitle = propertyData.type === 'custom' 
    ? `${propertyData.property.title} | Property Plateau`
    : `${propertyData.property.title.rendered} | Property Plateau`;

  const pageDescription = propertyData.type === 'custom'
    ? propertyData.property.description || `View details for ${propertyData.property.title}`
    : `View details for ${propertyData.property.title.rendered}`;

    const amenities = propertyData.type === 'wordpress' && propertyData.property.acf
    ? propertyData.property.acf.amenities || []  // If amenities is missing, default to an empty array
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
            // <WordPressPropertyPage property={propertyData.property} />
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