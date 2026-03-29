/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'docs',
  // /shivapooja is the GitHub Pages sub-path (repo name).
  // Empty in dev so `next dev` serves from root.
  // Override with NEXT_PUBLIC_BASE_PATH='' for the test build (E2E).
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? (process.env.NODE_ENV === 'production' ? '/shivapooja' : ''),
  images: { unoptimized: true },
};

module.exports = nextConfig;
