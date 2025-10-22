"use client";

import { ChevronRight, Baby, Brain, ClipboardPlus, Dumbbell, HeartPulse, Hospital, Laugh, Ribbon, ScanHeart, Shell, Sparkles, Stethoscope, Syringe, Venus } from "lucide-react";
import Link from "next/link";
import { ClinicType } from "@/types/clinic";

type ClinicsListProps = {
  clinics: ClinicType[];
  loading?: boolean;
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
  Laugh
};

export default function ClinicsList({ clinics, loading }: ClinicsListProps) {
  if (loading) return <p className="text-center py-4 text-muted-foreground">Cargando clínicas...</p>;

  return (
    <ul className="w-[350px] p-4 flex flex-col gap-4 max-h-[550px] overflow-y-auto">
      {clinics.map((clinic) => {
        const IconComponent = iconMap[clinic.icon as keyof typeof iconMap] || Stethoscope;
        return (
          <li key={clinic.id}>
            <Link
              href={`/clinics/${clinic.slug}`}
              className="group flex items-center w-full rounded-md px-3 py-2 hover:bg-accent transition-colors"
            >
              {IconComponent && (
                <IconComponent
                  size={22}
                  className="text-primary mr-3 group-hover:text-blue-400 transition-colors"
                />
              )}
              <div className="flex flex-col">
                <span className="text-sm font-medium text-foreground">{clinic.title}</span>
                <p className="text-xs text-muted-foreground line-clamp-2 max-w-52">
                  {clinic.heroSubtitle}
                </p>
              </div>
              <ChevronRight
                size={18}
                className="ml-auto text-muted-foreground group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}