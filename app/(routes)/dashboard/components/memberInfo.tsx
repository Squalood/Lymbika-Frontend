"use client";

import { Button } from "@/components/ui/button";
import { UserType } from "@/types/user";
import {
  Accessibility,
  BadgePercent,
  CheckCircle,
  ChevronLeft,
  CircleDollarSign,
  IdCard,
  PersonStanding,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { JSX } from "react";

type Props = {
  user: UserType;
};

type CardData = {
  title: string;
  description: string;
  icon: JSX.Element;
};

const cardData: CardData[] = [
  {
    title: "Precio",
    description: "Medicamentos a precio de proveedor.",
    icon: <CircleDollarSign size={36} />,
  },
  {
    title: "Descuentos",
    description: "Descuentos en laboratorios y estudios.",
    icon: <BadgePercent size={36} />,
  },
  {
    title: "Ideal",
    description: "Ideal para pacientes con tratamientos crónicos.",
    icon: <Accessibility size={36} />,
  },
  {
    title: "Fácil",
    description: "Acceso simple y rápido a tus beneficios.",
    icon: <PersonStanding size={36} />,
  },
];

const InfoCard = ({ title, description, icon }: CardData) => (
  <div className="size-full bg-white shadow-lg rounded-lg p-5">
    <div className="flex items-center gap-x-4 mb-3">
      <div className="inline-flex justify-center items-center text-primary">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
    </div>
    <p className="text-gray-600">{description}</p>
  </div>
);

const MemberInfo = ({ user }: Props) => {
  const router = useRouter();

  return (
    <div className="max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto flex flex-col">
        <div className="mb-4 w-full">
            <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard" className="flex items-center gap-1">
                    <ChevronLeft className="w-4 h-4" />
                    Volver
                </Link>
            </Button>
        </div>
        <div className="flex justify-between flex-col sm:flex-row">
            {/* Membership Card Mejorada Final */}
            <div className="sm:w-1/2 px-4 py-6">
              <div className="bg-muted rounded-2xl shadow-lg p-6 flex flex-col justify-between h-full gap-6">
                
                {/* Encabezado */}
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <IdCard size={32} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold leading-snug">MediClub</h3>
                    <p className="text-sm text-muted-foreground">
                      Accede a productos con precio de proveedor.
                    </p>
                  </div>
                </div>

                {/* Estado de membresía */}
                {user.mediClubRegular ? (
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2 py-2 px-4 text-sm font-medium text-green-700 bg-green-100 border border-green-300 rounded-full">
                      <CheckCircle size={16} />
                      <span>Miembro activo de MediClub</span>
                    </div>
                    <Button asChild className="w-full">
                      <Link href="https://billing.stripe.com/p/login/aEUcNE58hbHlc3meUU">Administrar tu cuenta</Link>
                    </Button>
                  </div>
                ) : (
                  <Button asChild className="w-full">
                    <Link href="/membership">Ver planes disponibles</Link>
                  </Button>
                )}
              </div>
            </div>
            {/* Info Cards */}
            <div className="sm:w-1/2 grid sm:grid-cols-2 items-center gap-6 md:gap-4">
            {cardData.map((card, index) => (
                <InfoCard key={index} {...card} />
            ))}
            </div> 
        </div>
        
    </div>
  );
};

export default MemberInfo;