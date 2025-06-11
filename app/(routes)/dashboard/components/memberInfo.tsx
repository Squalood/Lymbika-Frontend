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
            {/* Membership Card */}
            <div className="sm:w-1/2 flex items-center px-12 py-8">
            <div className="bg-slate-200 h-full rounded-lg p-6 flex justify-between flex-col">
                <IdCard size={48} className="text-primary" />
                <div className="flex flex-col">
                <h3 className="text-xl tracking-tight">MediClub</h3>
                <p className="text-muted-foreground max-w-xs text-base">
                    Productos de farmacia a precio de proveedor.
                </p>
                {user.mediClubRegular ? (
                    <p className="my-3 mx-auto w-full flex items-center justify-center gap-2 text-sm font-semibold text-green-600 bg-green-100 py-2 px-3 rounded-full">
                    <CheckCircle size={16} className="text-green-600" />
                    Precio MediClub aplicado
                    </p>
                ) : (
                    <Button
                    className="my-3 mx-auto w-2/3"
                    onClick={() => router.push("/membership")}
                    >
                    Más Info
                    </Button>
                )}
                </div>
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