import type { NextConfig } from "next";

// next.config.js
const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  /* config options here */  
  // !NOTE: Uncomment the option when pushing it to github
  output: 'export', // Export as a static site
  basePath: isProd ? '/portfolio' : '',
  assetPrefix: isProd ? '/portfolio/' : '',
  images: {
    unoptimized: true, // Required for static export
  },
};

export default nextConfig;
