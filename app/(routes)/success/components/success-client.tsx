"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CheckCircle, Clock, XCircle, Loader2, MapPin, Phone } from "lucide-react";
import WhatsAppTrigger from "@/components/whatsapp-trigger";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/formatPrice";
import { consultarOrden, type OrdenResumen } from "@/app/data/actions/order-actions";
import { useSiteConfig } from "@/components/site-config-provider";

// El webhook suele llegar en un par de segundos, pero no está garantizado.
// Se consulta durante 30s antes de rendirse y decir que sigue procesándose.
const INTERVALO_MS = 2000;
const INTENTOS_MAX = 15;

type Vista =
  | { tipo: "consultando" }
  | { tipo: "pagada"; orden: OrdenResumen }
  | { tipo: "procesando" }
  | { tipo: "fallida" }
  | { tipo: "sin_detalle"; motivo: "sin_sesion" | "desconocida" };

export function SuccessClient({ sessionId }: { sessionId?: string }) {
  const { mapsUrl } = useSiteConfig();
  const { removeAll } = useCart();
  const [vista, setVista] = useState<Vista>(
    sessionId ? { tipo: "consultando" } : { tipo: "sin_detalle", motivo: "desconocida" }
  );
  const cancelado = useRef(false);

  // Solo se vacía el carrito si venimos de Stripe. Quien llegue a /success por
  // accidente no debería perder lo que tenía dentro.
  useEffect(() => {
    if (sessionId) removeAll();
  }, [sessionId, removeAll]);

  useEffect(() => {
    if (!sessionId) return;
    cancelado.current = false;

    let intentos = 0;

    const consultar = async () => {
      const res = await consultarOrden(sessionId);
      if (cancelado.current) return;

      if ("error" in res) {
        setVista({
          tipo: "sin_detalle",
          motivo: res.error === "sin_sesion" ? "sin_sesion" : "desconocida",
        });
        return;
      }

      if (res.orden.estado === "paid") {
        setVista({ tipo: "pagada", orden: res.orden });
        return;
      }
      if (res.orden.estado === "failed") {
        setVista({ tipo: "fallida" });
        return;
      }

      // Sigue en pending: el webhook aún no ha llegado.
      intentos += 1;
      if (intentos >= INTENTOS_MAX) {
        setVista({ tipo: "procesando" });
        return;
      }
      setTimeout(consultar, INTERVALO_MS);
    };

    consultar();
    return () => {
      cancelado.current = true;
    };
  }, [sessionId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-muted">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
        <Encabezado vista={vista} />

        {vista.tipo === "pagada" && <Resumen orden={vista.orden} />}

        <div className="mt-6 flex flex-col gap-3 text-sm font-medium">
          <WhatsAppTrigger className="flex items-center gap-2 text-primary hover:underline">
            <Phone className="w-4 h-4" />
            Contacto de atención
          </WhatsAppTrigger>

          <Link
            href={mapsUrl}
            className="flex items-center gap-2 text-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MapPin className="w-4 h-4" />
            Dirección de la farmacia
          </Link>
        </div>

        <Link
          href="/"
          className="inline-block mt-8 px-6 py-2 rounded-full bg-primary text-white hover:bg-primary/90 transition"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}

function Encabezado({ vista }: { vista: Vista }) {
  switch (vista.tipo) {
    case "consultando":
      return (
        <>
          <Loader2 className="text-primary w-12 h-12 mx-auto mb-4 animate-spin" />
          <h1 className="text-2xl font-bold">Confirmando tu pago…</h1>
          <p className="mt-2 text-muted-foreground">Esto toma unos segundos.</p>
        </>
      );

    case "pagada":
      return (
        <>
          <CheckCircle className="text-green-600 w-12 h-12 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-green-700">¡Pago confirmado! 🎉</h1>
          <p className="mt-2 text-muted-foreground">Gracias por tu compra.</p>
        </>
      );

    case "procesando":
      return (
        <>
          <Clock className="text-amber-600 w-12 h-12 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-amber-700">Tu pago se está procesando</h1>
          <p className="mt-2 text-muted-foreground">
            Estamos esperando la confirmación del banco. En cuanto se acredite lo verás
            reflejado; si tarda más de unos minutos, escríbenos.
          </p>
        </>
      );

    case "fallida":
      return (
        <>
          <XCircle className="text-red-600 w-12 h-12 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-red-700">El pago no se completó</h1>
          <p className="mt-2 text-muted-foreground">
            No se realizó ningún cargo. Puedes intentarlo de nuevo desde el carrito.
          </p>
        </>
      );

    case "sin_detalle":
      return (
        <>
          <CheckCircle className="text-green-600 w-12 h-12 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-green-700">¡Gracias por tu compra!</h1>
          <p className="mt-2 text-muted-foreground">
            {vista.motivo === "sin_sesion"
              ? "Inicia sesión para ver el detalle de tu pedido."
              : "No pudimos cargar el detalle de tu pedido, pero si completaste el pago ya lo recibimos."}
          </p>
        </>
      );
  }
}

function Resumen({ orden }: { orden: OrdenResumen }) {
  if (!orden.products?.length) return null;

  return (
    <div className="mt-6 border rounded-xl p-4 text-left">
      <ul className="space-y-1 text-sm">
        {orden.products.map((p, i) => (
          <li key={`${p.name}-${i}`} className="flex justify-between gap-3">
            <span className="text-muted-foreground">
              {p.quantity > 1 && `${p.quantity} × `}
              {p.name}
            </span>
            <span className="tabular-nums whitespace-nowrap">
              {formatPrice((p.unit_amount / 100) * p.quantity)}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-3 pt-3 border-t flex justify-between font-semibold">
        <span>Total</span>
        <span className="tabular-nums">{formatPrice(orden.total)}</span>
      </div>

      {orden.isDelivery && (
        <p className="mt-3 text-xs text-muted-foreground">
          Tu pedido se enviará a la dirección que registraste en el pago.
        </p>
      )}
    </div>
  );
}
