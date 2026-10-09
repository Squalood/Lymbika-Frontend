import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  contarPorEstado,
  listarCasos,
  type FiltrosBandeja,
} from "@/app/data/services/case-admin-service";
import { ESTADO_COORDINADOR, ESTADOS_ORDEN, siguientePasoPaciente } from "@/lib/case/labels";
import { haceCuanto } from "@/lib/case/operations";
import { CaseEstado } from "@/types/case";
import {
  EspecialistaBadge,
  EstadoBadge,
  PrioridadBadge,
  UrgenteBadge,
} from "./components/estado-badge";
import { FilaCaso } from "./components/fila-caso";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const FILTROS: { clave: string; label: string }[] = [
  { clave: "todos", label: "Todos" },
  { clave: "urgentes", label: "Posibles emergencias" },
  ...ESTADOS_ORDEN.map((e) => ({ clave: e, label: ESTADO_COORDINADOR[e] })),
];

function hrefBandeja(params: { estado?: string; q?: string; page?: number }) {
  const sp = new URLSearchParams();
  if (params.estado && params.estado !== "todos") sp.set("estado", params.estado);
  if (params.q) sp.set("q", params.q);
  if (params.page && params.page > 1) sp.set("page", String(params.page));
  const query = sp.toString();
  return query ? `/dashboard/operations?${query}` : "/dashboard/operations";
}

export default async function BandejaPage({ searchParams }: Props) {
  const params = await searchParams;
  const estadoParam = typeof params.estado === "string" ? params.estado : "todos";
  const q = typeof params.q === "string" ? params.q : "";
  const page = Math.max(1, Number(params.page) || 1);

  const estado: FiltrosBandeja["estado"] =
    estadoParam === "urgentes" || ESTADOS_ORDEN.includes(estadoParam as CaseEstado)
      ? (estadoParam as FiltrosBandeja["estado"])
      : null;

  const [{ casos, total, paginas }, conteos] = await Promise.all([
    listarCasos({ estado, q, page }),
    contarPorEstado(),
  ]);

  return (
    <div className="space-y-5">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Volver al dashboard
      </Link>
      <div>
        <h1 className="text-2xl font-bold">Bandeja de casos</h1>
        <p className="text-sm text-muted-foreground">
          Todos los casos que llegan por la página o que da de alta el equipo.
        </p>
      </div>

      <form action="/dashboard/operations" className="flex max-w-md items-center gap-2">
        {estado && <input type="hidden" name="estado" value={estadoParam} />}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            name="q"
            defaultValue={q}
            placeholder="Buscar por nombre, número de caso o teléfono"
            className="h-10 w-full rounded-md border bg-background pl-9 pr-3 text-sm"
          />
        </div>
        <button className="h-10 rounded-md border bg-background px-4 text-sm font-medium hover:bg-muted">
          Buscar
        </button>
      </form>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por estado">
        {FILTROS.map((f) => {
          const activo = (estado ?? "todos") === f.clave;
          const n = conteos[f.clave] ?? 0;
          if (f.clave === "urgentes" && n === 0 && !activo) return null;
          return (
            <Link
              key={f.clave}
              href={hrefBandeja({ estado: f.clave, q })}
              aria-current={activo ? "page" : undefined}
              className={cn(
                "rounded-full border px-3 py-1 text-sm transition-colors",
                activo
                  ? "border-primary bg-primary text-primary-foreground"
                  : "bg-background hover:border-primary/40",
                f.clave === "urgentes" && !activo && "border-red-300 text-red-700"
              )}
            >
              {f.label} · {n}
            </Link>
          );
        })}
      </div>

      {casos.length === 0 ? (
        <div className="rounded-xl border bg-background p-10 text-center text-muted-foreground">
          {q ? `No hay casos que coincidan con “${q}”.` : "No hay casos en esta vista."}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border bg-background">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/40 text-left text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Paciente</th>
                <th className="px-4 py-3 font-medium">Procedimiento</th>
                <th className="px-4 py-3 font-medium">Especialista</th>
                <th className="px-4 py-3 font-medium">Estado</th>
                <th className="px-4 py-3 font-medium">Siguiente paso</th>
                <th className="px-4 py-3 font-medium">Recibido</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y">
              {casos.map((c) => (
                <FilaCaso key={c.documentId} href={`/dashboard/operations/${c.documentId}`}>
                  <td className="px-4 py-3 align-top">
                    <Link
                      href={`/dashboard/operations/${c.documentId}`}
                      className="font-medium hover:text-primary hover:underline"
                    >
                      {c.fullName}
                    </Link>
                    <div className="text-xs text-muted-foreground">
                      {c.caseNumber} · {c.phone}
                    </div>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {c.emergencyFlag && <UrgenteBadge />}
                      <PrioridadBadge prioridad={c.priority} />
                    </div>
                  </td>
                  <td className="px-4 py-3 align-top">
                    {c.medical_service?.name?.trim() ?? (
                      <span className="text-muted-foreground">Sin procedimiento</span>
                    )}
                  </td>
                  <td className="px-4 py-3 align-top">
                    <EspecialistaBadge nombre={c.selected_doctor?.doctorName} />
                  </td>
                  <td className="px-4 py-3 align-top">
                    <EstadoBadge estado={c.estado} />
                  </td>
                  <td className="max-w-xs px-4 py-3 align-top text-muted-foreground">
                    <span className="line-clamp-2">
                      {siguientePasoPaciente(c.estado, c.patientNextStep)}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 align-top text-muted-foreground">
                    {haceCuanto(c.createdAt)}
                  </td>
                  <td className="px-4 py-3 text-right align-top">
                    <Link
                      href={`/dashboard/operations/${c.documentId}`}
                      className="inline-flex rounded-md border bg-background px-3 py-1.5 text-sm font-medium hover:border-primary hover:text-primary"
                    >
                      Abrir
                    </Link>
                  </td>
                </FilaCaso>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {paginas > 1 && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            {total} casos · página {page} de {paginas}
          </span>
          <div className="flex gap-2">
            {page > 1 && (
              <Link
                href={hrefBandeja({ estado: estadoParam, q, page: page - 1 })}
                className="rounded-md border bg-background px-3 py-1.5 hover:bg-muted"
              >
                Anterior
              </Link>
            )}
            {page < paginas && (
              <Link
                href={hrefBandeja({ estado: estadoParam, q, page: page + 1 })}
                className="rounded-md border bg-background px-3 py-1.5 hover:bg-muted"
              >
                Siguiente
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
