// next.config.js
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  /* config options here */  
  output: 'export', // Export as a static site
  assetPrefix: isProd ? '/portfolio/' : '', // Update the base path for GitHub Pages
};

module.exports = nextConfig;
