import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  images: {
    // Unsplash resizes on its own CDN — see src/image-loader.ts.
    loader: "custom",
    loaderFile: "./src/image-loader.ts",
    deviceSizes: [640, 828, 1200, 1920],
  },
};
export default nextConfig;
