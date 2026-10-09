"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { mutateData } from "@/app/data/services/mutate-data";

/**
 * Escrituras de /dashboard/operations. Van con el JWT del usuario vía `mutateData`;
 * Strapi rechaza con 403 a cualquier rol sin permiso sobre `case`.
 *
 * Solo se mandan los campos que coordinación edita: el relato y las respuestas
 * del paciente nunca se reescriben desde aquí.
 */

const relacion = z.string().max(40).nullable();
const fechaOpcional = z.string().max(40).nullable();

const schemaCaso = z.object({
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
        estado: d.estado,
        priority: d.priority,
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
  narrative: z.string().trim().min(3).max(2000),
  medicalService: relacion,
});

export type CasoNuevo = z.infer<typeof schemaNuevo>;

/**
 * Alta manual (paciente que llegó por WhatsApp o teléfono). Número, token y
 * enlace de Mi caso los genera el lifecycle `beforeCreate` del backend.
 */
export async function crearCasoManual(
  datos: CasoNuevo
): Promise<{ ok: true; documentId: string } | { ok: false; error: string }> {
  const validado = schemaNuevo.safeParse(datos);
  if (!validado.success) {
    return { ok: false, error: "Escribe nombre, un teléfono de 10 dígitos y el motivo." };
  }
  const d = validado.data;

  try {
    const respuesta = await mutateData("POST", "/api/cases", {
      data: {
        fullName: d.fullName,
        phone: d.phone,
        city: d.city || null,
        narrative: d.narrative,
        estado: "new",
        source: "coordinacion",
        ...(d.medicalService && { medical_service: set(d.medicalService) }),
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
