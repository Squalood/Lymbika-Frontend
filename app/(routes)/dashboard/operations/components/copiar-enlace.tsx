"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CopiarEnlace({ enlace, className }: { enlace: string; className?: string }) {
  const [copiado, setCopiado] = useState(false);

  async function copiar() {
    try {
      await navigator.clipboard.writeText(enlace);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      window.prompt("Copia el enlace:", enlace);
    }
  }

  return (
    <Button type="button" variant="outline" size="sm" onClick={copiar} className={className}>
      {copiado ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      {copiado ? (
        "Copiado"
      ) : (
        // Un solo span: el botón separa cada hijo con gap y partiría la frase.
        <span>
          Copiar enlace<span className="hidden sm:inline"> de Mi caso</span>
        </span>
      )}
    </Button>
  );
}
