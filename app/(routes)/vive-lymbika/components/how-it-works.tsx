"use client";

import { motion } from "framer-motion";
import { SUBHEADING, rise } from "./ui";

const STEPS = [
  {
    title: "Nos cuentas qué pasa.",
    description: "Con tus palabras, o mandando estudios, receta o cotización.",
  },
  {
    title: "Revisamos tu caso y te explicamos qué sigue.",
    description:
      "Te ayudamos a entender qué tipo de atención puede tener sentido, si necesitas estudios o una segunda opinión, y por qué.",
  },
  {
    title: "Si decides avanzar, coordinamos lo difícil.",
    description:
      "Citas, estudios, especialista, hospital y seguimiento, con costos claros antes de decidir.",
  },
];

export function HowItWorks() {
  return (
    <motion.section {...rise(0.15)}>
      <h2 className={`${SUBHEADING} mb-3`}>Así funciona</h2>
      <ol className="grid gap-2.5">
        {STEPS.map((step, i) => (
          <li
            key={step.title}
            className="flex gap-3.5 rounded-2xl bg-[#F2F5FD] p-4"
          >
            <span className="grid h-7 w-7 flex-none place-items-center rounded-full bg-gradient-to-br from-[#1A3CBF] to-[#2A4FE0] text-sm font-semibold text-white">
              {i + 1}
            </span>
            <p className="text-[15px] leading-[1.55] text-[#4A5170]">
              <b className="block font-semibold text-[#0C1848]">{step.title}</b>
              {step.description}
            </p>
          </li>
        ))}
      </ol>
      <p className="mt-2.5 text-sm text-[#8A90AE]">Tú decides en cada paso.</p>
    </motion.section>
  );
}
