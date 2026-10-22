"use client";

import { useEffect, useState } from "react";

/**
 * Caché de proceso para los catálogos que el cliente pide a Strapi.
 *
 * Varios componentes de una misma página consumen los mismos catálogos: el
 * navbar y la barra de búsqueda del hero montan ambos los seis hooks de `api/`.
 * Sin esto cada uno abría su propia petición y los logs de Render mostraban el
 * mismo `/api/categories` cuatro y cinco veces por carga. Aquí se comparte la
 * promesa en vuelo y, durante TTL_MS, también el resultado: N montajes son una
 * sola petición de red.
 *
 * Vive en memoria del navegador, así que muere al recargar. No sustituye al
 * caché de Next en los fetch de servidor; cubre el lado cliente, que no tenía
 * ninguno.
 */

type Entrada<T> = {
  promesa: Promise<T>;
  expiraEn: number;
};

const cache = new Map<string, Entrada<unknown>>();

/** Cuánto se reutiliza una respuesta antes de volver a pedirla. */
const TTL_MS = 5 * 60 * 1000;

export type ResourceOptions = {
  /**
   * Si es false el hook no pide nada y devuelve el valor por defecto. Sirve
   * para no descargar un catálogo hasta que el usuario abre el buscador.
   */
  enabled?: boolean;
};

export function fetchShared<T>(url: string, parse: (json: unknown) => T): Promise<T> {
  const ahora = Date.now();
  const previa = cache.get(url) as Entrada<T> | undefined;
  if (previa && previa.expiraEn > ahora) return previa.promesa;

  const promesa = fetch(url)
    .then((res) => res.json())
    .then(parse)
    .catch((error) => {
      // Un fallo no se cachea: el siguiente montaje vuelve a intentarlo.
      cache.delete(url);
      throw error;
    });

  cache.set(url, { promesa, expiraEn: ahora + TTL_MS } as Entrada<unknown>);
  return promesa;
}

/**
 * `parse` y `fallback` tienen que ser referencias estables (constantes de
 * módulo). Si se pasan en línea, el efecto se vuelve a disparar en cada render.
 */
export function useSharedResource<T>(
  url: string,
  parse: (json: unknown) => T,
  fallback: T,
  { enabled = true }: ResourceOptions = {}
) {
  const [data, setData] = useState<T>(fallback);
  const [loading, setLoading] = useState<boolean>(enabled);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!enabled) {
      setLoading(false);
      return;
    }

    let cancelado = false;
    setLoading(true);

    fetchShared(url, parse)
      .then((valor) => {
        if (!cancelado) setData(valor);
      })
      .catch((e: unknown) => {
        if (!cancelado) setError(e instanceof Error ? e.message : "Error al cargar datos");
      })
      .finally(() => {
        if (!cancelado) setLoading(false);
      });

    return () => {
      cancelado = true;
    };
  }, [url, enabled, parse]);

  return { data, loading, error };
}
