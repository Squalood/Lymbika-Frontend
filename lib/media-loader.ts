import type { ImageLoaderProps } from "next/image";

import { urlImagen } from "./media";

/**
 * Loader de next/image registrado en next.config.ts.
 *
 * Devuelve la variante WebP ya generada en el bucket para ese ancho, así el
 * navegador descarga el tamaño que necesita y no el original. La calidad no
 * aplica: las variantes se generan con una sola.
 */
export default function mediaLoader({ src, width }: ImageLoaderProps): string {
  return urlImagen(src, { width });
}
