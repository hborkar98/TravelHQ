/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'via.placeholder.com' },
      { protocol: 'https', hostname: 'api.mapbox.com' },
    ],
  },
  webpack: (config, { isServer }) => {
    // Mapbox GL requires these to be excluded from server bundle
    if (isServer) {
      config.externals = [...(config.externals || []), 'mapbox-gl'];
    }
    return config;
  },
};

export default nextConfig;
