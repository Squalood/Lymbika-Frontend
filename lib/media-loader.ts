import type { ImageLoaderProps } from "next/image";

import { urlImagen } from "./media";

/** Valor que asume next/image cuando el componente no pide una calidad. */
const CALIDAD_POR_DEFECTO = 75;

/**
 * Loader de next/image registrado en next.config.ts.
 *
 * Con media en CloudFront devuelve la variante ya generada para ese ancho; con
 * media en Cloudinary, una URL de transformación. En ambos casos el navegador
 * descarga un WebP del tamaño que necesita, no el original.
 */
export default function mediaLoader({ src, width, quality }: ImageLoaderProps): string {
  const usarAuto = quality == null || quality === CALIDAD_POR_DEFECTO;
  return urlImagen(src, { width, quality: usarAuto ? "auto" : quality });
}
