import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ScheduleContent, mapsEmbed, telHref, telefonoFmt } from "../config";
import { CtaLink } from "./cta-link";

export function Location({ content }: { content: ScheduleContent }) {
  const { ubicacion } = content;

  return (
    <section id="ubicacion" aria-labelledby="t-lugar" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-12 md:px-8">
      <h2 id="t-lugar" className="mb-5 text-2xl font-bold text-primary md:text-3xl">
        {ubicacion.titulo}
      </h2>
      <div className="grid gap-6 md:grid-cols-2 md:items-start md:gap-10">
        <div>
          {ubicacion.foto && (
            <div className="relative mb-5 aspect-video overflow-hidden rounded-xl bg-muted">
              <Image
                src={ubicacion.foto}
                alt={`Fachada de ${content.nombre}`}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          )}
          <dl className="grid gap-4">
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Dirección</dt>
              <dd className="text-lg">{ubicacion.direccion}</dd>
            </div>
            {ubicacion.referencias && (
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Cómo encontrarnos</dt>
                <dd className="text-lg">{ubicacion.referencias}</dd>
              </div>
            )}
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Horario</dt>
              <dd className="text-lg">{ubicacion.horarioTexto}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Teléfono y WhatsApp</dt>
              <dd className="text-lg">
                <CtaLink
                  accion="llamar"
                  href={telHref(content)}
                  ubicacion="ubicacion"
                  className="font-semibold text-primary underline-offset-4 hover:underline"
                >
                  {telefonoFmt(content)}
                </CtaLink>
              </dd>
            </div>
          </dl>
          <div className="mt-6 grid max-w-md gap-3">
            <Button asChild size="lg" className="h-12 rounded-xl font-semibold">
              <CtaLink accion="maps" href={ubicacion.mapsUrl} ubicacion="ubicacion" icono>
                Cómo llegar
              </CtaLink>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 rounded-xl border-primary font-semibold text-primary hover:text-primary">
              <CtaLink accion="agendar" href={content.calendario} ubicacion="ubicacion" icono>
                Apartar cita
              </CtaLink>
            </Button>
          </div>
        </div>

        <div className="aspect-[4/3] overflow-hidden rounded-xl border border-border bg-muted">
          <iframe
            src={mapsEmbed(content)}
            title={`Mapa de ${content.nombre}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full w-full border-0"
          />
        </div>
      </div>
    </section>
  );
}
