/**
 * Helpers de entrega para assets de Cloudinary.
 *
 * Strapi guarda en la BD la URL del archivo ORIGINAL (un PNG de 3 MB, un MP4 de 15 MB).
 * Servir eso tal cual es lo que agotó la cuota de bandwidth de la cuenta. Estas funciones
 * inyectan transformaciones en la URL para que Cloudinary entregue una versión comprimida
 * y en el formato que soporte el navegador. La transformación se genera una sola vez y
 * queda cacheada en el CDN de Cloudinary.
 */

const UPLOAD_RE =
  /^(https?:\/\/res\.cloudinary\.com\/[^/]+\/(?:image|video)\/upload)\/(.*)$/;

/** Un segmento tipo `v1740000000` es la versión del asset, no una transformación. */
const VERSION_RE = /^v\d+$/;

/** Un segmento de transformación son pares `xx_valor` separados por comas: `w_800,f_auto`. */
const TRANSFORM_RE = /^[a-z]{1,3}_[^,/]+(,[a-z]{1,3}_[^,/]+)*$/;

export function isCloudinary(url?: string | null): url is string {
  return typeof url === "string" && UPLOAD_RE.test(url);
}

/**
 * Inserta `transform` justo después de `/upload/`. Si la URL ya traía una
 * transformación la reemplaza, para no acabar con parámetros contradictorios
 * apilados (`w_400/w_1200/...`) si la función se aplica dos veces.
 */
function withTransform(url: string, transform: string): string {
  const match = url.match(UPLOAD_RE);
  if (!match) return url;

  const [, base, tail] = match;
  const parts = tail.split("/");

  if (parts.length > 1 && !VERSION_RE.test(parts[0]) && TRANSFORM_RE.test(parts[0])) {
    parts.shift();
  }

  return `${base}/${transform}/${parts.join("/")}`;
}

/** Cambia la extensión del archivo final de la URL. */
function withExtension(url: string, ext: string): string {
  return url.replace(/\.[a-z0-9]+$/i, `.${ext}`);
}

type ImageOptions = {
  /** Ancho de entrega en px. Con `c_limit` nunca agranda una imagen más chica. */
  width?: number;
  /** `auto` (default) deja que Cloudinary elija; o un número 1-100. */
  quality?: string | number;
};

/**
 * URL de imagen optimizada: `f_auto` sirve WebP/AVIF según el navegador
 * (y respeta transparencia), `q_auto` comprime sin pérdida visible.
 */
export function cldImage(url: string, { width, quality = "auto" }: ImageOptions = {}): string {
  if (!isCloudinary(url)) return url;

  const transform = ["f_auto", `q_${quality}`];
  if (width && Number.isFinite(width)) {
    transform.push(`w_${Math.round(width)}`, "c_limit");
  }

  return withTransform(url, transform.join(","));
}

/**
 * URL de video optimizada. `ac_none` quita la pista de audio: los heroes van
 * `muted`, así que el audio son bytes que nadie escucha.
 */
export function cldVideo(url: string, width = 1280): string {
  if (!isCloudinary(url)) return url;
  return withTransform(url, `vc_auto,q_auto:eco,w_${width},c_limit,ac_none`);
}

/**
 * Primer frame del video como JPG, para usarlo de `poster`. Da algo que pintar
 * de inmediato en vez de un rectángulo negro mientras el video descarga.
 */
export function cldVideoPoster(url: string, width = 1280): string {
  if (!isCloudinary(url)) return "";
  return withExtension(
    withTransform(url, `so_0,f_jpg,q_auto:good,w_${width},c_limit`),
    "jpg",
  );
}
