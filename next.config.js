/** @type {import('next').NextConfig} */
const nextConfig = {
  // Also emits a minimal, self-contained .next/standalone build (its own
  // server.js + only the node_modules it actually needs). Regular
  // `npm run build && npm run start` still works exactly as before — this
  // just gives the option of a much smaller upload if deploying to
  // Hostinger's Node.js hosting via that folder instead of the full repo.
  // See README.md → "Deploying to Hostinger".
  output: "standalone",

  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
    formats: ["image/avif", "image/webp"],
    // Optimized variants are cached for 30 days before Next re-checks the
    // source — cuts repeat optimization work for images that rarely change.
    minimumCacheTTL: 60 * 60 * 24 * 30,
    // Next's on-demand image optimizer (the /_next/image route) needs the
    // `sharp` package in production, which isn't installed here, and on
    // top of that Hostinger's hosting layer was returning 403 on that
    // route directly. Every image on this site is already a pre-optimized
    // .WebP file, so there's nothing to gain from resizing them
    // server-side anyway — this serves the original files directly
    // instead of routing through /_next/image, which sidesteps both
    // problems at once.
    unoptimized: true,
  },

  // Long-lived caching for static assets (images/videos/brochures/fonts).
  // Filenames here don't carry content hashes, so if you replace a file's
  // *contents* at the same path after deploying, rename the file (or bump
  // a query string) rather than relying on visitors to get the update
  // within the max-age window.
  async headers() {
    return [
      {
        source: "/assets/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
