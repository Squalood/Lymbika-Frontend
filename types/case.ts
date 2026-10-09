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

export type CasePriority = "low" | "normal" | "high" | "urgent";

/** Archivo de la biblioteca de Strapi tal como llega con populate. */
export type CaseFileType = {
  id: number;
  name: string;
  mime: string;
  url: string;
  size: number;
  createdAt: string;
};

/**
 * Caso completo para /dashboard/operations. Viene del core REST de
 * Strapi, así que trae todo menos `accessToken`, que es privado.
 */
export type AdminCaseType = {
  id: number;
  documentId: string;
  caseNumber: string;
  patientLink: string | null;
  estado: CaseEstado;
  priority: CasePriority | null;
  patientNextStep: string | null;
  internalNotes: string | null;
  narrative: string;
  reviewedByDoctor: YesNoUnsure | null;
  surgeryIndicated: YesNoUnsure | null;
  documentsStatus: DocumentsStatus | null;
  intent: CaseIntent | null;
  emergencyFlag: boolean | null;
  fullName: string;
  phone: string;
  city: string | null;
  consent: boolean | null;
  consentAt: string | null;
  source: string | null;
  landingPath: string | null;
  quoteAmount: number | string | null;
  quoteValidUntil: string | null;
  quotePresented: boolean | null;
  surgeryDate: string | null;
  surgeryDateConfirmed: boolean | null;
  followUpTasks?: { id?: number; title: string; done: boolean }[];
  documents?: CaseFileType[] | null;
  medical_service?: { id: number; documentId: string; name: string } | null;
  selected_doctor?: { id: number; documentId: string; doctorName: string } | null;
  hospital?: { id: number; documentId: string; hospitalName: string } | null;
  createdAt: string;
  updatedAt: string;
};

/** Opción de un selector (doctor, hospital, procedimiento). */
export type OpcionCatalogo = { documentId: string; label: string };
