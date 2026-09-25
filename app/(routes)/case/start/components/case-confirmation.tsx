import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WHATSAPP_NUMBER } from "@/lib/constants";

type Props = {
  caseNumber: string;
  token: string;
  uploadFailed: boolean;
};

export function CaseConfirmation({ caseNumber, token, uploadFailed }: Props) {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hola, mi número de caso es ${caseNumber}.`
  )}`;

  return (
    <div className="mx-auto max-w-md space-y-6 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Check className="h-6 w-6" />
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Ya recibimos tu caso.</h1>
        <p className="text-muted-foreground">
          Nuestro equipo revisará la información y te ayudará a organizar el siguiente paso.
        </p>
      </div>

      <div className="rounded-2xl border bg-card p-5 text-left space-y-4">
        <div>
          <p className="text-xs font-semibold text-muted-foreground">Número de caso</p>
          <p className="mt-1 text-lg font-bold tracking-wide">{caseNumber}</p>
        </div>
        <div className="border-t pt-4">
          <p className="text-xs font-semibold text-muted-foreground">Siguiente paso</p>
          <p className="mt-1">Un coordinador de Lymbika te contactará muy pronto.</p>
        </div>
        {uploadFailed && (
          <p className="rounded-lg bg-amber-50 p-3 text-sm text-amber-800">
            No pudimos subir tus archivos, pero tu caso sí quedó registrado. Puedes
            enviarlos por WhatsApp con tu número de caso.
          </p>
        )}
      </div>

      <div className="space-y-3">
        <Button asChild size="lg" className="w-full font-semibold">
          <Link href={`/case/${token}`}>Ver mi caso</Link>
        </Button>
        <Button asChild size="lg" variant="outline" className="w-full font-semibold">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            Hablar con Lymbika por WhatsApp
          </a>
        </Button>
      </div>

      <p className="text-xs text-muted-foreground">
        Guarda el enlace de &ldquo;Ver mi caso&rdquo;: es tu acceso para consultar el avance.
      </p>
    </div>
  );
}
