/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com', "res-console.cloudinary.com"],
  }
};

module.exports = nextConfig;
