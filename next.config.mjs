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
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'holidayhomesdatabase.s3.ap-south-1.amazonaws.com',
          port: '',
          pathname: '/images/**',
        },
      ],
    },
  };
  
  export default nextConfig;
  