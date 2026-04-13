/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  reactStrictMode: true,
  images: {
    domains: [],
  },
  webpack: (config) => {
    config.externals = config.externals || [];
    return config;
  },
};

module.exports = nextConfig;