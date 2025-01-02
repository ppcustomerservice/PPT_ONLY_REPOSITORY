// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
      ignoreDuringBuilds: true, // Ignore ESLint errors during build
    },
    typescript: {
      ignoreBuildErrors: true, // Ignore TypeScript errors during build
    },
    i18n: {
      locales: ['en', 'hi', 'mr'], // English, Hindi, Marathi
      defaultLocale: 'en',
    },
    images: {
      domains: ['www.propertyplateau.com'],
    },
  };
  
  export default nextConfig;
  