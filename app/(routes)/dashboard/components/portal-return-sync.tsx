"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { leerFirmaDeMembresia } from "@/app/data/actions/subscription-actions";

// El webhook de Stripe suele llegar en un par de segundos. Un cambio hecho en
// el portal se propaga más rápido que un cobro, así que se espera menos que en
// /success.
const INTERVALO_MS = 2000;
const INTENTOS_MAX = 10;

/**
 * Espera a que el webhook aterrice después de volver del Customer Portal.
 *
 * Stripe devuelve al usuario de inmediato, pero el evento que actualiza Strapi
 * tarda un poco. Sin esto, alguien que acaba de cancelar vería "se renueva el
 * 23 de octubre".
 *
 * Mientras espera, la tarjeta sigue mostrando el estado viejo **pero con el
 * aviso de que se está sincronizando** debajo. Si se agota el plazo no afirma
 * que todo esté al día: pide recargar. En ningún momento declara un estado que
 * no verificó.
 */
export function PortalReturnSync({ firmaInicial }: { firmaInicial: string }) {
  const router = useRouter();
  const [estado, setEstado] = useState<"sincronizando" | "agotado">("sincronizando");
  const cancelado = useRef(false);

  useEffect(() => {
    cancelado.current = false;
    let intentos = 0;

    const consultar = async () => {
      const firma = await leerFirmaDeMembresia();
      if (cancelado.current) return;

      if (firma && firma !== firmaInicial) {
        // `replace` en vez de `refresh`: revalida el server component Y quita
        // el ?portal=1 de la URL, así este sincronizador no se vuelve a montar.
        router.replace("/dashboard/summaries");
        return;
      }

      intentos += 1;
      if (intentos >= INTENTOS_MAX) {
        setEstado("agotado");
        return;
      }
      setTimeout(consultar, INTERVALO_MS);
    };

    consultar();

    return () => {
      cancelado.current = true;
    };
  }, [firmaInicial, router]);

  if (estado === "agotado") {
    return (
      <p className="text-xs text-muted-foreground">
        Si acabas de hacer un cambio y todavía no se refleja aquí, recarga la página
        en un minuto.
      </p>
    );
  }

  return (
    <p className="flex items-center gap-2 text-xs text-muted-foreground">
      <Loader2 className="w-3 h-3 animate-spin" />
      Sincronizando los cambios con Stripe…
    </p>
  );
}
