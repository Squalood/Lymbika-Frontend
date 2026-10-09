"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FileText, Loader2, Upload } from "lucide-react";
import { toast } from "sonner";
import { CaseFileType } from "@/types/case";

const MAX_ARCHIVOS = 5;
const MAX_BYTES = 10 * 1024 * 1024;

type Props = {
  documentos: CaseFileType[];
  /** Token del caso, sacado del enlace de Mi caso. Sin él no se puede subir. */
  token: string | null;
};

/**
 * Los archivos se suben directo del navegador a Strapi, por el mismo endpoint
 * que usa el paciente (autorizado con el token del caso). Pasar por el
 * servidor de Next los limitaría a ~6 MB en Amplify.
 */
export function DocumentosCaso({ documentos, token }: Props) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [subiendo, setSubiendo] = useState(false);

  async function subir(lista: FileList | null) {
    if (!lista || !token) return;
    const archivos = Array.from(lista);
    if (archivos.length > MAX_ARCHIVOS) {
      toast.error(`Máximo ${MAX_ARCHIVOS} archivos a la vez.`);
      return;
    }
    if (archivos.some((f) => !(f.type.startsWith("image/") || f.type === "application/pdf"))) {
      toast.error("Solo se aceptan imágenes o PDF.");
      return;
    }
    if (archivos.some((f) => f.size > MAX_BYTES)) {
      toast.error("Cada archivo debe pesar máximo 10 MB.");
      return;
    }

    setSubiendo(true);
    const formData = new FormData();
    archivos.forEach((f) => formData.append("files", f));
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cases/by-token/${token}/documents`,
        { method: "POST", body: formData }
      );
      const json = await res.json().catch(() => null);
      if (!res.ok) {
        toast.error(json?.error?.message ?? "No se pudieron subir los archivos.");
      } else {
        toast.success("Archivos agregados al caso.");
        router.refresh();
      }
    } catch {
      toast.error("No se pudo conectar con el servidor.");
    } finally {
      setSubiendo(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="space-y-3">
      {documentos.length === 0 ? (
        <p className="text-sm text-muted-foreground">Todavía no hay documentos.</p>
      ) : (
        <ul className="space-y-2">
          {documentos.map((doc) => (
            <li key={doc.id}>
              <a
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-muted/50"
              >
                <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
                <span className="truncate">{doc.name}</span>
                <span className="ml-auto shrink-0 text-xs text-muted-foreground">
                  {doc.mime === "application/pdf" ? "PDF" : "Imagen"}
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}

      {token ? (
        <>
          <input
            ref={inputRef}
            type="file"
            multiple
            accept="image/*,application/pdf"
            className="sr-only"
            id="subir-documentos"
            onChange={(e) => subir(e.target.files)}
            disabled={subiendo}
          />
          <label
            htmlFor="subir-documentos"
            className="inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            {subiendo ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
            {subiendo ? "Subiendo…" : "Subir documentos (imágenes o PDF)"}
          </label>
        </>
      ) : (
        <p className="text-xs text-muted-foreground">
          Este caso no tiene enlace de Mi caso, así que no se pueden subir archivos desde aquí.
        </p>
      )}
    </div>
  );
}
