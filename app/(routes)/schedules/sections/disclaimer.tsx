import { ScheduleContent } from "../config";

/** Aviso legal de la sucursal. El footer general de Lymbika va después. */
export function Disclaimer({ content }: { content: ScheduleContent }) {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-6xl space-y-1 px-5 py-6 text-sm text-muted-foreground md:px-8">
        <p className="font-medium text-foreground">Si tienes una emergencia, llama al 911 o acude a urgencias.</p>
        <p>Farmacia+ by Lymbika. Licencia Sanitaria {content.licenciaSanitaria}.</p>
      </div>
    </section>
  );
}
