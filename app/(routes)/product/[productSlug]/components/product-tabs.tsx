"use client";

import { useState, type ReactNode } from "react";
import SegmentedToggle from "@/components/segmented-toggle";

type Pestana = "media" | "ficha";

/**
 * Pestañas "Media / Ficha médica" bajo la foto y el precio. Si solo hay una de
 * las dos, se muestra sola, sin selector.
 *
 * La ficha se renderiza siempre y solo se oculta con CSS: así su texto está en
 * el HTML para buscadores aunque la pestaña activa sea Media. Los videos, en
 * cambio, solo se montan al elegir su pestaña (cada embed carga un iframe).
 */
export default function ProductTabs({ media, ficha }: { media: ReactNode | null; ficha: ReactNode | null }) {
  const [pestana, setPestana] = useState<Pestana>(media ? "media" : "ficha");

  if (!media && !ficha) return null;
  if (!media || !ficha) return <>{media ?? ficha}</>;

  return (
    <div className="mt-10">
      <SegmentedToggle
        options={[
          { value: "media", label: "Media" },
          { value: "ficha", label: "Ficha médica" },
        ]}
        value={pestana}
        onChange={setPestana}
      />
      {pestana === "media" && media}
      <div className={pestana === "ficha" ? undefined : "hidden"}>{ficha}</div>
    </div>
  );
}
