/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: "/home",
        destination: "/",
      },
      {
        source: "/about",
        destination: "/",
      },
      {
        source: "/experience",
        destination: "/",
      },
      {
        source: "/education",
        destination: "/",
      },
      {
        source: "/skills",
        destination: "/",
      },
      {
        source: "/certifications",
        destination: "/",
      },
      {
        source: "/contact",
        destination: "/",
      },
    ];
  },
};

export default nextConfig;
