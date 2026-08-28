import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  images: {
    // El resize lo hace Cloudinary, no el optimizador de Next. Ver lib/cloudinary-loader.ts
    loader: "custom",
    loaderFile: "./lib/cloudinary-loader.ts",
    // Menos anchos = menos variantes distintas que generar y mejor cache-hit en el CDN.
    deviceSizes: [640, 828, 1080, 1920],
    imageSizes: [64, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
