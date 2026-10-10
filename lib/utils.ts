import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Los textos de Strapi llegan con espacios sobrantes y a veces vacíos; en
 *  ambos casos deben caer al default de quien los usa. */
export const clean = (value?: string | null) => value?.trim() || undefined;
