/**
 * Detección de palabras de emergencia en la narrativa del paciente.
 *
 * Síncrona y sin red: solo sirve para mostrar un aviso en vivo, nunca bloquea
 * el envío. El backend recalcula el flag con la misma lista
 * (backend-ecommerce/src/api/case/controllers/case.ts) — si se cambia aquí,
 * cambiarla allá también.
 */
const PALABRAS_EMERGENCIA = [
  "dolor de pecho",
  "dolor en el pecho",
  "no puedo respirar",
  "no puede respirar",
  "dificultad para respirar",
  "falta de aire",
  "hemorragia",
  "sangrado abundante",
  "sangra mucho",
  "no responde",
  "inconsciente",
  "desmayo",
  "se desmayo",
  "convulsion",
  "infarto",
  "derrame",
  "paralisis",
  "perdida de conocimiento",
  "suicid",
  "sobredosis",
  "envenenamiento",
  "accidente grave",
];

function normalizar(texto: string) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function detectarEmergencia(texto: string): boolean {
  const normalizado = normalizar(texto);
  return PALABRAS_EMERGENCIA.some((palabra) => normalizado.includes(palabra));
}
