"use client";
import Link from "next/link";
import { XCircle, MapPin, Phone } from "lucide-react";

const PageSuccessError = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-muted">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
        <XCircle className="text-red-600 w-12 h-12 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-red-700">
          ¡Ocurrió un error! 😔
        </h1>
        <p className="mt-2 text-muted-foreground">
          El pago no se completó correctamente. Puedes intentarlo de nuevo o
          contactar al equipo de soporte.
        </p>

        <div className="mt-6 flex flex-col gap-3 text-sm font-medium">
          <Link href="https://wa.me/526561100446" className="flex items-center gap-2 text-primary hover:underline" target="_blank" rel="noopener noreferrer">
            <Phone className="w-4 h-4" />
            Contacto de atención
          </Link>

          <Link href="https://maps.app.goo.gl/wddxisYk7CM7cGVg6" className="flex items-center gap-2 text-primary hover:underline" target="_blank" rel="noopener noreferrer">
            <MapPin className="w-4 h-4" />
            Dirección de la farmacia
          </Link>
        </div>

        <Link
          href="/cart"
          className="inline-block mt-8 px-6 py-2 rounded-full bg-primary text-white hover:bg-primary/90 transition"
        >
          Volver al carrito
        </Link>
      </div>
    </div>
  );
};

export default PageSuccessError;