import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Doesn't work with Turbopack yet 😒
  // experimental: {
  //   typedRoutes: true,
  // },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        port: '',
        pathname: '/t/p/**',
      },
    ],
  },
};

export default nextConfig;
