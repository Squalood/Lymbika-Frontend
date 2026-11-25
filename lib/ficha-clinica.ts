import type {
  ComposicionType,
  PrincipioActivoType,
  ProductType,
  SeguridadEmbarazo,
} from "@/types/product";

/**
 * Lógica de presentación de la ficha clínica del producto (sin JSX).
 * Los valores de las listas vienen de los schemas de Strapi; ver
 * Lymbika-Backend/docs/ficha-clinica-productos.md §2.
 */

// ── Etiquetas ────────────────────────────────────────────────────────────────

const FORMA: Record<string, string> = {
  tableta: "Tableta",
  tabletaMasticable: "Tableta masticable",
  tabletaEfervescente: "Tableta efervescente",
  tabletaSublingual: "Tableta sublingual",
  capsula: "Cápsula",
  jarabe: "Jarabe",
  suspension: "Suspensión",
  solucionOral: "Solución oral",
  gotasOrales: "Gotas orales",
  polvo: "Polvo",
  crema: "Crema",
  gel: "Gel",
  unguento: "Ungüento",
  locion: "Loción",
  solucionTopica: "Solución tópica",
  spray: "Spray",
  inhalador: "Inhalador",
  solucionNebulizar: "Solución para nebulizar",
  solucionNasal: "Solución nasal",
  gotasOftalmicas: "Gotas oftálmicas",
  gotasOticas: "Gotas óticas",
  ovulo: "Óvulo",
  supositorio: "Supositorio",
  inyectable: "Inyectable",
  parche: "Parche",
  otro: "Otra",
};

const VIA: Record<string, string> = {
  oral: "Oral",
  sublingual: "Sublingual",
  topica: "Tópica",
  oftalmica: "Oftálmica",
  otica: "Ótica",
  nasal: "Nasal",
  inhalada: "Inhalada",
  vaginal: "Vaginal",
  rectal: "Rectal",
  intramuscular: "Intramuscular",
  intravenosa: "Intravenosa",
  subcutanea: "Subcutánea",
  otra: "Otra",
};

/** Plural (para el contenido) y singular (para el precio por unidad). */
const CONTENIDO: Record<string, [string, string | null]> = {
  tabletas: ["tabletas", "tableta"],
  capsulas: ["cápsulas", "cápsula"],
  ml: ["ml", null],
  g: ["g", null],
  sobres: ["sobres", "sobre"],
  piezas: ["piezas", "pieza"],
  ampolletas: ["ampolletas", "ampolleta"],
  ovulos: ["óvulos", "óvulo"],
  supositorios: ["supositorios", "supositorio"],
  parches: ["parches", "parche"],
  dosis: ["dosis", "dosis"],
};

const UNIDAD: Record<string, string> = { porcentaje: "%", gota: "gota", dosis: "dosis" };

export const SEGURIDAD: Record<SeguridadEmbarazo, { texto: string; tono: "ok" | "aviso" | "alto" | "neutro" }> = {
  compatible: { texto: "Compatible", tono: "ok" },
  precaucion: { texto: "Con precaución", tono: "aviso" },
  contraindicado: { texto: "No recomendado", tono: "alto" },
  sinDatos: { texto: "Sin datos suficientes", tono: "neutro" },
};

export const etiquetaForma = (v?: string | null) => (v ? FORMA[v] ?? v : null);
export const etiquetaVia = (v?: string | null) => (v ? VIA[v] ?? v : null);

// ── Composición ──────────────────────────────────────────────────────────────

function numero(n: number | null | undefined): string {
  return n === null || n === undefined ? "" : String(Number(n));
}

/** "Paracetamol 250 mg / 5 ml", "Sulfadiazina de plata 1%", "Omega 3". */
export function renglonComposicion(c: ComposicionType): string | null {
  const nombre = c.principioActivo?.nombre;
  if (!nombre) return null;
  if (c.cantidad === null || c.cantidad === undefined) return nombre;
  const unidad = c.unidad ? UNIDAD[c.unidad] ?? c.unidad : "";
  const dosis = unidad === "%" ? `${numero(c.cantidad)}%` : `${numero(c.cantidad)} ${unidad}`.trim();
  const por = c.porUnidad ? ` / ${[numero(c.porCantidad), UNIDAD[c.porUnidad] ?? c.porUnidad].filter(Boolean).join(" ")}` : "";
  return `${nombre} ${dosis}${por}`;
}

