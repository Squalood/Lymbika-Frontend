"use client";

import { logoutAction } from "@/app/data/actions/auth-actions";
import { UserType } from "@/types/user";
import { ChevronRight, ClipboardList, LogOut, LucideIcon, Settings, SquareUserRound } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  userData?: UserType | null;
  puedeOperar?: boolean;
};

type CardData = {
  title: string;
  description: string;
  icon: LucideIcon; 
  image: string;
  link: string;
  isBackgroundCard?: boolean;
};

const cards: CardData[] = [
  {
    title: "Membresía",
    description:
      "Consulta los detalles y beneficios de tu suscripción actual.",
    icon: SquareUserRound,
    image: "",
    link: "/dashboard/summaries",
  },
  {
    title: "Configuración de Cuenta",
    description:
      "Actualiza tu información personal y preferencias de perfil.",
    icon: Settings,
    image: "",
    link: "/dashboard/account",
  },
  {
    title:
      "Cerrar Sección",
    description: "",
    image:
      "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=560&q=80",
    link: "#",
    icon: Settings,
    isBackgroundCard: true,
  },
];

const operationsCard: CardData = {
  title: "Operación",
  description: "Revisa y coordina los casos de los pacientes.",
  icon: ClipboardList,
  image: "",
  link: "/dashboard/operations",
};

const Card = ({ title, description, icon:Icon, link, image, isBackgroundCard, anchoDoble }: CardData & { anchoDoble?: boolean }) => {
  if (isBackgroundCard) {
    return (
    <form action={logoutAction}
        className={cn(
          "group relative flex flex-col w-full min-h-60 bg-center bg-cover rounded-xl hover:shadow-lg transition overflow-hidden lg:col-span-1",
          anchoDoble && "sm:col-span-2"
        )}
        style={{ backgroundImage: `url(${image})` }}
        >
        <button type="submit" className="flex flex-col justify-between h-full w-full text-left p-6 hover:bg-black/40 transition text-white">
            <div className="flex-1" />
                <div className="flex items-center justify-between">
                <span className="text-xl font-medium">{title}</span>
                <LogOut className="w-6 h-6" />
            </div>
        </button>
    </form>
    );
  }

  return (
    <Link href={link} className="group flex flex-col focus:outline-hidden w-5/6 lg:w-full mx-auto">
      <div className="relative flex items-center h-48 pl-4 rounded-xl bg-slate-200">
        <div className="transition-transform duration-500 ease-in-out group-hover:scale-125">
          <Icon className="w-24 h-24 text-blue-600" />
        </div>
      </div>
      <div className="mt-7">
        <h3 className="text-xl font-semibold text-gray-800 group-hover:text-gray-600">
          {title}
        </h3>
        <p className="mt-3 text-gray-800">{description}</p>
        <p className="mt-5 inline-flex items-center gap-x-1 text-sm text-blue-600 decoration-2 group-hover:underline font-medium">
          Entrar
          <ChevronRight size={16} />
        </p>
      </div>
    </Link>
  );
};

const Navs = ({ userData, puedeOperar }: Props) => {
  // Para quien opera casos, Operación es lo primero que necesita.
  const visibles = puedeOperar ? [operationsCard, ...cards] : cards;

  return (
    <div className="max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      {/* Title */}
      <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
        <h2 className="text-2xl font-bold md:text-4xl md:leading-tight">
          Bienvenido {userData?.username}
        </h2>
        {/*<p className="mt-1 text-gray-600">descripcion</p>*/}
      </div>

      {/* Grid */}
      {/* 3 tarjetas (sin permisos) en 3 columnas; 4 o más, en 4. */}
      <div
        className={cn(
          "grid sm:grid-cols-2 gap-4",
          visibles.length <= 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"
        )}
      >
        {visibles.map((card, index) => (
          // En tablet (2 columnas), si son impares Cerrar sesión ocupa la fila completa.
          <Card key={index} {...card} anchoDoble={visibles.length % 2 === 1} />
        ))}
      </div>
    </div>
  );
};

export default Navs;