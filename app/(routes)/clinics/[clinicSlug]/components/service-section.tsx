"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import PriceToggle from "@/components/price-toggle";
import { formatPrice } from "@/lib/format-price";
import { mensualidadMinima } from "@/lib/financiamiento";
import { cn } from "@/lib/utils";
import { ServiceRateType } from "@/types/medical-service";

// ============================================================
// SECCIÓN DE PROCEDIMIENTOS — Lymbika
// Sustituye a `services.tsx` en la página de clínica. Mismas props
// (`services` + `texts`), así que el cambio es de una línea.
//
// Solo pinta `medical_service.type === "procedure"`; consultas y
// estudios quedan fuera por ahora.
//
// Los campos comerciales (comercialidad, destacado, badgePrestigio,
// requiereCirugia) todavía no existen en Strapi — ver los comentarios
// en `types/medical-service.ts`. La sección degrada sola mientras tanto:
// sin `destacado` no hay bloque de destacados, sin `requiereCirugia` no
// se pintan los chips de Cirugía / Sin cirugía.
//
// Cada tarjeta enlaza a /specialty/{specialty.slug}/{medical_service.slug}
// y requiere `populate[medical_service][populate][specialty]=true`.
// ============================================================

type ServiceTexts = {
  badge: string;
  title: string;
  description: string;
  typeProcedure: string;
  scheduleButton: string;
};

type ServiceSectionProps = {
  services: ServiceRateType[];
  texts: ServiceTexts;
};

// Copias propias de la sección. Cuando el equipo las quiera editables,
// se suben a `pageTexts` en Strapi igual que el resto.
const TEXTOS = {
  ordenar: "Ordenar:",
  menorPrecio: "Menor precio",
  mayorPrecio: "Mayor precio",
  conCirugia: "Cirugía",
  sinCirugia: "Sin cirugía",
  masSolicitados: "Los más solicitados",
  todos: "Todos los tratamientos",
  masAgendado: "Más agendado",
  desde: "o desde",
  porMes: "/mes",
  ctaCirugia: "Cotiza tu cirugía",
  cta: "Cotiza",
  nota: "Realizado por especialistas certificados de la red Lymbika · valoración deducible de tu procedimiento",
};

type Orden = "destacados" | "precio-asc" | "precio-desc";
type FiltroCirugia = "con" | "sin";

function ProcedureRow({
  rate,
  texts,
  featured,
}: {
  rate: ServiceRateType;
  texts: ServiceTexts;
  featured?: boolean;
}) {
  const ms = rate.medical_service;
  if (!ms) return null;

  const specialtySlug = ms.specialty?.slug;
  const href = specialtySlug ? `/specialty/${specialtySlug}/${ms.slug}` : null;
  const financiamiento = mensualidadMinima(rate.price);

  return (
    <Card
      className={cn(
        "flex flex-row items-center justify-between gap-4 p-4 transition-shadow hover:shadow-md",
        featured && "border-primary border-2"
      )}
    >
      <div className="min-w-0 flex-1 space-y-1">
        <div className="flex flex-wrap items-center gap-2">
          {href ? (
            <Link href={href} className="text-sm font-semibold hover:underline">
              {ms.name}
            </Link>
          ) : (
            <span className="text-sm font-semibold">{ms.name}</span>
          )}

          {rate.requiereCirugia === false && (
            <Badge variant="secondary" className="text-[10px] font-normal">
              {TEXTOS.sinCirugia}
            </Badge>
          )}
          {rate.requiereCirugia === true && (
            <Badge variant="outline" className="text-[10px] font-normal">
              {TEXTOS.conCirugia}
            </Badge>
          )}
          {rate.destacado && (
            <Badge className="text-[10px] font-normal">{TEXTOS.masAgendado}</Badge>
          )}
          {rate.badgePrestigio && (
            <Badge variant="outline" className="text-[10px] font-normal">
              {rate.badgePrestigio}
            </Badge>
          )}
        </div>

        {ms.description && (
          <p className="text-xs text-muted-foreground line-clamp-2">{ms.description}</p>
        )}
      </div>

      <div className="shrink-0 space-y-1 text-right">
        <PriceToggle price={rate.price} />
        {financiamiento && (
          <p className="text-[11px] text-muted-foreground">
            {TEXTOS.desde} {formatPrice(financiamiento.monthly)}
            {TEXTOS.porMes}
          </p>
        )}
        <Button size="sm" className="mt-1" asChild={!!href}>
          {href ? (
            <Link href={href}>
              {rate.requiereCirugia === false ? TEXTOS.cta : TEXTOS.ctaCirugia}
            </Link>
          ) : (
            <span>{texts.scheduleButton}</span>
          )}
        </Button>
      </div>
    </Card>
  );
}

