"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { CATEGORIES, QUICK_CATEGORIES, type CategoryKey } from "./categories";
import { BTN_LINK, SUBHEADING, rise } from "./ui";

type Props = {
  onPick: (categoria: CategoryKey) => void;
};

/** Accesos directos al intake con la necesidad ya elegida. */
export function QuickStart({ onPick }: Props) {
  return (
    <motion.section {...rise(0.25)}>
      <h2 className={`${SUBHEADING} mb-3`}>O empieza por aquí</h2>
      <div className="grid grid-cols-2 gap-2.5">
        {QUICK_CATEGORIES.map((key) => (
          <motion.button
            key={key}
            type="button"
            onClick={() => onPick(key)}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "rounded-2xl border px-3 py-4 text-center text-[15px] font-medium text-[#0C1848] transition-colors duration-300 hover:border-[#1A3CBF]/40",
              key === "familiar"
                ? "col-span-2 border-[#F5D3AE] bg-[#FFF4E8] text-[#8A4A10] hover:border-[#D9822B]/50"
                : "border-[#E5E9F4] bg-white"
            )}
          >
            {CATEGORIES[key].label}
          </motion.button>
        ))}
      </div>

      <div className="mt-4 rounded-[22px] border-[1.5px] border-dashed border-[#D7DEEF] bg-gradient-to-br from-[#E9EEFC] to-[#F6F8FE] p-5 text-center">
        <b className="block font-semibold text-[#0C1848]">No sé qué necesito</b>
        <p className="mt-1 text-[15px] text-[#4A5170]">
          No pasa nada. Podemos empezar por ahí.
        </p>
        <button type="button" onClick={() => onPick("nose")} className={`${BTN_LINK} mt-2`}>
          Empezar así
        </button>
      </div>
    </motion.section>
  );
}
