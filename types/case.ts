/**
 * Tipos del flujo "Coordinar mi caso".
 *
 * `PatientCaseType` es exactamente lo que devuelve GET /api/cases/by-token/:token:
 * un DTO armado en el backend (backend-ecommerce/src/api/case/controllers/case.ts)
 * sin prioridad, notas internas ni datos de contacto.
 */

export type CaseEstado =
  | "new"
  | "in_coordination"
  | "in_assessment"
  | "in_decision"
  | "scheduled"
  | "in_surgery"
  | "in_follow_up"
  | "closed_won"
  | "closed_lost";

export type YesNoUnsure = "yes" | "no" | "unsure";

export type DocumentsStatus = "upload_now" | "send_later" | "none";

export type CaseIntent =
  | "options"
  | "cost"
  | "assessment"
  | "second_opinion"
  | "schedule"
  | "unsure";

export type PatientCaseType = {
  caseNumber: string;
  estado: CaseEstado;
  patientNextStep: string | null;
  createdAt: string;
  medicalService: { name: string; slug: string } | null;
  doctor: { doctorName: string; slug: string; image: string | null } | null;
  hospital: { hospitalName: string; slug: string | null } | null;
  documents: { name: string; mime: string; createdAt: string }[];
  quote: { amount: number | null; validUntil: string | null } | null;
  surgery: { date: string; confirmed: boolean } | null;
  followUpTasks: { title: string; done: boolean }[];
};

export type CaseIntakePayload = {
  narrative: string;
  reviewedByDoctor: YesNoUnsure;
  surgeryIndicated: YesNoUnsure;
  documentsStatus: DocumentsStatus;
  intent: CaseIntent;
  fullName: string;
  phone: string;
  city: string;
  consent: boolean;
  medicalServiceSlug?: string;
  landingPath?: string;
  utm?: Record<string, string>;
  website?: string;
};
