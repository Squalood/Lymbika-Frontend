import { getAuthToken } from "./get-token";
import { AdminCaseType, CaseEstado, OpcionCatalogo } from "@/types/case";
import { ESTADOS_ORDEN } from "@/lib/case/labels";

/**
 * Lectura de casos para /dashboard/operations.
 *
 * Usa la sesión del usuario (cookie `jwt`) contra el core REST de `case`. Quién
 * puede entrar lo decide Strapi: cualquier rol con permisos find/findOne/
 * create/update sobre `case`. Aquí no se revisa ningún nombre de rol a mano.
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

/** 200 = coordinador, 401 = sesión vencida, 403 = usuario sin el rol. */
export async function verificarAcceso(): Promise<Acceso> {
  const { status } = await getStrapi("/api/cases?pagination[pageSize]=1&fields[0]=caseNumber");
  if (status === 200) return "ok";
  if (status === 401) return "sin-sesion";
  return "sin-permiso";
}

export type FiltrosBandeja = {
  estado?: CaseEstado | "urgentes" | null;
  q?: string | null;
  page?: number;
};

const ABIERTOS = ESTADOS_ORDEN.filter((e) => !e.startsWith("closed_"));

function filtrosQuery({ estado, q }: FiltrosBandeja) {
  const params = new URLSearchParams();
  if (estado === "urgentes") {
    params.set("filters[emergencyFlag][$eq]", "true");
    ABIERTOS.forEach((e, i) => params.set(`filters[estado][$in][${i}]`, e));
  } else if (estado) {
    params.set("filters[estado][$eq]", estado);
  }
  const busqueda = q?.trim();
  if (busqueda) {
    ["fullName", "caseNumber", "phone"].forEach((campo, i) =>
      params.set(`filters[$or][${i}][${campo}][$containsi]`, busqueda)
    );
  }
  return params;
}

export type FilaBandeja = Pick<
  AdminCaseType,
  | "documentId"
  | "caseNumber"
  | "fullName"
  | "phone"
  | "estado"
  | "priority"
  | "emergencyFlag"
  | "patientNextStep"
  | "createdAt"
  | "updatedAt"
  | "medical_service"
  | "selected_doctor"
>;

export async function listarCasos(filtros: FiltrosBandeja) {
  const params = filtrosQuery(filtros);
  params.set("sort[0]", "createdAt:desc");
  params.set("pagination[page]", String(filtros.page ?? 1));
  params.set("pagination[pageSize]", String(CASOS_POR_PAGINA));
  [
    "caseNumber",
    "fullName",
    "phone",
    "estado",
    "priority",
    "emergencyFlag",
    "patientNextStep",
    "createdAt",
    "updatedAt",
  ].forEach((campo, i) => params.set(`fields[${i}]`, campo));
  params.set("populate[medical_service][fields][0]", "name");
  params.set("populate[selected_doctor][fields][0]", "doctorName");

  const { status, json } = await getStrapi(`/api/cases?${params}`);
  if (status !== 200 || !json) return { casos: [] as FilaBandeja[], total: 0, paginas: 1 };
  return {
    casos: json.data as FilaBandeja[],
    total: json.meta?.pagination?.total ?? 0,
    paginas: json.meta?.pagination?.pageCount ?? 1,
  };
}

/** Cuántos casos hay en cada estado (para los chips de la bandeja). */
export async function contarPorEstado() {
  const claves: (CaseEstado | "urgentes" | null)[] = [null, "urgentes", ...ESTADOS_ORDEN];
  const totales = await Promise.all(
    claves.map(async (estado) => {
      const params = filtrosQuery({ estado });
      params.set("pagination[pageSize]", "1");
      params.set("fields[0]", "caseNumber");
      const { json } = await getStrapi(`/api/cases?${params}`);
      return [estado ?? "todos", json?.meta?.pagination?.total ?? 0] as const;
    })
  );
  return Object.fromEntries(totales) as Record<string, number>;
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
