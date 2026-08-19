"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MotionConfig, motion } from "framer-motion";
import { ArrowRight, Check, ChevronLeft } from "lucide-react";
import WhatsAppQrDialog from "@/components/whatsapp-qr-dialog";
import { useIsDesktop } from "@/hooks/use-is-desktop";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { PATHS, PATH_ORDER, type PathKey } from "./paths";

const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hola, acabo de probar Vive Lymbika y me gustaría saber más."
)}`;

const EASE: [number, number, number, number] = [0.22, 0.61, 0.36, 1];

const STAGE_BACKGROUND =
  "radial-gradient(115% 80% at 50% -18%, #EDF2FE 0%, transparent 56%), radial-gradient(120% 90% at 88% 116%, #EFF3FE 0%, transparent 55%), #FFFFFF";

type Screen = "intro" | "need" | "journey" | "close";

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: EASE },
});

const BTN_BASE =
  "flex w-full items-center justify-center gap-2.5 rounded-2xl px-[22px] py-[17px] text-base font-medium tracking-[0.01em] transition-transform duration-300 active:scale-[0.975]";
const BTN_PRIMARY = `${BTN_BASE} bg-gradient-to-br from-[#1A3CBF] to-[#2A4FE0] text-white shadow-[0_14px_30px_-12px_rgba(26,60,191,0.5)]`;
const BTN_WHATS = `${BTN_BASE} bg-[#25D366] font-semibold text-[#053B1B] shadow-[0_14px_32px_-12px_rgba(37,211,102,0.55)]`;
const BTN_GHOST =
  "flex w-full items-center justify-center rounded-2xl p-3 text-sm font-normal tracking-[0.03em] text-[#8A90AE] transition-colors duration-300 hover:text-[#4A5170]";

const EYEBROW =
  "text-xs font-semibold uppercase tracking-[0.2em] text-[#1A3CBF]";
const HEADING =
  "mb-4 text-[30px] font-semibold leading-[1.22] tracking-[-0.015em] text-[#0C1848] [@media(max-height:680px)]:text-[26px]";
const LEDE = "text-base font-light leading-[1.6] text-[#4A5170]";

const whatsappIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 shrink-0">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.24 8.24 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.8-.79.97-.14.16-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.13-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.16 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z" />
  </svg>
);

