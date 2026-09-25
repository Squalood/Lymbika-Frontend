import { CaseEstado } from "@/types/case";

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
