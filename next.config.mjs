/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure we are strict about React
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.sacred-texts.com',
        pathname: '/tarot/pkt/img/**',
      },
    ],
  },
};

export default nextConfig;