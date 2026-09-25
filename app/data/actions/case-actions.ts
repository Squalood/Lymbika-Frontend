"use server";

import { z } from "zod";
import { cookies, headers } from "next/headers";
import { CaseIntakePayload } from "@/types/case";

/**
 * Crea el caso del guided intake.
 *
 * Va por Server Action (y no directo desde el cliente) para poder adjuntar el
 * JWT de la cookie httpOnly: si el paciente tiene sesión, el backend liga el
 * caso a su cuenta. Sin sesión el caso se crea igual.
 *
 * Los archivos NO pasan por aquí: en Amplify las Server Actions corren en
 * Lambda con un tope de ~6 MB por request. El cliente los sube directo a
 * /api/cases/by-token/:token/documents con el token que regresa esta acción.
 */

const schemaIntake = z.object({
  narrative: z.string().trim().min(3).max(2000),
  reviewedByDoctor: z.enum(["yes", "no", "unsure"]),
  surgeryIndicated: z.enum(["yes", "no", "unsure"]),
  documentsStatus: z.enum(["upload_now", "send_later", "none"]),
  intent: z.enum(["options", "cost", "assessment", "second_opinion", "schedule", "unsure"]),
  fullName: z.string().trim().min(2).max(120),
  phone: z
    .string()
    .trim()
    .max(30)
    .refine((v) => v.replace(/\D/g, "").length >= 10),
  city: z.string().trim().max(120),
  consent: z.literal(true),
  medicalServiceSlug: z.string().max(120).optional(),
  landingPath: z.string().max(300).optional(),
  utm: z.record(z.string()).optional(),
  website: z.string().optional(),
});

export type CrearCasoResult =
  | { ok: true; caseNumber: string; token: string }
  | { ok: false; error: string };

export async function crearCaso(payload: CaseIntakePayload): Promise<CrearCasoResult> {
  const validado = schemaIntake.safeParse(payload);
  if (!validado.success) {
    return { ok: false, error: "Revisa que todos los pasos estén completos." };
  }

  const token = (await cookies()).get("jwt")?.value;
  // El backend limita intakes por IP; sin esto vería la IP del servidor de Next.
  const ipCliente = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cases/intake`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...(ipCliente && { "X-Forwarded-For": ipCliente }),
      },
      body: JSON.stringify(validado.data),
      cache: "no-store",
    });

    const json = await res.json().catch(() => null);

    if (!res.ok || !json?.caseNumber || !json?.token) {
      return {
        ok: false,
        error: json?.error?.message ?? "No pudimos registrar tu caso. Intenta de nuevo.",
      };
    }

    return { ok: true, caseNumber: json.caseNumber, token: json.token };
  } catch (error) {
    console.error("[crearCaso]", error);
    return { ok: false, error: "No pudimos conectar con el servidor. Intenta de nuevo." };
  }
}
