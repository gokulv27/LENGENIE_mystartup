/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow local images from /public (default) + any future remote sources
    remotePatterns: [],
    // Keep WebP auto-conversion on
    formats: ["image/webp"],
    // Allow unoptimized for local dev if needed
    unoptimized: false,
  },
  // Silence the "Image with src ... detected" warning for layout/objectFit deprecated props
  experimental: {},
};

export default nextConfig;
