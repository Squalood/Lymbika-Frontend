"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { mutateData } from "@/app/data/services/mutate-data";
import {
  casosConTelefono,
  type CasoConTelefono,
} from "@/app/data/services/case-admin-service";

/**
 * Escrituras de /dashboard/operations. Van con el JWT del usuario vía `mutateData`;
 * Strapi rechaza con 403 a cualquier rol sin permiso sobre `case`.
 *
 * Solo se mandan los campos que coordinación edita: el relato y las respuestas
 * del paciente nunca se reescriben desde aquí.
 */

const relacion = z.string().max(40).nullable();
const fechaOpcional = z.string().max(40).nullable();
const dia = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/)
  .nullable();

const procedencia = {
  originType: z
    .enum(["campaign", "node", "company", "community", "doctor", "referral", "other", "pending"])
    .nullable(),
  originDetail: z.string().trim().max(120),
  channel: z.enum(["whatsapp", "web", "phone", "in_person"]).nullable(),
  referredBy: z.enum(["lymbika", "doctor"]).nullable(),
};

const schemaCaso = z.object({
  patientNextStep: z.string().max(1000),
  internalNotes: z.string().max(10000),
  fullName: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(7).max(30),
  city: z.string().max(120),
  emergencyFlag: z.boolean(),
  medicalService: relacion,
  doctor: relacion,
  hospital: relacion,
  quoteAmount: z.number().nonnegative().nullable(),
  quoteValidUntil: fechaOpcional,
  quotePresented: z.boolean(),
  surgeryDate: fechaOpcional,
  surgeryDateConfirmed: z.boolean(),
  followUpTasks: z
    .array(z.object({ title: z.string().trim().min(1).max(200), done: z.boolean() }))
    .max(50),
  ...procedencia,
  isTest: z.boolean(),
});

export type CasoEditable = z.infer<typeof schemaCaso>;

export type ResultadoAccion = { ok: true } | { ok: false; error: string };

/** xToOne en Strapi v5: `set` con un documentId conecta, vacío desconecta. */
function set(documentId: string | null) {
  return { set: documentId ? [documentId] : [] };
}

function mensajeDeError(respuesta: { error?: { status?: number; message?: string } }) {
  if (respuesta.error?.status === 403) return "Tu usuario no tiene permiso para editar casos.";
  if (respuesta.error?.status === 401) return "Tu sesión venció. Vuelve a iniciar sesión.";
  return respuesta.error?.message ?? "No se pudo guardar. Intenta de nuevo.";
}

export async function guardarCaso(
  documentId: string,
  datos: CasoEditable
): Promise<ResultadoAccion> {
  const validado = schemaCaso.safeParse(datos);
  if (!validado.success) {
    return { ok: false, error: "Revisa los campos: hay datos incompletos o inválidos." };
  }
  const d = validado.data;

  try {
    const respuesta = await mutateData("PUT", `/api/cases/${documentId}`, {
      data: {
        patientNextStep: d.patientNextStep.trim() || null,
        internalNotes: d.internalNotes.trim() || null,
        fullName: d.fullName,
        phone: d.phone,
        city: d.city.trim() || null,
        emergencyFlag: d.emergencyFlag,
        medical_service: set(d.medicalService),
        selected_doctor: set(d.doctor),
        hospital: set(d.hospital),
        quoteAmount: d.quoteAmount,
        quoteValidUntil: d.quoteValidUntil || null,
        quotePresented: d.quotePresented,
        surgeryDate: d.surgeryDate || null,
        surgeryDateConfirmed: d.surgeryDateConfirmed,
        followUpTasks: d.followUpTasks,
        ...datosDeProcedencia(d),
        isTest: d.isTest,
      },
    });
    if (respuesta?.error) return { ok: false, error: mensajeDeError(respuesta) };
  } catch {
    return { ok: false, error: "No se pudo conectar con el servidor." };
  }

  revalidatePath("/dashboard/operations");
  return { ok: true };
}

/** La fuente específica solo se guarda si el origen la pide. */
function datosDeProcedencia(d: {
  originType: string | null;
  originDetail: string;
  channel: string | null;
  referredBy: string | null;
}) {
  const conDetalle = d.originType && d.originType !== "pending";
  return {
    originType: d.originType,
    originDetail: (conDetalle && d.originDetail) || null,
    channel: d.channel,
    referredBy: d.referredBy,
  };
}

