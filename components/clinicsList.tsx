"use client";

import { ChevronRight, Baby, Brain, ClipboardPlus, Dumbbell, HeartPulse, Hospital, Laugh, Ribbon, ScanHeart, Shell, Sparkles, Stethoscope, Syringe, Venus, Bandage, Bone, BriefcaseMedical, Dna, PillBottle, Ambulance } from "lucide-react";
import Link from "next/link";
import { ClinicType } from "@/types/clinic";

type ClinicsListProps = {
  clinics: ClinicType[];
};

const iconMap = {
  HeartPulse,
  Stethoscope,
  ScanHeart,
  Brain,
  Hospital,
  Ribbon,
  Venus,
  Baby,
  Sparkles,
  Shell,
  ClipboardPlus,
  Syringe,
  Dumbbell,
  Laugh,
  BriefcaseMedical,
  PillBottle,
  Bone,
  Bandage,
  Dna,
  Ambulance
};

export default function ClinicsList({ clinics }: ClinicsListProps) {
  // Filtrar clínicas destacadas para el grid (máximo 6)
  const gridClinics = clinics.filter(clinic => clinic.featuredClinic === true).slice(0, 6);
  
  // Clínicas no destacadas para la lista lateral
  const sidebarClinics = clinics.filter(clinic => clinic.featuredClinic !== true);

  return (
    <div className="w-[900px] p-4 flex gap-2">
      {/* Grid principal - 75% */}
      <div className="w-3/4 my-auto">
        <h2 className="py-2 text-base text-muted-foreground">Clinicas destacadas</h2>
        <div className="grid grid-cols-3 gap-2">
          {gridClinics.map((clinic) => {
            const IconComponent = iconMap[clinic.icon as keyof typeof iconMap] || Laugh;
            return (
              <Link
                key={clinic.id}
                href={`/clinics/${clinic.slug}`}
                className="group flex items-center rounded-md px-2 py-2 hover:bg-accent transition-colors"
                
              >
                {IconComponent && (
                  <IconComponent
                    size={18}
                    className="text-primary mr-2 group-hover:text-blue-400 transition-colors flex-shrink-0"
                  />
                )}
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="text-sm font-medium text-foreground truncate">
                    {clinic.title}
                  </span>
                  <p className="text-xs text-muted-foreground line-clamp-3">
                    {clinic.heroSubtitle}
                  </p>
                </div>
                <ChevronRight
                  size={14}
                  className="ml-1 text-muted-foreground group-hover:translate-x-1 transition-transform flex-shrink-0"
                />
              </Link>
            );
          })}
        </div>
      </div>

      {/* Lista lateral - 25% */}
      {sidebarClinics.length > 0 && (
        <div className="w-1/4 border-l border-border pl-3">
          <h2 className="py-2 text-base text-muted-foreground">Otras Clinicas</h2>
          <ul className="flex flex-col gap-1">
            {sidebarClinics.map((clinic) => {
              const IconComponent = iconMap[clinic.icon as keyof typeof iconMap] || Laugh;
              console.log(clinic.title, clinic.icon)
              return (
                <li key={clinic.id}>
                  <Link
                    href={`/clinics/${clinic.slug}`}
                    className="group flex items-center rounded-md px-2 py-1.5 hover:bg-accent transition-colors"
                  >
                    {IconComponent && (
                      <IconComponent
                        size={16}
                        className="text-primary mr-2 group-hover:text-blue-400 transition-colors flex-shrink-0"
                      />
                    )}
                    <span className="text-xs font-medium text-foreground flex-1 truncate">
                      {clinic.title}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}