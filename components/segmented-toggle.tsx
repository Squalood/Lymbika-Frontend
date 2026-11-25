"use client";

import { useId } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

export type SegmentedOption<T extends string> = { value: T; label: string };

interface SegmentedToggleProps<T extends string> {
  options: SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}

/**
 * Selector de pastilla con la opción activa resaltada (diseño de "Plan por
 * Persona / Plan por Familia" en /membership). Lo usan el plan de membresía y
 * las pestañas de la página de producto; un solo diseño para los dos.
 */
export default function SegmentedToggle<T extends string>({ options, value, onChange, className }: SegmentedToggleProps<T>) {
  // layoutId propio por instancia: con uno fijo, dos selectores en la misma
  // página animarían el resaltado de uno hacia el otro.
  const highlightId = useId();

  return (
    <div role="tablist" className={clsx("relative flex bg-muted rounded-full w-fit gap-1 mx-auto my-8", className)}>
      {options.map((o) => {
        const activa = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            role="tab"
            aria-selected={activa}
            onClick={() => onChange(o.value)}
            className={clsx(
              "relative z-10 px-4 py-4 text-sm font-medium rounded-full transition",
              activa ? "text-black" : "text-muted-foreground"
            )}
          >
            {activa && (
              <motion.div
                layoutId={highlightId}
                className="absolute inset-0 bg-white rounded-full shadow m-1"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
            <span className="relative z-10">{o.label}</span>
          </button>
        );
      })}
    </div>
  );
}
