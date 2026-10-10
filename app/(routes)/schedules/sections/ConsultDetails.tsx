import { Check } from "lucide-react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { ScheduleContent, whatsappHref } from "../config";
import { CtaLink } from "./CtaLink";

export function ConsultDetails({ content }: { content: ScheduleContent }) {
  return (
    <section aria-labelledby="t-incluye" className="mx-auto grid max-w-6xl gap-10 px-5 py-10 md:grid-cols-2 md:gap-12 md:px-8 md:py-14">
      <div>
        <h2 id="t-incluye" className="mb-5 text-2xl font-bold text-primary md:text-3xl">
          Qué incluye tu consulta
        </h2>
        <ul className="grid gap-3">
          {content.incluye.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Check className="h-3 w-3" strokeWidth={3} />
              </span>
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-6 rounded-r-xl border-l-4 border-primary bg-primary/5 px-4 py-3 text-sm">
          {content.aviso.negritas && <strong className="text-primary">{content.aviso.negritas}</strong>}{" "}
          {content.aviso.texto}
        </p>

        <h3 className="mb-2 mt-9 text-lg font-bold text-primary">Precios</h3>
        <Table>
          <TableBody>
            {content.precios.map((p) => (
              <TableRow key={p.servicio} className="hover:bg-transparent">
                <TableCell className="px-0 py-4 align-top">
                  <span className="block font-semibold">{p.servicio}</span>
                  <span className="block text-sm text-muted-foreground">{p.nota}</span>
                </TableCell>
                <TableCell className="whitespace-nowrap py-4 pl-3 pr-0 text-right align-top font-bold text-primary">
                  {p.precio ? `$${p.precio} MXN` : <span className="font-medium text-muted-foreground">Se cotiza</span>}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <p className="mt-3 text-sm text-muted-foreground">
          {content.notaPrecios}
        </p>
      </div>

      <div>
        <h2 className="mb-5 text-2xl font-bold text-primary md:text-3xl">¿Qué podemos atender?</h2>
        <ul className="border-t border-border">
          {content.atendemos.map((motivo) => (
            <li key={motivo}>
              <CtaLink
                accion="whatsapp"
                href={whatsappHref(content, motivo)}
                ubicacion="motivos"
                motivo={motivo}
                ariaLabel={`Preguntar por WhatsApp: ${motivo}`}
                className="flex items-center justify-between gap-3 border-b border-border py-3 transition-colors hover:text-primary"
              >
                {motivo}
                <span className="whitespace-nowrap text-sm font-semibold text-green-600">Preguntar</span>
              </CtaLink>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-sm text-muted-foreground">
          ¿Tu caso no está aquí? También te atendemos: la valoración sirve para saber qué sigue.
        </p>
      </div>
    </section>
  );
}
