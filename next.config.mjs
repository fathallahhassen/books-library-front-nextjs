/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: undefined,
  },
  images: {
    domains: ['www.gutenberg.org'],
  },
};

export default nextConfig;