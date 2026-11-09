import Link from "next/link";
import { AlertTriangle, ArrowLeft, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  contarBandeja,
  doctorAsignado,
  listarCasos,
  type FilaBandeja,
  type FiltrosBandeja,
} from "@/app/data/services/case-admin-service";
import {
  ESTADOS_CERRADOS,
  ETAPAS,
  ORIGEN,
  SIN_REGISTRAR,
  VISTAS,
  type Vista,
} from "@/lib/case/labels";
import { fechaCorta, haceCuanto, hoyEnJuarez } from "@/lib/case/operations";
import { EtapaBadge, PrioridadBadge, UrgenteBadge } from "./components/estado-badge";
import { FilaCaso } from "./components/fila-caso";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const FILTROS_ETAPA: { clave: string; label: string }[] = [
  { clave: "todos", label: "Todos" },
  { clave: "urgentes", label: "Posibles emergencias" },
  ...ETAPAS.map((e) => ({ clave: e.clave, label: e.label })),
];

type ParamsBandeja = { etapa?: string; vista?: string; q?: string; page?: number };

function hrefBandeja({ etapa, vista, q, page }: ParamsBandeja) {
  const sp = new URLSearchParams();
  if (etapa && etapa !== "todos") sp.set("etapa", etapa);
  if (vista) sp.set("vista", vista);
  if (q) sp.set("q", q);
  if (page && page > 1) sp.set("page", String(page));
  const query = sp.toString();
  return query ? `/dashboard/operations?${query}` : "/dashboard/operations";
}

function Chip({ href, activo, alerta, children }: {
  href: string;
  activo: boolean;
  alerta?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={activo ? "page" : undefined}
      className={cn(
        "rounded-full border px-3 py-1 text-sm transition-colors",
        activo
          ? "border-primary bg-primary text-primary-foreground"
          : "bg-background hover:border-primary/40",
        alerta && !activo && "border-red-300 text-red-700"
      )}
    >
      {children}
    </Link>
  );
}

function ProximaAccion({ caso, hoy }: { caso: FilaBandeja; hoy: string }) {
  const abierto = !ESTADOS_CERRADOS.includes(caso.estado);
  const vencida = Boolean(abierto && caso.nextActionDue && caso.nextActionDue < hoy);
  const esHoy = caso.nextActionDue === hoy;
  return (
    <div className="space-y-1">
      {caso.nextAction?.trim() ? (
        <span className="line-clamp-2">{caso.nextAction}</span>
      ) : (
        <span className="text-muted-foreground">Sin próxima acción</span>
      )}
      <div className="flex flex-wrap gap-x-2 text-xs text-muted-foreground">
        <span>{caso.nextActionOwner?.nombre ?? "Sin responsable"}</span>
        {caso.nextActionDue && (
          <span className={cn(vencida && "font-medium text-red-700", esHoy && "font-medium text-primary")}>
            {vencida ? "venció " : esHoy ? "hoy" : ""}
            {!esHoy && fechaCorta(caso.nextActionDue)}
          </span>
        )}
      </div>
      {caso.blocker?.trim() && (
        <div className="flex items-start gap-1 text-xs text-amber-800">
          <AlertTriangle className="mt-0.5 h-3 w-3 shrink-0" />
          <span className="line-clamp-2">{caso.blocker}</span>
        </div>
      )}
    </div>
  );
}

function Origen({ caso }: { caso: FilaBandeja }) {
  if (!caso.originType || caso.originType === "pending") {
    return (
      <span className="inline-flex whitespace-nowrap rounded-full border border-dashed border-amber-400 px-2 py-0.5 text-xs text-amber-800">
        {caso.originType ? "Pendiente" : SIN_REGISTRAR}
      </span>
    );
  }
  return (
    <div>
      <div>{ORIGEN[caso.originType]}</div>
      {caso.originDetail && <div className="text-xs text-muted-foreground">{caso.originDetail}</div>}
    </div>
  );
}

