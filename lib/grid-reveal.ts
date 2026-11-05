/**
 * Logica de "mostrar mas" para los grids del catalogo.
 *
 * Cuantas tarjetas se ven depende del breakpoint y eso lo decide CSS, no JS.
 * Por eso el contador del boton no puede ser un solo numero: se pinta uno por
 * breakpoint y CSS muestra el que corresponde. Un unico numero seria falso en
 * todos los tamanos menos uno.
 */

export type RevealBreakpoint = {
  /** Tarjetas visibles sin expandir en este breakpoint. */
  visibles: number;
  /** Clase de las tarjetas que aparecen a partir de este breakpoint. */
  itemClass: string;
  /** Muestra el contador solo en este breakpoint. */
  labelClass: string;
  /** Clase del boton cuando hay tarjetas ocultas hasta este breakpoint. */
  buttonClass: string;
};

/** Grid de servicios medicos: grid-cols-2 / sm:grid-cols-3 / lg:grid-cols-4.
 *  Dos filas en cada breakpoint -> 4, 6 y 8. */
export const REVEAL_SERVICIOS: RevealBreakpoint[] = [
  { visibles: 4, itemClass: "", labelClass: "sm:hidden", buttonClass: "block sm:hidden" },
  { visibles: 6, itemClass: "hidden sm:block", labelClass: "hidden sm:inline lg:hidden", buttonClass: "block lg:hidden" },
  { visibles: 8, itemClass: "hidden lg:block", labelClass: "hidden lg:inline", buttonClass: "block" },
];

/** Grid de especialidades: grid-cols-1 / sm:grid-cols-3.
 *  Dos filas en cada breakpoint -> 2 y 6. */
export const REVEAL_ESPECIALIDADES: RevealBreakpoint[] = [
  { visibles: 2, itemClass: "", labelClass: "sm:hidden", buttonClass: "block sm:hidden" },
  { visibles: 6, itemClass: "hidden sm:block", labelClass: "hidden sm:inline", buttonClass: "block" },
];

/** Clase de la tarjeta en esa posicion: la oculta hasta el breakpoint donde entra. */
export function getItemClass(breakpoints: RevealBreakpoint[], index: number): string {
  return breakpoints.find((bp) => bp.visibles > index)?.itemClass ?? "hidden";
}

/** Clase del boton, o null cuando no sobra ninguna tarjeta en ningun tamano. */
export function getButtonClass(breakpoints: RevealBreakpoint[], total: number): string | null {
  const conOcultas = breakpoints.filter((bp) => total > bp.visibles);
  return conOcultas.length > 0 ? conOcultas[conOcultas.length - 1].buttonClass : null;
}

/** Un contador por breakpoint que tenga tarjetas ocultas. */
export function getHiddenCounts(breakpoints: RevealBreakpoint[], total: number) {
  return breakpoints
    .map((bp) => ({ ocultas: total - bp.visibles, labelClass: bp.labelClass }))
    .filter((c) => c.ocultas > 0);
}
