import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.contentstack.io',
        pathname: '/v3/assets/**',
      },
    ],
    deviceSizes: [300, 400, 640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
  async headers() {
    return [
      {
        // Apply to all routes
        source: '/:path*',
        headers: [
          {
            key: 'x-robots-tag',
            value: 'index, follow', // Explicitly allow indexing
          },
        ],
      },
    ];
  },
};

export default nextConfig;
