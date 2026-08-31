import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  images: {
    // El resize no lo hace el optimizador de Next: con Cloudinary se pide por
    // URL y con CloudFront la variante ya existe subida. Ver lib/media.ts
    loader: "custom",
    loaderFile: "./lib/media-loader.ts",
    // Estos anchos son exactamente las variantes que hay en el bucket. Si se
    // agrega uno aqui hay que generarlo y subirlo, o esas imagenes daran 404.
    deviceSizes: [640, 1080, 1920],
    imageSizes: [128, 384],
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com", port: "", pathname: "/**" },
      { protocol: "https", hostname: "*.cloudfront.net", port: "", pathname: "/**" },
    ],
  },
};

export default nextConfig;