export default async function BandejaPage({ searchParams }: Props) {
  const params = await searchParams;
  const etapaParam = typeof params.etapa === "string" ? params.etapa : "todos";
  const vistaParam = typeof params.vista === "string" ? params.vista : "";
  const q = typeof params.q === "string" ? params.q : "";
  const page = Math.max(1, Number(params.page) || 1);

  const etapa: FiltrosBandeja["etapa"] =
    etapaParam === "urgentes" || ETAPAS.some((e) => e.clave === etapaParam)
      ? (etapaParam as FiltrosBandeja["etapa"])
      : null;
  const vista = VISTAS.some((v) => v.clave === vistaParam) ? (vistaParam as Vista) : null;

  const [{ casos, total, paginas }, conteos, doctor] = await Promise.all([
    listarCasos({ etapa, vista, q, page }),
    contarBandeja(),
    doctorAsignado(),
  ]);
  const hoy = hoyEnJuarez();

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
          {doctor
            ? "Los casos en los que eres el especialista asignado."
            : "Todos los casos que llegan por la página o que da de alta el equipo."}
        </p>
      </div>

      <form action="/dashboard/operations" className="flex max-w-md items-center gap-2">
        {etapa && <input type="hidden" name="etapa" value={etapaParam} />}
        {vista && <input type="hidden" name="vista" value={vista} />}
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

      <div className="space-y-2">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Accesos rápidos">
          {VISTAS.map((v) => {
            const activo = vista === v.clave;
            const n = conteos.vistas[v.clave] ?? 0;
            return (
              <Chip
                key={v.clave}
                href={hrefBandeja({ etapa: etapaParam, vista: activo ? undefined : v.clave, q })}
                activo={activo}
                alerta={v.clave === "vencidas" && n > 0}
              >
                {v.label} · {n}
              </Chip>
            );
          })}
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por etapa">
          {FILTROS_ETAPA.map((f) => {
            const activo = (etapa ?? "todos") === f.clave;
            const n = conteos.etapas[f.clave] ?? 0;
            if (f.clave === "urgentes" && n === 0 && !activo) return null;
            return (
              <Chip
                key={f.clave}
                href={hrefBandeja({ etapa: f.clave, vista: vista ?? undefined, q })}
                activo={activo}
                alerta={f.clave === "urgentes"}
              >
                {f.label} · {n}
              </Chip>
            );
          })}
        </div>
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
                <th className="min-w-[14rem] px-4 py-3 font-medium">Próxima acción</th>
                <th className="px-4 py-3 font-medium">Etapa</th>
                <th className="px-4 py-3 font-medium">Coordinador</th>
                <th className="px-4 py-3 font-medium">Origen</th>
                <th className="px-4 py-3 font-medium">Procedimiento</th>
                <th className="px-4 py-3 font-medium">Última gestión</th>
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
                  <td className="max-w-xs px-4 py-3 align-top">
                    <ProximaAccion caso={c} hoy={hoy} />
                  </td>
                  <td className="px-4 py-3 align-top">
                    <EtapaBadge estado={c.estado} />
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 align-top">
                    {c.coordinator?.nombre ?? <span className="text-muted-foreground">Sin asignar</span>}
                  </td>
                  <td className="px-4 py-3 align-top">
                    <Origen caso={c} />
                  </td>
                  <td className="px-4 py-3 align-top">
                    {c.medical_service?.name?.trim() ?? (
                      <span className="text-muted-foreground">Sin procedimiento</span>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 align-top text-muted-foreground">
                    {haceCuanto(c.updatedAt)}
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
                href={hrefBandeja({ etapa: etapaParam, vista: vista ?? undefined, q, page: page - 1 })}
                className="rounded-md border bg-background px-3 py-1.5 hover:bg-muted"
              >
                Anterior
              </Link>
            )}
            {page < paginas && (
              <Link
                href={hrefBandeja({ etapa: etapaParam, vista: vista ?? undefined, q, page: page + 1 })}
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
