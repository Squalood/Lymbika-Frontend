import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ScheduleContent } from "../config";
import { CtaLink } from "./cta-link";

/** El último paso va en gris: es el "si llegara a necesitarse" (cirugía). */
export function MoreHelp({ content }: { content: ScheduleContent }) {
  const { pasos } = content;

  return (
    <section aria-labelledby="t-more" className="bg-primary/5">
      <div className="mx-auto max-w-6xl px-5 pt-12 md:px-8">
        <h2 id="t-more" className="mb-3 text-2xl font-bold text-primary md:text-3xl">
          Si necesitas algo más, también te ayudamos.
        </h2>
        <p className="mb-6 max-w-[52ch] text-muted-foreground">
          Después de tu valoración, Farmacia+ by Lymbika puede ayudarte a continuar con lo que tu caso necesite.
        </p>
        <ol className="max-w-3xl">
          {pasos.map((paso, i) => {
            const secundario = pasos.length > 1 && i === pasos.length - 1;
            return (
              <li key={paso.titulo} className="grid grid-cols-[34px_1fr] gap-x-3 border-t border-primary/15 py-4">
                <span
                  className={cn(
                    "row-span-2 flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold",
                    secundario
                      ? "border border-muted-foreground/40 text-muted-foreground"
                      : "bg-primary text-primary-foreground"
                  )}
                >
                  {i + 1}
                </span>
                <h3 className={cn("text-base font-bold", secundario ? "font-semibold text-muted-foreground" : "text-primary")}>
                  {paso.titulo}
                </h3>
                <p className="text-sm text-muted-foreground">{paso.texto}</p>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="mt-9 bg-[#0b1630] py-10 text-white">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <p className="mb-5 max-w-[20ch] text-3xl font-bold leading-tight tracking-tight md:text-4xl">
            {content.promesa}
          </p>
          <Button asChild size="lg" className="h-14 w-full max-w-sm rounded-xl bg-white text-base font-semibold text-primary hover:bg-white/90">
            <CtaLink accion="agendar" href={content.calendario} ubicacion="promesa" icono>
              Apartar cita
            </CtaLink>
          </Button>
        </div>
      </div>
    </section>
  );
}
