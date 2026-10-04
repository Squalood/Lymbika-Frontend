"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BTN_PRIMARY, HEADING, LEDE, rise } from "./ui";

type Props = {
  onStart: () => void;
};

/** Portada: quién es Lymbika y la entrada principal al intake. */
export function CareHero({ onStart }: Props) {
  return (
    <motion.section
      {...rise(0.05)}
      className="overflow-hidden rounded-[26px] border border-[#E5E9F4] bg-white shadow-[0_18px_40px_-24px_rgba(12,24,72,0.35)]"
    >
      <div className="relative aspect-[16/10] bg-[#F2F5FD]">
        <Image
          src="/images/vive-lymbika/medico-lymbika.jpg"
          alt="Médico del equipo de Lymbika en su consultorio"
          fill
          priority
          sizes="(min-width: 640px) 600px, 100vw"
          className="object-cover object-[52%_40%]"
        />
      </div>

      <div className="px-5 pb-6 pt-5 md:px-7 md:pb-8">
        <p className="mb-4 border-b-2 border-[#F2A65A] pb-4 text-[15px] leading-[1.55] text-[#4A5170]">
          Lymbika es un equipo que te ayuda a entender qué sigue y coordinar lo que
          necesitas cuando tienes un problema de salud.
        </p>
        <h1 className={HEADING}>¿Qué necesitas resolver hoy?</h1>
        <p className={`${LEDE} mt-3`}>
          Cuéntanos qué está pasando y te ayudamos a encontrar el siguiente paso.
        </p>
        <button type="button" onClick={onStart} className={`${BTN_PRIMARY} mt-6`}>
          Cuéntame qué está pasando
        </button>
      </div>
    </motion.section>
  );
}
