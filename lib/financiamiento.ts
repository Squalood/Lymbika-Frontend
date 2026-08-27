// Esquema de financiamiento de la clinica. Sobretasa de Banregio por plazo.
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

// Formula de la clinica: total = precio / (1 - (sobretasa + 0.04) x 1.08).
// Se divide, no se multiplica, porque el banco retiene su comision sobre el monto
// bruto cobrado: multiplicar dejaria a Lymbika siempre por debajo del neto.
// Ceil y no round: redondear hacia abajo deja el neto por debajo del precio.
export function mensualidad(price: number, meses: number, sobretasa: number) {
  const tasaEfectiva = (sobretasa + COMISION_TERMINAL) * (1 + IVA_COMISION);
  const bruto = price / (1 - tasaEfectiva);
  return Math.ceil(bruto / meses);
}

// Mensualidad mas baja disponible (plazo mas largo). Devuelve null cuando el
// precio no alcanza el piso, para que quien llama simplemente no pinte la linea.
export function mensualidadMinima(price: number) {
  if (price < FINANCIAMIENTO_MIN_PRICE) return null;

  const rows = PLAZOS_FINANCIAMIENTO.map((plazo) => ({
    meses: plazo.meses,
    monthly: mensualidad(price, plazo.meses, plazo.sobretasa),
  }));

  return rows.reduce((min, r) => (r.monthly < min.monthly ? r : min), rows[0]);
}
