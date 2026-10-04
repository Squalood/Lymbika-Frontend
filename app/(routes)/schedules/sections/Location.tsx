import { Button } from "@/components/ui/button";
import { MAPS_EMBED, SUCURSAL, TELEFONO_FMT } from "../config";
import { CtaLink } from "./CtaLink";

export function Location() {
  return (
    <section id="ubicacion" aria-labelledby="t-lugar" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-12 md:px-8">
      <h2 id="t-lugar" className="mb-5 text-2xl font-bold text-primary md:text-3xl">
        Dónde estamos
      </h2>
      <div className="grid gap-6 md:grid-cols-2 md:items-start md:gap-10">
        <div>
          <dl className="grid gap-4">
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Dirección</dt>
              <dd className="text-lg">{SUCURSAL.direccion}</dd>
            </div>
            {SUCURSAL.referencias && (
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Cómo encontrarnos</dt>
                <dd className="text-lg">{SUCURSAL.referencias}</dd>
              </div>
            )}
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Horario</dt>
              <dd className="text-lg">{SUCURSAL.horarioTexto}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Teléfono y WhatsApp</dt>
              <dd className="text-lg">
                <CtaLink accion="llamar" ubicacion="ubicacion" className="font-semibold text-primary underline-offset-4 hover:underline">
                  {TELEFONO_FMT}
                </CtaLink>
              </dd>
            </div>
          </dl>
          <div className="mt-6 grid max-w-md gap-3">
            <Button asChild size="lg" className="h-12 rounded-xl font-semibold">
              <CtaLink accion="maps" ubicacion="ubicacion" icono>
                Cómo llegar
              </CtaLink>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 rounded-xl border-primary font-semibold text-primary hover:text-primary">
              <CtaLink accion="agendar" ubicacion="ubicacion" icono>
                Apartar cita
              </CtaLink>
            </Button>
          </div>
        </div>

        <div className="aspect-[4/3] overflow-hidden rounded-xl border border-border bg-muted">
          <iframe
            src={MAPS_EMBED}
            title={`Mapa de ${SUCURSAL.nombre}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full w-full border-0"
          />
        </div>
      </div>
    </section>
  );
}