export default function ServiceSection({ services, texts }: ServiceSectionProps) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const [orden, setOrden] = useState<Orden>("destacados");
  const [filtroCirugia, setFiltroCirugia] = useState<FiltroCirugia | null>(null);

  const procedimientos = useMemo(
    () => services.filter((s) => s.medical_service?.type === "procedure"),
    [services]
  );

  // Los chips de Cirugía / Sin cirugía solo aparecen cuando el campo ya
  // viene de Strapi en al menos un rate; si no, no filtrarían nada.
  const hayFlagCirugia = procedimientos.some((s) => typeof s.requiereCirugia === "boolean");
  const hayDestacados = procedimientos.some((s) => s.destacado);

  const lista = useMemo(() => {
    let l = [...procedimientos];
    if (filtroCirugia) {
      l = l.filter((s) => s.requiereCirugia === (filtroCirugia === "con"));
    }
    if (orden === "precio-asc") l.sort((a, b) => a.price - b.price);
    else if (orden === "precio-desc") l.sort((a, b) => b.price - a.price);
    else l.sort((a, b) => (a.comercialidad ?? Infinity) - (b.comercialidad ?? Infinity));
    return l;
  }, [procedimientos, orden, filtroCirugia]);

  const destacados = useMemo(() => lista.filter((s) => s.destacado), [lista]);
  const resto = useMemo(() => lista.filter((s) => !s.destacado), [lista]);

  // El bloque "Los más solicitados" solo tiene sentido en la vista por
  // defecto: si el usuario ya ordenó por precio, se respeta su orden.
  const mostrarSplit = orden === "destacados" && hayDestacados;

  if (procedimientos.length === 0) return null;

  return (
    <section id="servicios" className="section bg-accent/50 py-8 md:py-12">
      <div ref={ref} className="mx-auto max-w-4xl px-4">
        <div
          className={cn(
            "mb-8 space-y-3 text-center transition-all duration-700",
            inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          )}
        >
          <Badge variant="secondary" className="text-xs font-bold uppercase tracking-widest">
            {texts.badge}
          </Badge>
          <h2 className="text-2xl font-bold md:text-3xl">{texts.title}</h2>
          <p className="mx-auto max-w-2xl text-sm text-muted-foreground md:text-base">
            {texts.description}
          </p>
        </div>

        {/* FILTROS */}
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="text-xs text-muted-foreground">{TEXTOS.ordenar}</span>
          {hayDestacados && (
            <Button
              size="sm"
              variant={orden === "destacados" ? "default" : "outline"}
              className="rounded-full"
              onClick={() => setOrden("destacados")}
            >
              {TEXTOS.masSolicitados}
            </Button>
          )}
          <Button
            size="sm"
            variant={orden === "precio-asc" ? "default" : "outline"}
            className="rounded-full"
            onClick={() => setOrden("precio-asc")}
          >
            {TEXTOS.menorPrecio}
          </Button>
          <Button
            size="sm"
            variant={orden === "precio-desc" ? "default" : "outline"}
            className="rounded-full"
            onClick={() => setOrden("precio-desc")}
          >
            {TEXTOS.mayorPrecio}
          </Button>

          {hayFlagCirugia && (
            <>
              <Separator orientation="vertical" className="mx-1 h-5" />
              <Button
                size="sm"
                variant={filtroCirugia === "sin" ? "default" : "outline"}
                className="rounded-full"
                onClick={() => setFiltroCirugia(filtroCirugia === "sin" ? null : "sin")}
              >
                {TEXTOS.sinCirugia}
              </Button>
              <Button
                size="sm"
                variant={filtroCirugia === "con" ? "default" : "outline"}
                className="rounded-full"
                onClick={() => setFiltroCirugia(filtroCirugia === "con" ? null : "con")}
              >
                {TEXTOS.conCirugia}
              </Button>
            </>
          )}
        </div>

        {/* PROCEDIMIENTOS */}
        {mostrarSplit ? (
          <>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-primary">
              ★ {TEXTOS.masSolicitados}
            </p>
            <div className="mb-5 flex flex-col gap-2">
              {destacados.map((s) => (
                <ProcedureRow key={s.id} rate={s} texts={texts} featured />
              ))}
            </div>
            {resto.length > 0 && (
              <>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {TEXTOS.todos}
                </p>
                <div className="flex flex-col gap-2">
                  {resto.map((s) => (
                    <ProcedureRow key={s.id} rate={s} texts={texts} />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="flex flex-col gap-2">
            {lista.map((s) => (
              <ProcedureRow key={s.id} rate={s} texts={texts} featured={!!s.destacado} />
            ))}
          </div>
        )}

        <div className="mt-4 rounded-lg bg-primary/5 px-4 py-3">
          <p className="text-xs text-muted-foreground">{TEXTOS.nota}</p>
        </div>
      </div>
    </section>
  );
}
