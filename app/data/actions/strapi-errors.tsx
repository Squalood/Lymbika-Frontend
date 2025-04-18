export interface StrapiErrorsProps {
  message: string;
  name?: string;  // ⬅️ Opcional
  status?: number; // ⬅️ Opcional
}

export function StrapiErrors({ error }: { readonly error?: StrapiErrorsProps | null }) {
  if (!error?.message) return null;
  return <div className="text-pink-500 text-md italic py-2">{error.message}</div>;
}

