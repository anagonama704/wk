/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/Work", destination: "/work", permanent: true },
      { source: "/About", destination: "/about", permanent: true },
      { source: "/Contact", destination: "/contact", permanent: true },
    ];
  },
};

module.exports = nextConfig;
