import type { StrapiErrorsProps  } from "@/app/data/actions/strapi-errors";

export interface FormDataType {
    username: string;
    password: string;
    email: string;
    // Agregar más campos si es necesario
  }

export interface AuthState {
    formData: FormDataType; // Aquí deberías especificar el tipo de formData si lo sabes
    zodErrors: Record<string, string[]> | null;
    strapiErrors: StrapiErrorsProps   | null;
    message: string | null;
  }
  