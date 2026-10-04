"use client";

import { useEffect, useRef, useState } from "react";
import { MotionConfig } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import type { CategoryKey } from "./categories";
import { CareHero } from "./care-hero";
import { ContactCard } from "./contact-card";
import { EmergencyCard } from "./emergency-card";
import { HowItWorks } from "./how-it-works";
import { NeedForm } from "./need-form";
import { QuickStart } from "./quick-start";

const STAGE_BACKGROUND =
  "radial-gradient(115% 60% at 50% -10%, #EDF2FE 0%, transparent 56%), radial-gradient(120% 70% at 88% 110%, #EFF3FE 0%, transparent 55%), #FFFFFF";

type View = "inicio" | "formulario";

const ViveLymbikaExperience = () => {
  const [view, setView] = useState<View>("inicio");
  const [categoria, setCategoria] = useState<CategoryKey | null>(null);

  const stageRef = useRef<HTMLDivElement>(null);
  const isFirstViewRef = useRef(true);

  // Al cambiar de vista, volvemos al inicio de la experiencia (no de la página).
  useEffect(() => {
    if (isFirstViewRef.current) {
      isFirstViewRef.current = false;
      return;
    }
    stageRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [view]);

  const openForm = (key: CategoryKey | null) => {
    setCategoria(key);
    setView("formulario");
  };

  return (
    <MotionConfig reducedMotion="user">
      <div style={{ background: STAGE_BACKGROUND }}>
        <div
          ref={stageRef}
          className="mx-auto w-full max-w-[600px] scroll-mt-4 px-4 pb-16 pt-4 md:pt-8"
        >
          {view === "inicio" && (
            <div className="flex flex-col gap-8">
              <CareHero onStart={() => openForm(null)} />
              <HowItWorks />
              <QuickStart onPick={openForm} />
              <EmergencyCard />
              <ContactCard />
            </div>
          )}

          {view === "formulario" && (
            <>
              <button
                type="button"
                onClick={() => setView("inicio")}
                className="-ml-1.5 mb-3 flex items-center gap-1.5 px-1.5 py-2 text-sm tracking-[0.02em] text-[#8A90AE] transition-colors duration-300 hover:text-[#4A5170] active:opacity-60"
              >
                <ChevronLeft className="h-4 w-4" strokeWidth={2} />
                Atrás
              </button>
              <NeedForm
                key={categoria ?? "libre"}
                categoria={categoria}
                onClearCategoria={() => setCategoria(null)}
              />
            </>
          )}
        </div>
      </div>
    </MotionConfig>
  );
};

export default ViveLymbikaExperience;
