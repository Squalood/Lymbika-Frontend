const BASE = process.env.NEXT_PUBLIC_BACKEND_URL;

export type StrapiRespuesta<T> = {
  data: T;
  meta?: { pagination?: { page: number; pageSize: number; pageCount: number; total: number } };
};

type Opciones = {
  /** Segundos en el Data Cache de Next. `false` = sin caché (datos que cambian al momento, como reseñas). */
  revalidate?: number | false;
};

/**
 * GET a la API de Strapi desde el servidor. Todas las consultas de lib/strapi/
 * pasan por aquí para que el manejo de errores sea uno solo.
 *
 * Nunca lanza: si Strapi no responde, devuelve error o el recurso no existe,
 * registra el problema con `etiqueta` y devuelve null. Así la página cae a su
 * fallback (o a notFound) en vez de dar 500.
 *
 * `ruta` va sin el prefijo /api/, con su query string ya armada.
 */
export async function strapiGet<T>(
  ruta: string,
  etiqueta: string,
  { revalidate = 3600 }: Opciones = {}
): Promise<StrapiRespuesta<T> | null> {
  try {
    const res = await fetch(
      `${BASE}/api/${ruta}`,
      revalidate === false ? { cache: "no-store" } : { next: { revalidate } }
    );
    // 404 = no existe (p. ej. un single type que aún no se crea); no es un error de la query.
    if (res.status === 404) return null;
    if (!res.ok) {
      console.error(`[${etiqueta}] Strapi error:`, res.status, await res.text());
      return null;
    }
    return (await res.json()) as StrapiRespuesta<T>;
  } catch (err) {
    console.error(`[${etiqueta}] fetch failed:`, err);
    return null;
  }
}

/** Primer registro de una colección filtrada (búsqueda por slug), o null. */
export async function strapiPrimero<T>(
  ruta: string,
  etiqueta: string,
  opciones?: Opciones
): Promise<T | null> {
  const res = await strapiGet<T[]>(ruta, etiqueta, opciones);
  return Array.isArray(res?.data) ? res.data[0] ?? null : null;
}

/** Lista de una colección; [] si Strapi falla. */
export async function strapiLista<T>(
  ruta: string,
  etiqueta: string,
  opciones?: Opciones
): Promise<T[]> {
  const res = await strapiGet<T[]>(ruta, etiqueta, opciones);
  return Array.isArray(res?.data) ? res.data : [];
}
