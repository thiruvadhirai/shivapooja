/** @type {import('next').NextConfig} */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH
  ?? (process.env.NODE_ENV === 'production' ? '/shivapooja' : '');

const nextConfig = {
  output: 'export',
  distDir: 'docs',
  basePath,
  // Expose basePath to client-side code at build time
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
