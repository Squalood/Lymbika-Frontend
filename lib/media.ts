/**
 * Construcción de URLs de media.
 *
 * Toda la media vive en S3 y se sirve por CloudFront, que no transforma nada.
 * Las variantes existen como objetos subidos, con el nombre
 * <clave sin extensión>_w<ancho>.webp, y los posters de video como
 * <clave sin extensión>_poster.webp. (Antes convivía Cloudinary; la migración
 * terminó y se quitó su soporte en nov-2026.)
 *
 * ANCHOS es la lista exacta de variantes que se generaron, y tiene que
 * coincidir con deviceSizes + imageSizes de next.config.ts: si Next pide un
 * ancho que no existe como objeto, la imagen sale rota. Por si acaso, un ancho
 * desconocido se redondea al siguiente disponible en vez de devolver un 404.
 */

/** Anchos generados en el bucket. Cambiarlos exige regenerar las variantes. */
export const ANCHOS = [128, 384, 640, 1080, 1920] as const;

/** Formatos para los que se generaron variantes WebP. */
const CON_VARIANTES = /\.(png|jpe?g|webp|avif|tiff)$/i;

const HOST_MEDIA = process.env.NEXT_PUBLIC_MEDIA_HOST || '';

/** Media servida desde nuestro bucket a través de CloudFront. */
export function esPropia(url?: string | null): url is string {
  if (typeof url !== 'string' || !url.startsWith('https://')) return false;
  try {
    const { host } = new URL(url);
    return HOST_MEDIA ? host === HOST_MEDIA : host.endsWith('.cloudfront.net');
  } catch {
    return false;
  }
}

const sinExtension = (url: string) => url.replace(/\.[^./?]+($|\?)/, '$1');

/** El ancho generado más cercano por encima del pedido. */
function anchoDisponible(width: number): number {
  return ANCHOS.find((w) => w >= width) ?? ANCHOS[ANCHOS.length - 1];
}

/**
 * URL de imagen lista para servir: la variante WebP del ancho pedido.
 * Pass-through de todo lo que no sea media propia: rutas de /public, avatares
 * externos, etc. Los videos no necesitan nada: ya se suben comprimidos.
 */
export function urlImagen(url: string, { width }: { width?: number } = {}): string {
  if (esPropia(url) && CON_VARIANTES.test(url)) {
    if (!width || !Number.isFinite(width)) return url;
    return `${sinExtension(url)}_w${anchoDisponible(Math.round(width))}.webp`;
  }
  return url;
}

/**
 * Imagen de portada del video, para que el hero pinte algo mientras descarga.
 * Devuelve cadena vacía si no hay una previsible: un poster ausente no rompe
 * nada, el navegador simplemente no muestra nada antes del primer frame.
 */
export function urlPoster(url: string): string {
  if (esPropia(url)) return `${sinExtension(url)}_poster.webp`;
  return '';
}

/**
 * Strapi a veces devuelve rutas relativas (/uploads/...) en lugar de URLs
 * completas; se les antepone el backend.
 */
export function imgUrl(url: string): string {
  if (!url) return "";
  return url.startsWith("http") ? url : `${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`;
}
