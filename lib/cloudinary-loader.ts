import type { ImageLoaderProps } from "next/image";

import { cldImage, isCloudinary } from "./cloudinary";

/** Valor que next/image asume cuando el componente no pasa `quality`. */
const NEXT_DEFAULT_QUALITY = 75;

/**
 * Loader de next/image registrado en next.config.ts.
 *
 * Hace que el redimensionado lo haga Cloudinary en vez del optimizador de Next:
 * Next pide `w_640`, Cloudinary entrega exactamente 640px en WebP/AVIF. Antes
 * Next descargaba el original completo (PNG de 3 MB) para reescalarlo él mismo,
 * y ese tráfico Cloudinary -> Next era el que se facturaba.
 *
 * Los assets locales de /public se devuelven intactos.
 */
export default function cloudinaryLoader({ src, width, quality }: ImageLoaderProps): string {
  if (!isCloudinary(src)) return src;

  // Ningún componente pide una calidad concreta, así que dejamos que Cloudinary
  // la elija por imagen (`q_auto`), que comprime mejor que un 75 fijo.
  const useAuto = quality == null || quality === NEXT_DEFAULT_QUALITY;

  return cldImage(src, { width, quality: useAuto ? "auto" : quality });
}