export function principiosDe(product: ProductType): PrincipioActivoType[] {
  return (product.composicion ?? [])
    .map((c) => c.principioActivo)
    .filter((p): p is PrincipioActivoType => !!p);
}

// ── Presentación ─────────────────────────────────────────────────────────────

/** "20 tabletas", "120 ml". */
export function textoContenido(product: ProductType): string | null {
  const { contenidoCantidad: n, contenidoUnidad: u } = product;
  if (!n || !u) return null;
  return `${numero(n)} ${CONTENIDO[u]?.[0] ?? u}`;
}

/**
 * Precio por unidad para comparar presentaciones ("$1.06 por tableta"). Solo
 * para unidades que se cuentan: por ml o por gramo no le dice nada al cliente.
 */
export function precioPorUnidad(product: ProductType): { precio: number; unidad: string } | null {
  const { contenidoCantidad: n, contenidoUnidad: u, price } = product;
  const singular = u ? CONTENIDO[u]?.[1] : null;
  if (!n || n <= 1 || !singular || !(price > 0)) return null;
  return { precio: price / n, unidad: singular };
}

/** "A partir de 12 años", "A partir de 6 meses". */
export function textoEdadMinima(meses?: number | null): string | null {
  if (meses === null || meses === undefined || meses <= 0) return null;
  if (meses < 24) return `A partir de ${meses} ${meses === 1 ? "mes" : "meses"}`;
  const anios = Math.floor(meses / 12);
  return `A partir de ${anios} años`;
}

// ── Seguridad (el caso más restrictivo entre las sustancias) ─────────────────

// Un combinado es tan seguro como su sustancia menos segura: con paracetamol
// (compatible) + fenilefrina (precaución), el producto es "con precaución".
const ORDEN: SeguridadEmbarazo[] = ["compatible", "sinDatos", "precaucion", "contraindicado"];

export function peorCaso(valores: (SeguridadEmbarazo | null)[]): SeguridadEmbarazo | null {
  const conocidos = valores.filter((v): v is SeguridadEmbarazo => !!v);
  if (!conocidos.length) return null;
  // Si alguna sustancia no tiene dato, no se puede afirmar "compatible".
  const base = conocidos.length < valores.length ? ["sinDatos" as SeguridadEmbarazo, ...conocidos] : conocidos;
  return base.reduce((peor, v) => (ORDEN.indexOf(v) > ORDEN.indexOf(peor) ? v : peor));
}

/** true si alguna da sueño, false solo si todas tienen dato y ninguna, null si no se sabe. */
export function somnolencia(principios: PrincipioActivoType[]): boolean | null {
  if (principios.some((p) => p.causaSomnolencia === true)) return true;
  if (principios.length && principios.every((p) => p.causaSomnolencia === false)) return false;
  return null;
}

// ── Textos por sustancia ─────────────────────────────────────────────────────

type CampoTexto = "contraindicaciones" | "advertencias" | "interacciones" | "efectosAdversos";

/**
 * Junta un campo de texto de todas las sustancias. Con una sola, solo el texto;
 * con varias, cada una con su nombre para que se sepa a cuál se refiere.
 */
export function textosPorSustancia(principios: PrincipioActivoType[], campo: CampoTexto): { nombre: string | null; texto: string }[] {
  const con = principios.filter((p) => p[campo]?.trim());
  return con.map((p) => ({ nombre: con.length > 1 ? p.nombre : null, texto: p[campo]!.trim() }));
}

// ── ¿Hay algo que mostrar? ───────────────────────────────────────────────────

export function tieneFicha(product: ProductType): boolean {
  return Boolean(
    product.composicion?.length ||
      product.indicaciones?.length ||
      product.formaFarmaceutica ||
      product.contenidoCantidad ||
      product.posologia
  );
}

/** Revisada de verdad: el producto y todas sus sustancias (de ahí sale lo clínico). */
export function fichaRevisada(product: ProductType): boolean {
  return product.estadoFicha === "revisada" && principiosDe(product).every((p) => p.estadoFicha === "revisada");
}
