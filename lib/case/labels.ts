import {
  CaseAporto,
  CaseCanal,
  CaseEstado,
  CaseMotivoCierre,
  CaseOrigen,
  CasePriority,
} from "@/types/case";

/**
 * Vocabulario del paciente para cada estado interno del caso.
 *
 * El paciente nunca ve el enum (`in_assessment`), solo estas frases. El
 * coordinador puede sobrescribir el siguiente paso desde el admin de Strapi con
 * `patientNextStep`; si viene vacío se usa el de este mapa.
 */
export const ESTADO_PACIENTE: Record<CaseEstado, string> = {
  new: "Tu caso fue recibido. Un coordinador de Lymbika te contactará muy pronto.",
  in_coordination: "Un coordinador ya está revisando tu caso.",
  in_assessment: "Estamos coordinando tu valoración, estudios y/o cotización.",
  in_decision: "Ya tienes opciones. Estamos listos para resolver tus dudas y ayudarte a decidir.",
  scheduled: "Tu procedimiento está programado.",
  in_surgery: "Tu procedimiento está en curso.",
  in_follow_up: "Estamos dando seguimiento a tu recuperación.",
  closed_won: "Tu caso está concluido. Gracias por confiar en Lymbika.",
  closed_lost: "Tu caso está cerrado. Si necesitas retomarlo, escríbenos por WhatsApp.",
};

export const SIGUIENTE_PASO_PACIENTE: Record<CaseEstado, string> = {
  new: "Estamos revisando tu información. El siguiente paso es confirmar contigo algunos datos para orientarte correctamente.",
  in_coordination: "Tu coordinador te contactará para entender mejor tu caso y proponerte especialistas.",
  in_assessment: "Tu coordinador te pedirá algunos estudios o te ayudará a agendar tu valoración.",
  in_decision: "Revisa tus opciones con tu coordinador y dinos cómo quieres continuar.",
  scheduled: "Tu coordinador te compartirá las indicaciones antes de tu procedimiento.",
  in_surgery: "Tu coordinador estará pendiente y te informará del siguiente paso.",
  in_follow_up: "Completa las tareas de seguimiento y avísanos cualquier duda.",
  closed_won: "Si necesitas algo más, escríbenos por WhatsApp.",
  closed_lost: "Si necesitas retomarlo, escríbenos por WhatsApp.",
};

export function siguientePasoPaciente(estado: CaseEstado, patientNextStep: string | null) {
  return patientNextStep?.trim() || SIGUIENTE_PASO_PACIENTE[estado];
}

/** Vocabulario del equipo en /dashboard/operations. El paciente nunca ve estas etiquetas. */
export const ESTADO_COORDINADOR: Record<CaseEstado, string> = {
  new: "Nuevo",
  in_coordination: "En coordinación",
  in_assessment: "Valoración / estudios",
  in_decision: "Paciente decidiendo",
  scheduled: "Programado",
  in_surgery: "En cirugía",
  in_follow_up: "Seguimiento",
  closed_won: "Cerrado con cirugía",
  closed_lost: "Cerrado sin cirugía",
};

export const ESTADOS_ORDEN = Object.keys(ESTADO_COORDINADOR) as CaseEstado[];

export const ESTADOS_CERRADOS: CaseEstado[] = ["closed_won", "closed_lost"];

export type Etapa = "valoracion" | "decision" | "programacion" | "seguimiento" | "cerrado";

/**
 * Las 5 etapas que ve el equipo. Agrupan los 9 estados del backend sin
 * cambiarlos: los casos viejos, los filtros y lo que ve el paciente siguen
 * funcionando con el estado; la etapa solo es la vista de conjunto.
 */
export const ETAPAS: { clave: Etapa; label: string; estados: CaseEstado[] }[] = [
  {
    clave: "valoracion",
    label: "Valoración y plan",
    estados: ["new", "in_coordination", "in_assessment"],
  },
  { clave: "decision", label: "Opciones y decisión", estados: ["in_decision"] },
  { clave: "programacion", label: "Programación y atención", estados: ["scheduled", "in_surgery"] },
  { clave: "seguimiento", label: "Seguimiento", estados: ["in_follow_up"] },
  { clave: "cerrado", label: "Cerrado", estados: ESTADOS_CERRADOS },
];

export function etapaDe(estado: CaseEstado) {
  return ETAPAS.find((e) => e.estados.includes(estado)) ?? ETAPAS[0];
}

export const ORIGEN: Record<CaseOrigen, string> = {
  campaign: "Campaña",
  node: "Nodo",
  company: "Empresa",
  community: "Comunidad",
  doctor: "Médico",
  referral: "Recomendación",
  other: "Otro",
  pending: "Pendiente de identificar",
};

/** Pregunta del campo "fuente específica" según el origen; sin entrada, no se pide. */
export const ORIGEN_DETALLE: Partial<Record<CaseOrigen, string>> = {
  campaign: "¿Qué campaña?",
  node: "¿Qué nodo?",
  company: "¿Qué empresa?",
  community: "¿Qué comunidad?",
  doctor: "¿Qué médico?",
  referral: "¿Quién lo recomendó?",
  other: "¿Cuál?",
};

export const CANAL: Record<CaseCanal, string> = {
  whatsapp: "WhatsApp",
  web: "Página web",
  phone: "Teléfono",
  in_person: "Presencial",
};

export const APORTO: Record<CaseAporto, string> = {
  lymbika: "Lymbika",
  doctor: "Un médico",
};

export const MOTIVO_CIERRE: Record<CaseMotivoCierre, string> = {
  no_contact: "No se logró contactar",
  not_candidate: "No es candidato",
  price: "Precio",
  chose_other: "Eligió otra opción",
  not_interested: "Ya no le interesa",
  postponed: "Lo pospuso",
  other: "Otro",
};

export type Vista =
  | "mios"
  | "vencidas"
  | "hoy"
  | "sin_responsable"
  | "sin_accion"
  | "origen_pendiente"
  | "seguimiento"
  | "pruebas";

/** Accesos rápidos de la bandeja. Salvo origen pendiente y pruebas, solo casos abiertos. */
export const VISTAS: { clave: Vista; label: string }[] = [
  { clave: "mios", label: "Mis casos" },
  { clave: "vencidas", label: "Vencidas" },
  { clave: "hoy", label: "Para hoy" },
  { clave: "sin_responsable", label: "Sin responsable" },
  { clave: "sin_accion", label: "Sin próxima acción" },
  { clave: "seguimiento", label: "Revisiones en 7 días" },
  { clave: "origen_pendiente", label: "Origen pendiente" },
  { clave: "pruebas", label: "Pruebas" },
];

/** Lo que no se ha capturado se muestra así, nunca como 0 ni vacío. */
export const SIN_REGISTRAR = "Sin registrar";

export const PRIORIDAD: Record<CasePriority, string> = {
  low: "Baja",
  normal: "Normal",
  high: "Alta",
  urgent: "Urgente",
};

export const RESPUESTA_SI_NO: Record<string, string> = {
  yes: "Sí",
  no: "No",
  unsure: "No está seguro",
};

export const ESTUDIOS_PACIENTE: Record<string, string> = {
  upload_now: "Los subió en el formulario",
  send_later: "Los enviará después",
  none: "No tiene estudios",
};

export const INTENCION_PACIENTE: Record<string, string> = {
  options: "Saber sus opciones",
  cost: "Saber cuánto cuesta",
  assessment: "Agendar una valoración",
  second_opinion: "Una segunda opinión",
  schedule: "Ya quiere programar",
  unsure: "Necesita orientación",
};
