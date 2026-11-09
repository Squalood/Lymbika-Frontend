import { cache } from "react";
import { getAuthToken } from "./get-token";
import { AdminCaseType, MiembroEquipo, OpcionCatalogo } from "@/types/case";
import { ESTADOS_CERRADOS, ETAPAS, VISTAS, type Etapa, type Vista } from "@/lib/case/labels";
import { hoyEnJuarez, sumarDias } from "@/lib/case/operations";

/**
 * Lectura de casos para /dashboard/operations.
 *
 * Usa la sesión del usuario (cookie `jwt`) contra el core REST de `case`. Quién
 * puede entrar lo decide Strapi: cualquier rol con permisos find/findOne/
 * create/update sobre `case`. Aquí no se revisa ningún nombre de rol a mano.
 * Si el usuario tiene un doctor ligado, Strapi solo le devuelve sus casos.
 */

const BASE = process.env.NEXT_PUBLIC_BACKEND_URL;
export const CASOS_POR_PAGINA = 25;

async function getStrapi(path: string) {
  const token = await getAuthToken();
  if (!token) return { status: 401, json: null };
  const res = await fetch(`${BASE}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  const json = await res.json().catch(() => null);
  return { status: res.status, json };
}

export type Acceso = "ok" | "sin-sesion" | "sin-permiso";

export type DoctorAsignado = { documentId: string; doctorName: string };

/** Una sola consulta por render: la piden el layout, el dashboard y las páginas. */
const consultarAcceso = cache(() =>
  getStrapi("/api/cases?pagination[pageSize]=1&fields[0]=caseNumber")
);

/** 200 = equipo (coordinación o especialista), 401 = sesión vencida, 403 = usuario sin el rol. */
export async function verificarAcceso(): Promise<Acceso> {
  const { status } = await consultarAcceso();
  if (status === 200) return "ok";
  if (status === 401) return "sin-sesion";
  return "sin-permiso";
}

/**
 * Doctor ligado al usuario (campo `doctor` del user en Strapi). Si existe,
 * Strapi ya le filtra los casos a los suyos y no le deja reasignarlos; aquí
 * solo sirve para ajustar la vista. null = coordinación, ve todo.
 */
export async function doctorAsignado(): Promise<DoctorAsignado | null> {
  const { json } = await consultarAcceso();
  return json?.meta?.doctorAsignado ?? null;
}

export type FiltrosBandeja = {
  etapa?: Etapa | "urgentes" | null;
  vista?: Vista | null;
  q?: string | null;
  page?: number;
};

/**
 * Query de la bandeja. Cada condición va en su propio `filters[$and][n]` para
 * que los `$or` (búsqueda, nulos) no se pisen entre sí. `coordinador` y
 * `responsable` no son filtros de Strapi: los resuelve el controller de case.
 */
function filtrosQuery({ etapa, vista, q }: FiltrosBandeja) {
  const params = new URLSearchParams();
  let n = 0;
  const y = (condicion: Record<string, string>) => {
    for (const [ruta, valor] of Object.entries(condicion)) {
      params.set(`filters[$and][${n}]${ruta}`, valor);
    }
    n++;
  };
  const enLista = (campo: string, valores: string[], operador = "$in") =>
    Object.fromEntries(valores.map((v, i) => [`[${campo}][${operador}][${i}]`, v]));
  const abiertos = () => y(enLista("estado", ESTADOS_CERRADOS, "$notIn"));

  // Los casos de prueba solo salen en su vista. Los anteriores al campo lo
  // tienen en null, por eso no basta con `$ne: true` (en SQL excluye los null).
  if (vista === "pruebas") y({ "[isTest][$eq]": "true" });
  else y({ "[$or][0][isTest][$null]": "true", "[$or][1][isTest][$eq]": "false" });

  if (etapa === "urgentes") {
    y({ "[emergencyFlag][$eq]": "true" });
    abiertos();
  } else if (etapa) {
    y(enLista("estado", ETAPAS.find((e) => e.clave === etapa)?.estados ?? []));
  }

  const hoy = hoyEnJuarez();
  switch (vista) {
    case "mios":
      params.set("coordinador", "yo");
      abiertos();
      break;
    case "vencidas":
      y({ "[nextActionDue][$lt]": hoy });
      abiertos();
      break;
    case "hoy":
      y({ "[nextActionDue][$eq]": hoy });
      abiertos();
      break;
    case "sin_responsable":
      params.set("responsable", "ninguno");
      abiertos();
      break;
    case "sin_accion":
      y({ "[$or][0][nextAction][$null]": "true", "[$or][1][nextAction][$eq]": "" });
      abiertos();
      break;
    case "origen_pendiente":
      y({ "[$or][0][originType][$null]": "true", "[$or][1][originType][$eq]": "pending" });
      break;
    case "seguimiento":
      y({ "[nextReviewDate][$gte]": hoy, "[nextReviewDate][$lte]": sumarDias(hoy, 7) });
      abiertos();
      break;
  }

  const busqueda = q?.trim();
  if (busqueda) {
    y(
      Object.fromEntries(
        ["fullName", "caseNumber", "phone"].map((campo, i) => [
          `[$or][${i}][${campo}][$containsi]`,
          busqueda,
        ])
      )
    );
  }
  return params;
}

/** Las vistas con fecha se ordenan por esa fecha; el resto, lo más nuevo primero. */
const ORDEN_POR_VISTA: Partial<Record<Vista, string>> = {
  vencidas: "nextActionDue:asc",
  hoy: "nextActionDue:asc",
  seguimiento: "nextReviewDate:asc",
};

export type FilaBandeja = Pick<
  AdminCaseType,
  | "documentId"
  | "caseNumber"
  | "fullName"
  | "phone"
  | "estado"
  | "priority"
  | "emergencyFlag"
  | "nextAction"
  | "nextActionDue"
  | "nextActionOwner"
  | "blocker"
  | "coordinator"
  | "originType"
  | "originDetail"
  | "nextReviewDate"
  | "createdAt"
  | "updatedAt"
  | "medical_service"
>;

export async function listarCasos(filtros: FiltrosBandeja) {
  const params = filtrosQuery(filtros);
  params.set("sort[0]", (filtros.vista && ORDEN_POR_VISTA[filtros.vista]) || "createdAt:desc");
  params.set("pagination[page]", String(filtros.page ?? 1));
  params.set("pagination[pageSize]", String(CASOS_POR_PAGINA));
  [
    "caseNumber",
    "fullName",
    "phone",
    "estado",
    "priority",
    "emergencyFlag",
    "nextAction",
    "nextActionDue",
    "blocker",
    "originType",
    "originDetail",
    "nextReviewDate",
    "createdAt",
    "updatedAt",
  ].forEach((campo, i) => params.set(`fields[${i}]`, campo));
  params.set("populate[medical_service][fields][0]", "name");

  const { status, json } = await getStrapi(`/api/cases?${params}`);
  if (status !== 200 || !json) return { casos: [] as FilaBandeja[], total: 0, paginas: 1 };
  return {
    casos: (json.data ?? []) as FilaBandeja[],
    total: json.meta?.pagination?.total ?? 0,
    paginas: json.meta?.pagination?.pageCount ?? 1,
  };
}

async function contar(filtros: FiltrosBandeja) {
  const params = filtrosQuery(filtros);
  params.set("pagination[pageSize]", "1");
  params.set("fields[0]", "caseNumber");
  const { json } = await getStrapi(`/api/cases?${params}`);
  return (json?.meta?.pagination?.total ?? 0) as number;
}

/**
 * Totales de los chips de la bandeja: por etapa (sin vista) y por vista (sin
 * etapa). Cada uno es independiente de la búsqueda y del otro filtro.
 */
export async function contarBandeja() {
  const etapas: (Etapa | "urgentes" | null)[] = [null, "urgentes", ...ETAPAS.map((e) => e.clave)];
  const [porEtapa, porVista] = await Promise.all([
    Promise.all(etapas.map(async (etapa) => [etapa ?? "todos", await contar({ etapa })] as const)),
    Promise.all(VISTAS.map(async ({ clave }) => [clave, await contar({ vista: clave })] as const)),
  ]);
  return {
    etapas: Object.fromEntries(porEtapa) as Record<string, number>,
    vistas: Object.fromEntries(porVista) as Record<Vista, number>,
  };
}

/** Coordinación y especialistas: opciones de coordinador y responsable. */
export async function listarEquipo(): Promise<MiembroEquipo[]> {
  const { status, json } = await getStrapi("/api/cases/equipo/miembros");
  return status === 200 ? ((json?.data ?? []) as MiembroEquipo[]) : [];
}

export type CasoConTelefono = Pick<AdminCaseType, "documentId" | "caseNumber" | "fullName" | "estado">;

/**
 * Casos con el mismo teléfono, para avisar al dar de alta uno nuevo. El
 * teléfono se guarda como lo escribieron ("656 123 4567", "+52…"): Strapi
 * busca por los últimos 4 dígitos y aquí se comparan los 10 últimos.
 */
export async function casosConTelefono(telefono: string): Promise<CasoConTelefono[]> {
  const digitos = telefono.replace(/\D/g, "").slice(-10);
  if (digitos.length < 10) return [];
  const params = new URLSearchParams({
    "filters[phone][$containsi]": digitos.slice(-4),
    "pagination[pageSize]": "50",
    "fields[0]": "caseNumber",
    "fields[1]": "fullName",
    "fields[2]": "estado",
    "fields[3]": "phone",
  });
  const { status, json } = await getStrapi(`/api/cases?${params}`);
  if (status !== 200) return [];
  return ((json?.data ?? []) as (CasoConTelefono & { phone: string })[])
    .filter((c) => c.phone.replace(/\D/g, "").slice(-10) === digitos)
    .map(({ documentId, caseNumber, fullName, estado }) => ({ documentId, caseNumber, fullName, estado }));
}

export async function obtenerCaso(documentId: string): Promise<AdminCaseType | null> {
  if (!/^[a-z0-9]{10,40}$/i.test(documentId)) return null;
  const params = new URLSearchParams({
    "populate[medical_service][fields][0]": "name",
    "populate[selected_doctor][fields][0]": "doctorName",
    "populate[hospital][fields][0]": "hospitalName",
    "populate[documents]": "true",
    "populate[followUpTasks]": "true",
  });
  const { status, json } = await getStrapi(`/api/cases/${documentId}?${params}`);
  return status === 200 ? (json?.data as AdminCaseType) : null;
}

// ── Catálogos para los selectores (públicos, cambian poco) ──────────────────

async function catalogo(
  path: string,
  campo: string
): Promise<OpcionCatalogo[]> {
  try {
    const res = await fetch(
      `${BASE}${path}?fields[0]=${campo}&sort[0]=${campo}:asc&pagination[pageSize]=500`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    const json = await res.json();
    return (json.data ?? [])
      .filter((r: Record<string, unknown>) => r[campo])
      .map((r: Record<string, string>) => ({
        documentId: r.documentId,
        label: String(r[campo]).trim(),
      }))
      // Strapi ordena con los espacios sobrantes de los nombres; se reordena ya limpio.
      .sort((a: OpcionCatalogo, b: OpcionCatalogo) => a.label.localeCompare(b.label, "es"));
  } catch {
    return [];
  }
}

export async function catalogosDelCaso() {
  const [doctores, hospitales, procedimientos] = await Promise.all([
    catalogo("/api/doctors", "doctorName"),
    catalogo("/api/hospitals", "hospitalName"),
    catalogo("/api/medical-services", "name"),
  ]);
  return { doctores, hospitales, procedimientos };
}
