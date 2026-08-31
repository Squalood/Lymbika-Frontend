/**
 * Construcción de URLs de media.
 *
 * Conviven dos esquemas a propósito, para poder desplegar esto antes de que la
 * base termine de migrar y que no haya ni un momento sirviendo originales:
 *
 *  - Cloudinary: transforma al vuelo, se le pide el ancho en la URL.
 *  - CloudFront (S3): no transforma nada. Las variantes existen como objetos
 *    subidos, con el nombre <clave sin extensión>_w<ancho>.webp, y los posters
 *    de video como <clave sin extensión>_poster.webp.
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

const CLOUDINARY_RE =
  /^(https?:\/\/res\.cloudinary\.com\/[^/]+\/(?:image|video)\/upload)\/(.*)$/;
const VERSION_RE = /^v\d+$/;
const TRANSFORM_RE = /^[a-z]{1,3}_[^,/]+(,[a-z]{1,3}_[^,/]+)*$/;

export function esCloudinary(url?: string | null): url is string {
  return typeof url === 'string' && CLOUDINARY_RE.test(url);
}

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

/** Inserta (o reemplaza) la transformación de una URL de Cloudinary. */
function conTransformacion(url: string, transform: string): string {
  const match = url.match(CLOUDINARY_RE);
  if (!match) return url;
  const [, base, tail] = match;
  const parts = tail.split('/');
  if (parts.length > 1 && !VERSION_RE.test(parts[0]) && TRANSFORM_RE.test(parts[0])) {
    parts.shift();
  }
  return `${base}/${transform}/${parts.join('/')}`;
}

const sinExtension = (url: string) => url.replace(/\.[^./?]+($|\?)/, '$1');

/** El ancho generado más cercano por encima del pedido. */
function anchoDisponible(width: number): number {
  return ANCHOS.find((w) => w >= width) ?? ANCHOS[ANCHOS.length - 1];
}

type OpcionesImagen = { width?: number; quality?: string | number };

/**
 * URL de imagen lista para servir. Pass-through de todo lo que no sea media
 * gestionada: rutas de /public, avatares externos, etc.
 */
export function urlImagen(url: string, { width, quality = 'auto' }: OpcionesImagen = {}): string {
  if (esCloudinary(url)) {
    const t = ['f_auto', `q_${quality}`];
    if (width && Number.isFinite(width)) t.push(`w_${Math.round(width)}`, 'c_limit');
    return conTransformacion(url, t.join(','));
  }

  if (esPropia(url) && CON_VARIANTES.test(url)) {
    if (!width || !Number.isFinite(width)) return url;
    return `${sinExtension(url)}_w${anchoDisponible(Math.round(width))}.webp`;
  }

  return url;
}

/** URL de video. Desde el bucket ya vienen comprimidos, no hay nada que hacer. */
export function urlVideo(url: string, width = 1280): string {
  if (esCloudinary(url)) {
    return conTransformacion(url, `vc_auto,q_auto:eco,w_${width},c_limit,ac_none`);
  }
  return url;
}

/**
 * Imagen de portada del video, para que el hero pinte algo mientras descarga.
 * Devuelve cadena vacía si no hay una previsible: un poster ausente no rompe
 * nada, el navegador simplemente no muestra nada antes del primer frame.
 */
export function urlPoster(url: string, width = 1280): string {
  if (esCloudinary(url)) {
    return conTransformacion(url, `so_0,f_jpg,q_auto:good,w_${width},c_limit`).replace(
      /\.[a-z0-9]+$/i,
      '.jpg',
    );
  }
  if (esPropia(url)) return `${sinExtension(url)}_poster.webp`;
  return '';
}
