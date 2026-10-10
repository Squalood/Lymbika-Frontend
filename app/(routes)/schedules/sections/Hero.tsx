import Image from "next/image";
import { Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScheduleContent, telHref, whatsappHref } from "../config";
import { CtaLink } from "./CtaLink";
import { OpenStatus } from "./OpenStatus";

export function Hero({ content }: { content: ScheduleContent }) {
  const { medico } = content;

  return (
    <section className="w-full px-3 pb-6 md:px-8">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl bg-gradient-to-b from-primary to-[#0b1630] px-5 py-8 text-white md:px-10 md:py-12">
        {/* Marca de agua detrás de los textos, como en el diseño original */}
        <Image
          src="https://d37j77u022tl8g.cloudfront.net/logo_isotipo_5ed85daf57.svg"
          alt=""
          aria-hidden="true"
          width={420}
          height={420}
          className="pointer-events-none absolute -right-[16vw] top-16 z-0 w-[min(78vw,420px)] select-none opacity-10 brightness-0 invert lg:left-[calc(50%-290px)] lg:right-auto lg:top-8 lg:w-[380px]"
        />

        <div className="relative z-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-12">
          <div className="space-y-4">
            <OpenStatus />
            <h1 className="max-w-[13ch] text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
              {content.titulo}
            </h1>
            <p className="max-w-[32ch] text-base text-white/80 md:text-lg">
              {content.subtitulo}
            </p>
          </div>

          <div className="max-w-md space-y-4">
            <p>
              <span className="block text-sm font-medium text-white/70">{content.precioEtiqueta}</span>
              <span className="block text-6xl font-extrabold leading-none tracking-tight md:text-7xl">
                ${content.precio}
                <small className="ml-2 text-base font-medium text-white/70">MXN</small>
              </span>
            </p>

            <div className="grid gap-3">
              <Button asChild size="lg" className="h-14 rounded-xl bg-white text-base font-semibold text-primary hover:bg-white/90">
                <CtaLink accion="agendar" href={content.calendario} ubicacion="hero" icono>
                  Apartar cita
                </CtaLink>
              </Button>
              <div className="grid grid-cols-2 gap-3">
                <Button asChild size="lg" className="h-12 rounded-xl bg-green-500 px-4 font-semibold text-white hover:bg-green-600">
                  <CtaLink accion="whatsapp" href={whatsappHref(content)} ubicacion="hero" icono>
                    WhatsApp
                  </CtaLink>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-12 rounded-xl border-white/40 bg-transparent px-4 font-semibold text-white hover:bg-white/10 hover:text-white"
                >
                  <CtaLink accion="llamar" href={telHref(content)} ubicacion="hero" icono>
                    Llamar
                  </CtaLink>
                </Button>
              </div>
            </div>

            <p className="text-sm text-white/70">
              Puedes apartar en línea o escribirnos si primero quieres preguntar.
            </p>
            <p className="text-sm text-white/70">
              Atención presencial en {content.ciudad}.{" "}
              <a href="#ubicacion" className="font-semibold text-white underline underline-offset-4">
                Ver ubicación
              </a>
            </p>

            {medico.nombre && (
              <div className="flex items-center gap-3 pt-2">
                {medico.foto ? (
                  <Image
                    src={medico.foto}
                    alt={medico.nombre}
                    width={56}
                    height={56}
                    className="h-14 w-14 shrink-0 rounded-full border-2 border-white/40 object-cover"
                  />
                ) : (
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-white/40 bg-white/10">
                    <Stethoscope className="h-6 w-6" />
                  </span>
                )}
                <span>
                  <span className="block text-sm font-semibold">Te atiende {medico.nombre}</span>
                  {medico.descripcion && (
                    <span className="block text-xs text-white/70">{medico.descripcion}</span>
                  )}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
