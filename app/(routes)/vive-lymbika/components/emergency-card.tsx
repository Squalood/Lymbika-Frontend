import { Phone } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/lib/constants";

const AMBULANCE_WHATSAPP = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hola. Necesito ayuda para coordinar una ambulancia."
)}`;

/** Siempre a un toque y sin crear caso antes. Lymbika no atiende emergencias. */
export function EmergencyCard() {
  return (
    <section className="rounded-[22px] bg-[#FDECEC] p-5">
      <h2 className="text-lg font-semibold text-[#9B1C1C]">¿Necesitas ayuda urgente?</h2>
      <p className="mt-2 text-[15px] leading-[1.55] text-[#4A5170]">
        Si hay dificultad para respirar, dolor intenso en el pecho, pérdida del
        conocimiento, sangrado abundante u otra emergencia, llama al 911.
      </p>
      <a
        href="tel:911"
        className="mt-4 flex w-full items-center justify-center gap-2.5 rounded-2xl bg-[#B91C1C] px-[22px] py-[17px] text-lg font-semibold text-white transition-transform duration-300 active:scale-[0.975]"
      >
        <Phone className="h-5 w-5" />
        Llamar al 911
      </a>
      <a
        href={AMBULANCE_WHATSAPP}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2.5 flex w-full items-center justify-center rounded-2xl border border-[#F3C4C4] bg-white px-[22px] py-[15px] text-center text-[15px] font-medium text-[#0C1848] transition-transform duration-300 active:scale-[0.975]"
      >
        Hablar con Lymbika para coordinar ambulancia
      </a>
    </section>
  );
}
