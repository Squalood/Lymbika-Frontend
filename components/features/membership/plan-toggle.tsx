"use client";

import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

interface PlanToggleProps {
  isFamilyPlan: boolean;
  setIsFamilyPlan: (value: boolean) => void;
  personalLabel?: string;
  familyLabel?: string;
}

const PlanToggle = ({
  isFamilyPlan,
  setIsFamilyPlan,
  personalLabel = "Plan por Persona",
  familyLabel = "Plan por Familia",
}: PlanToggleProps) => {
  return (
    <div className="relative flex bg-muted rounded-full w-fit gap-1 mx-auto my-8">
      <AnimatePresence>
        <motion.div
          key={isFamilyPlan ? "familia" : "persona"}
          layoutId="active-pill"
          className="absolute rounded-full bg-muted shadow z-0"
          initial={false}
          animate={{ width: "100%", height: "100%" }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </AnimatePresence>

      <div className="relative z-10 flex gap-1 w-full">
        <button
          onClick={() => setIsFamilyPlan(false)}
          aria-label={`Seleccionar ${personalLabel}`}
          className={clsx(
            "relative z-10 px-4 py-4 text-sm font-medium rounded-full transition",
            !isFamilyPlan ? "text-black" : "text-muted-foreground"
          )}
        >
          {!isFamilyPlan && (
            <motion.div
              layoutId="highlight"
              className="absolute inset-0 bg-white rounded-full shadow m-1"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative z-10">{personalLabel}</span>
        </button>
        <button
          onClick={() => setIsFamilyPlan(true)}
          aria-label={`Seleccionar ${familyLabel}`}
          className={clsx(
            "relative z-10 px-4 py-4 text-sm font-medium rounded-full transition",
            isFamilyPlan ? "text-black" : "text-muted-foreground"
          )}
        >
          {isFamilyPlan && (
            <motion.div
              layoutId="highlight"
              className="absolute inset-0 bg-white rounded-full shadow m-1"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative z-10">{familyLabel}</span>
        </button>
      </div>
    </div>
  );
};

export default PlanToggle;