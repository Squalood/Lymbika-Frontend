"use client";

import { Button } from "@/components/ui/button";
import { getHiddenCounts, RevealBreakpoint } from "@/lib/grid-reveal";

type Props = {
  breakpoints: RevealBreakpoint[];
  total: number;
  expanded: boolean;
  onToggle: () => void;
};

/** Boton de expandir un grid. Pinta un contador por breakpoint porque la
 *  cantidad de tarjetas ocultas la decide CSS, no JS. */
export function ShowMoreButton({ breakpoints, total, expanded, onToggle }: Props) {
  return (
    <Button variant="default" size="sm" onClick={onToggle}>
      {expanded ? (
        "Mostrar menos"
      ) : (
        <>
          <span>Mostrar más</span>
          {getHiddenCounts(breakpoints, total).map(({ ocultas, labelClass }) => (
            <span key={labelClass} className={labelClass}>
              ({ocultas} más)
            </span>
          ))}
        </>
      )}
    </Button>
  );
}
