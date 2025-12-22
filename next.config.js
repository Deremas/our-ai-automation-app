/** @type {import('next').NextConfig} */
const nextConfig = {
  // If you later enable output: "export", note:
  // serverExternalPackages is server-only and won't matter for static export.
  // output: "export",

  // serverExternalPackages: ["pdf-parse"],
  outputFileTracing: false,
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.cache = false; // disable webpack filesystem cache
    return config;
  },
  typescript: {
    // ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
