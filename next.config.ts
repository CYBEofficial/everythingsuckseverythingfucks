import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Configure for GitHub Pages deployment
  basePath: '/everythingsuckseverythingfucks',
  assetPrefix: '/everythingsuckseverythingfucks',
};

export default nextConfig;
