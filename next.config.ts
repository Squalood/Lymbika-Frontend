import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  // /surgery se retiró (oct-2026): las cirugías viven en /specialty. Se
  // redirige para no romper enlaces viejos compartidos o en anuncios.
  async redirects() {
    return [
      { source: "/surgery", destination: "/specialty", permanent: true },
      { source: "/surgery/:path*", destination: "/specialty", permanent: true },
    ];
  },
  images: {
    // El resize no lo hace el optimizador de Next: en CloudFront cada variante
    // ya existe subida. Ver lib/media.ts
    loader: "custom",
    loaderFile: "./lib/media-loader.ts",
    // Estos anchos son exactamente las variantes que hay en el bucket. Si se
    // agrega uno aqui hay que generarlo y subirlo, o esas imagenes daran 404.
    deviceSizes: [640, 1080, 1920],
    imageSizes: [128, 384],
    remotePatterns: [
      { protocol: "https", hostname: "*.cloudfront.net", port: "", pathname: "/**" },
    ],
  },
};

export default nextConfig;
