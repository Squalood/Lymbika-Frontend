import Link from "next/link";
import { MedicalServiceType } from "@/types/medicalService";
import { Button } from "@/components/ui/button";

export default function Cta({ service }: { service: MedicalServiceType }) {
  const t = service.landingTexts;

  return (
    <section id="contacto" className="py-10 px-4 md:px-8 max-w-6xl mx-auto">
      <div className="bg-primary rounded-2xl px-8 py-12 flex flex-col items-center text-center space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          {t?.cta_title ?? "¿Listo para dar el siguiente paso?"}
        </h2>
        <p className="text-white/80 text-sm md:text-base max-w-xl">
          {t?.cta_subtitle ?? "Agenda tu valoración sin compromiso. Un especialista te guiará en cada etapa del proceso."}
        </p>
        <Button
          asChild
          size="lg"
          className="bg-white text-primary hover:bg-white/90 font-semibold"
        >
          <Link href={`/case/start?servicio=${encodeURIComponent(service.slug)}`}>
            {t?.cta_button ?? "Quiero que coordinen mi caso"}
          </Link>
        </Button>
      </div>
    </section>
  );
}
