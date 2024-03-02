/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "reliable-chickadee-921.convex.cloud",
      },
    ],
  },
};

export default nextConfig;