const ViveLymbikaExperience = () => {
  const [screen, setScreen] = useState<Screen>("intro");
  const [pathKey, setPathKey] = useState<PathKey | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [qrDialogOpen, setQrDialogOpen] = useState(false);
  const isDesktop = useIsDesktop();

  const stageRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isFirstScreenRef = useRef(true);

  const path = pathKey ? PATHS[pathKey] : null;

  // Al cambiar de pantalla, volvemos al inicio de la experiencia (no de la página).
  useEffect(() => {
    if (isFirstScreenRef.current) {
      isFirstScreenRef.current = false;
      return;
    }
    stageRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [screen]);

  // Cada paso revelado se centra en pantalla, como en el recorrido original.
  useEffect(() => {
    if (screen !== "journey" || stepIndex === 0) return;
    const step = stepRefs.current[stepIndex];
    const timeout = window.setTimeout(() => {
      step?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 120);
    return () => window.clearTimeout(timeout);
  }, [screen, stepIndex]);

  const startJourney = (key: PathKey) => {
    setPathKey(key);
    setStepIndex(0);
    stepRefs.current = [];
    setScreen("journey");
  };

  const nextStep = () => {
    if (!path) return;
    if (stepIndex < path.steps.length - 1) setStepIndex(stepIndex + 1);
    else setScreen("close");
  };

  const back = () => {
    if (screen === "need") setScreen("intro");
    else if (screen === "journey") {
      if (stepIndex > 0) setStepIndex(stepIndex - 1);
      else setScreen("need");
    } else if (screen === "close") setScreen("need");
  };

  const isLastStep = path ? stepIndex === path.steps.length - 1 : false;
  const fillPercent = path
    ? (stepIndex / Math.max(path.steps.length - 1, 1)) * 100
    : 0;

  return (
    <MotionConfig reducedMotion="user">
      <div style={{ background: STAGE_BACKGROUND }}>
        <div
          ref={stageRef}
          className="mx-auto flex min-h-[85vh] w-full max-w-[460px] scroll-mt-4 flex-col px-6 pb-[26px] pt-4"
        >
          <div className="relative flex min-h-[34px] items-center justify-center">
            {screen !== "intro" && (
              <button
                type="button"
                onClick={back}
                className="absolute left-[-6px] top-1/2 flex -translate-y-1/2 items-center gap-1.5 px-1.5 py-2 text-sm tracking-[0.02em] text-[#8A90AE] transition-colors duration-300 hover:text-[#4A5170] active:opacity-60"
              >
                <ChevronLeft className="h-4 w-4" strokeWidth={2} />
                Atrás
              </button>
            )}
          </div>

          {/* ============ PANTALLA 0 · INTRO ============ */}
          {screen === "intro" && (
            <section className="flex flex-1 flex-col justify-center">
              <motion.p {...rise(0.05)} className={`${EYEBROW} mb-[18px]`}>
                Cómo te acompañamos
              </motion.p>
              <motion.h1 {...rise(0.18)} className={HEADING}>
                Imagina que hoy necesitas resolver algo de salud.
                <br />
                <span className="font-light text-[#8A90AE]">
                  Nosotros nos encargamos del resto.
                </span>
              </motion.h1>
              <motion.p {...rise(0.32)} className={LEDE}>
                Detrás de nuestro WhatsApp hay un médico que te escucha y te
                orienta. No tienes que saber a qué especialista ir, qué estudio
                pedir o dónde conseguir tu medicamento: tú nos dices qué
                necesitas y coordinamos cada paso por ti. Recorre el proceso como
                lo vive un paciente.
              </motion.p>
              <motion.div {...rise(0.46)} className="mt-[34px]">
                <button
                  type="button"
                  onClick={() => setScreen("need")}
                  className={BTN_PRIMARY}
                >
                  Comenzar
                </button>
              </motion.div>
            </section>
          )}

          {/* ============ PANTALLA 1 · NECESIDAD ============ */}
          {screen === "need" && (
            <section className="flex flex-1 flex-col justify-center">
              <motion.p {...rise(0.05)} className={`${EYEBROW} mb-[18px]`}>
                Tú empiezas aquí
              </motion.p>
              <motion.h1 {...rise(0.18)} className={HEADING}>
                ¿Qué necesitas hoy?
              </motion.h1>
              <div className="mt-[22px] flex flex-col gap-[11px]">
                {PATH_ORDER.map((key, i) => {
                  const option = PATHS[key];
                  return (
                    <motion.button
                      key={key}
                      type="button"
                      onClick={() => startJourney(key)}
                      {...rise(0.32 + i * 0.07)}
                      whileTap={{ scale: 0.98 }}
                      className={`flex w-full items-center gap-4 rounded-[18px] border px-[18px] py-4 text-left text-[#0C1848] shadow-[0_6px_20px_-14px_rgba(12,24,72,0.28)] transition-colors duration-300 hover:border-[#1A3CBF]/35 hover:shadow-[0_12px_26px_-14px_rgba(12,24,72,0.32)] ${
                        option.featured
                          ? "border-[#1A3CBF]/[0.28] bg-gradient-to-br from-[#E9EEFC] to-[#F6F8FE]"
                          : "border-[#E5E9F4] bg-white"
                      }`}
                    >
                      <span
                        className={`grid h-[46px] w-[46px] flex-none place-items-center rounded-[13px] text-[22px] ${
                          option.featured ? "bg-white" : "bg-[#F2F5FD]"
                        }`}
                      >
                        {option.emoji}
                      </span>
                      <span className="flex flex-col gap-[3px]">
                        <b className="text-base font-medium text-[#0C1848]">
                          {option.label}
                        </b>
                        <span className="text-[12.5px] font-light text-[#8A90AE]">
                          {option.hint}
                        </span>
                      </span>
                      <ArrowRight className="ml-auto h-[18px] w-[18px] flex-none text-[#4E67D8] opacity-[0.85]" />
                    </motion.button>
                  );
                })}
              </div>
            </section>
          )}

          {/* ============ PANTALLA 2 · RECORRIDO ============ */}
          {screen === "journey" && path && (
            <section className="flex flex-1 flex-col justify-start pt-1.5">
              <div className="mb-2">
                <span className="mb-[18px] inline-flex items-center gap-2 rounded-full border border-[#E5E9F4] bg-[#F2F5FD] px-3.5 py-2 text-[12.5px] font-medium text-[#0C1848]">
                  <span className="text-[15px]">{path.emoji}</span>
                  {path.label}
                </span>
                <div className="mb-[22px] mt-1 flex gap-1.5">
                  {path.steps.map((step, i) => (
                    <i
                      key={step.title}
                      className={`h-[3px] flex-1 rounded-sm transition-colors duration-500 ${
                        i <= stepIndex ? "bg-[#1A3CBF]" : "bg-[#E5E9F4]"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="relative flex-1 pl-1">
                <div className="absolute bottom-2 left-[22px] top-2 w-0.5 overflow-hidden bg-[#E5E9F4]">
                  <span
                    className="absolute left-0 top-0 block w-full bg-gradient-to-b from-[#4E67D8] to-[#1A3CBF] transition-[height] [transition-duration:600ms]"
                    style={{ height: `${fillPercent}%` }}
                  />
                </div>

                <div className="pb-1">
                  {path.steps.map((step, i) => {
                    const revealed = i <= stepIndex;
                    return (
                      <motion.div
                        key={step.title}
                        ref={(el) => {
                          stepRefs.current[i] = el;
                        }}
                        initial={{ opacity: 0, y: 14 }}
                        animate={
                          revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }
                        }
                        transition={{ duration: 0.6, ease: EASE }}
                        aria-hidden={!revealed}
                        className="flex gap-[18px] pb-[22px] pt-2.5 [@media(max-height:680px)]:pb-4"
                      >
                        <div
                          className={`z-[1] grid h-10 w-10 flex-none place-items-center rounded-full border-2 text-sm font-semibold transition-all duration-500 ${
                            revealed
                              ? "border-transparent bg-gradient-to-br from-[#1A3CBF] to-[#2A4FE0] text-white shadow-[0_10px_20px_-8px_rgba(26,60,191,0.55)]"
                              : "border-[#E5E9F4] bg-white text-[#8A90AE]"
                          }`}
                        >
                          {i + 1}
                        </div>
                        <div className="pt-[5px]">
                          <h3 className="mb-[5px] text-[16.5px] font-medium text-[#0C1848]">
                            {step.title}
                          </h3>
                          <p className="text-sm font-light leading-[1.55] text-[#4A5170]">
                            {step.description}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              <div className="sticky bottom-0 z-[5] bg-[linear-gradient(to_top,#FFFFFF_58%,rgba(255,255,255,0.82)_82%,rgba(255,255,255,0))] pb-0.5 pt-4">
                <button type="button" onClick={nextStep} className={BTN_PRIMARY}>
                  {isLastStep ? "Ver cómo termina" : "Continuar"}
                </button>
              </div>
            </section>
          )}

          {/* ============ PANTALLA 3 · CIERRE ============ */}
          {screen === "close" && (
            <section className="flex flex-1 flex-col justify-center">
              <div className="text-center">
                <motion.div
                  {...rise(0.05)}
                  className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-[20px] border border-[#E5E9F4] bg-[#E9EEFC]"
                >
                  <Check className="h-[30px] w-[30px] text-[#1A3CBF]" strokeWidth={1.8} />
                </motion.div>
                <motion.p {...rise(0.05)} className={`${EYEBROW} mb-[18px]`}>
                  Así acompañamos
                </motion.p>
                <motion.h1 {...rise(0.18)} className={cn(HEADING, "text-[26px]")}>
                  Llegaste con una duda.
                  <br />
                  <span className="font-light text-[#8A90AE]">
                    Te fuiste con un camino resuelto.
                  </span>
                </motion.h1>
                <motion.p
                  {...rise(0.32)}
                  className={cn(LEDE, "mx-auto max-w-[340px]")}
                >
                  Del otro lado de WhatsApp siempre hay un médico. Sin trámites,
                  sin vueltas y sin que tengas que resolverlo solo. Así atendemos
                  a cada trabajador y a cada familia que confía en nosotros.
                </motion.p>
                <motion.div
                  {...rise(0.46)}
                  className="mt-8 flex flex-col gap-2.5"
                >
                  {isDesktop ? (
                    <button
                      type="button"
                      onClick={() => setQrDialogOpen(true)}
                      className={BTN_WHATS}
                    >
                      {whatsappIcon}
                      Escríbenos por WhatsApp
                    </button>
                  ) : (
                    <Link
                      href={WHATSAPP_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={BTN_WHATS}
                    >
                      {whatsappIcon}
                      Escríbenos por WhatsApp
                    </Link>
                  )}
                  <button
                    type="button"
                    onClick={() => setScreen("need")}
                    className={BTN_GHOST}
                  >
                    Ver otro camino
                  </button>
                </motion.div>
                <motion.p
                  {...rise(0.6)}
                  className="mt-[26px] text-[11px] uppercase tracking-[0.12em] text-[#8A90AE]"
                >
                  Lymbika Health · Acompañamiento de salud · Ciudad Juárez
                </motion.p>
              </div>
            </section>
          )}
        </div>
      </div>

      <WhatsAppQrDialog
        open={qrDialogOpen}
        onOpenChange={setQrDialogOpen}
        url={WHATSAPP_LINK}
      />
    </MotionConfig>
  );
};

export default ViveLymbikaExperience;
