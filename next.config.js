/** @type {import('next').NextConfig} */
const nextConfig = {
  // If you later enable output: "export", note:
  // serverExternalPackages is server-only and won't matter for static export.
  // output: "export",

  // serverExternalPackages: ["pdf-parse"],

  images: {
    unoptimized: true,
  },

  typescript: {
    // ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
