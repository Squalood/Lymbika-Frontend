// Esquema de financiamiento de la clinica. Fuente unica: la landing de medical
// service y la pagina de clinicas leen de aqui, no de copias propias.

// Sobretasa de Banregio por plazo.
// Todos los plazos llevan sobretasa: no hay meses sin intereses.
export const PLAZOS_FINANCIAMIENTO = [
  { meses: 3, sobretasa: 0.035 },
  { meses: 6, sobretasa: 0.055 },
  { meses: 9, sobretasa: 0.085 },
  { meses: 12, sobretasa: 0.115 },
  { meses: 18, sobretasa: 0.15 },
];

// Comision fija de la terminal, se suma a la sobretasa del plazo.
export const COMISION_TERMINAL = 0.04;

// IVA sobre la comision bancaria (8% en zona fronteriza).
export const IVA_COMISION = 0.08;

// Piso para mostrar el financiamiento: no aplica en consultas ni estudios baratos.
export const FINANCIAMIENTO_MIN_PRICE = 10000;

export type PlanFinanciamiento = {
  meses: number;
  sobretasa: number;
  /** Lo que paga el paciente cada mes. */
  monthly: number;
  /** Lo que acaba pagando en total: mensualidad x meses. */
  total: number;
};

/**
 * Formula de la clinica: total = precio / (1 - (sobretasa + 0.04) x 1.08).
 *
 * Se divide, no se multiplica, porque el banco retiene su comision sobre el
 * monto bruto cobrado: multiplicar por (1 + tasa) dejaria a Lymbika siempre por
 * debajo del neto, con un faltante de precio x tasa^2.
 *
 * Ceil y no round: redondear hacia abajo deja el neto por debajo del precio.
 */
export function mensualidad(price: number, meses: number, sobretasa: number) {
  const tasaEfectiva = (sobretasa + COMISION_TERMINAL) * (1 + IVA_COMISION);
  const bruto = price / (1 - tasaEfectiva);
  return Math.ceil(bruto / meses);
}

/**
 * Todos los plazos con su mensualidad y su total.
 *
 * El total se deriva de mensualidad x meses porque el banco cobra mensualidades
 * iguales: si el paciente multiplica lo que ve, le tiene que cuadrar.
 */
export function planesFinanciamiento(price: number): PlanFinanciamiento[] {
  return PLAZOS_FINANCIAMIENTO.map((plazo) => {
    const monthly = mensualidad(price, plazo.meses, plazo.sobretasa);
    return { ...plazo, monthly, total: monthly * plazo.meses };
  });
}

/**
 * Plazo con la mensualidad mas baja. Devuelve null cuando el precio no alcanza
 * el piso, para que quien llama simplemente no pinte la linea.
 */
export function mensualidadMinima(price: number): PlanFinanciamiento | null {
  if (price < FINANCIAMIENTO_MIN_PRICE) return null;

  const planes = planesFinanciamiento(price);
  return planes.reduce((min, plan) => (plan.monthly < min.monthly ? plan : min), planes[0]);
}

// La copia se deriva de la tabla para que no se desincronice de los numeros.

/** Plazo mas largo disponible. */
export const MAX_MESES = Math.max(...PLAZOS_FINANCIAMIENTO.map((p) => p.meses));

/** "3m 3.5%, 6m 5.5%, ..." para la nota legal. */
export const SOBRETASAS_TEXTO = PLAZOS_FINANCIAMIENTO
  .map((plazo) => `${plazo.meses}m ${(plazo.sobretasa * 100).toFixed(1)}%`)
  .join(", ");
