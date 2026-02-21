/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['mapbox-gl'],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'mapbox-gl': 'mapbox-gl',
    };
    return config;
  },
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com', 'api.mapbox.com'],
  },
};

export default nextConfig;
