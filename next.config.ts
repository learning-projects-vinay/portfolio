import type { NextConfig } from "next";

// next.config.js
const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  /* config options here */  
  output: 'export', // Export as a static site
  basePath: isProd ? '/portfolio' : '',
};

export default nextConfig;