const schemaPanel = z
  .object({
    estado: z.enum([
      "new",
      "in_coordination",
      "in_assessment",
      "in_decision",
      "scheduled",
      "in_surgery",
      "in_follow_up",
      "closed_won",
      "closed_lost",
    ]),
    priority: z.enum(["low", "normal", "high", "urgent"]),
    closeReason: z
      .enum(["no_contact", "not_candidate", "price", "chose_other", "not_interested", "postponed", "other"])
      .nullable(),
    nextAction: z.string().trim().max(500),
    nextActionOwner: relacion,
    nextActionDue: dia,
    blocker: z.string().trim().max(500),
    coordinator: relacion,
    nextReviewDate: dia,
  })
  .refine((d) => d.estado !== "closed_lost" || d.closeReason, {
    message: "Para cerrar sin cirugía, elige el motivo.",
  });

export type PanelCaso = z.infer<typeof schemaPanel>;

/**
 * Cabecera del expediente: etapa, próxima acción, responsable, fecha,
 * obstáculo y coordinador. Solo manda estos campos; el resto del caso no se
 * toca. Coordinador y responsable van como documentId del usuario: el
 * controller de case los valida contra el equipo (al especialista le ignora
 * el coordinador).
 */
export async function guardarPanel(documentId: string, datos: PanelCaso): Promise<ResultadoAccion> {
  const validado = schemaPanel.safeParse(datos);
  if (!validado.success) {
    return {
      ok: false,
      error: validado.error.issues[0]?.message ?? "Revisa los campos del panel.",
    };
  }
  const d = validado.data;

  try {
    const respuesta = await mutateData("PUT", `/api/cases/${documentId}`, {
      data: {
        estado: d.estado,
        priority: d.priority,
        closeReason: d.estado === "closed_lost" ? d.closeReason : null,
        nextAction: d.nextAction || null,
        nextActionOwner: d.nextActionOwner,
        nextActionDue: d.nextActionDue,
        blocker: d.blocker || null,
        coordinator: d.coordinator,
        nextReviewDate: d.nextReviewDate,
      },
    });
    if (respuesta?.error) return { ok: false, error: mensajeDeError(respuesta) };
  } catch {
    return { ok: false, error: "No se pudo conectar con el servidor." };
  }

  revalidatePath("/dashboard/operations");
  return { ok: true };
}

const schemaNuevo = z.object({
  fullName: z.string().trim().min(2).max(120),
  phone: z
    .string()
    .trim()
    .max(30)
    .refine((v) => v.replace(/\D/g, "").length >= 10),
  city: z.string().trim().max(120),
  narrative: z.string().trim().max(2000),
  medicalService: relacion,
  coordinator: relacion,
  ...procedencia,
});

export type CasoNuevo = z.infer<typeof schemaNuevo>;

/**
 * Alta manual (paciente que llegó por WhatsApp o teléfono). Solo exige nombre
 * y teléfono; lo demás se completa cuando se necesite. Número, token y enlace
 * de Mi caso los genera el lifecycle `beforeCreate` del backend; sin
 * coordinador elegido, el backend asigna a quien lo crea.
 */
export async function crearCasoManual(
  datos: CasoNuevo
): Promise<{ ok: true; documentId: string } | { ok: false; error: string }> {
  const validado = schemaNuevo.safeParse(datos);
  if (!validado.success) {
    return { ok: false, error: "Escribe el nombre y un teléfono de 10 dígitos." };
  }
  const d = validado.data;

  try {
    const respuesta = await mutateData("POST", "/api/cases", {
      data: {
        fullName: d.fullName,
        phone: d.phone,
        city: d.city || null,
        narrative: d.narrative || null,
        estado: "new",
        source: "coordinacion",
        ...(d.medicalService && { medical_service: set(d.medicalService) }),
        ...(d.coordinator && { coordinator: d.coordinator }),
        ...datosDeProcedencia({ ...d, originType: d.originType ?? "pending" }),
      },
    });
    if (respuesta?.error) return { ok: false, error: mensajeDeError(respuesta) };
    const documentId = respuesta?.data?.documentId;
    if (!documentId) return { ok: false, error: "Strapi no devolvió el caso creado." };
    revalidatePath("/dashboard/operations");
    return { ok: true, documentId };
  } catch {
    return { ok: false, error: "No se pudo conectar con el servidor." };
  }
}

/** Para el aviso de "ya existe un caso con este teléfono" del alta manual. */
export async function buscarCasosPorTelefono(telefono: string): Promise<CasoConTelefono[]> {
  if (typeof telefono !== "string" || telefono.length > 30) return [];
  return casosConTelefono(telefono);
}
