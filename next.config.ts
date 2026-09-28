import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.crmrebs.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'imobicom-srl.crmrebs.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
