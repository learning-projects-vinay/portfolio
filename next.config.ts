import type { NextConfig } from "next";

// The asset prefix is the single source of truth for where the site is served
// from: `next.config` (basePath/assetPrefix) and `withPrefix()` in src/data/profile
// both read it, so raw <a>/<img> paths can never drift from the router's basePath.
// Empty locally, "/portfolio" on GitHub Pages (see example.env).
const assetPrefix = process.env.NEXT_PUBLIC_ASSET_PREFIX ?? "";

const nextConfig: NextConfig = {
  output: 'export', // Export as a static site
  basePath: assetPrefix,
  assetPrefix: assetPrefix ? `${assetPrefix}/` : '',
  images: {
    unoptimized: true, // Required for static export
  },
  env: {
    // Frozen at build time so date-derived copy (tenure, footer year) renders
    // identically on the server and on the client — otherwise a page built in
    // December and viewed in January hydrates with mismatched text.
    NEXT_PUBLIC_BUILD_DATE: new Date().toISOString(),
  },
};

export default nextConfig;
