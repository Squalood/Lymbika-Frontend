"use client";

import { logoutAction } from "@/app/data/actions/auth-actions";
import { UserType } from "@/types/user";
import { ChevronRight, LogOut } from "lucide-react";
import Link from "next/link";

type Props = {
  userData?: UserType | null;
};

type CardData = {
  title: string;
  description: string;
  image: string;
  link: string;
  isBackgroundCard?: boolean;
};

const cards: CardData[] = [
  {
    title: "Mi Membresia",
    description:
      "Produce professional, reliable streams easily leveraging Preline's innovative broadcast studio",
    image:
      "https://images.unsplash.com/photo-1586232702178-f044c5f4d4b7?auto=format&fit=crop&w=560&q=80",
    link: "/dashboard/summaries",
  },
  {
    title: "Editar Cuenta",
    description:
      "Optimize your in-person experience with best-in-class capabilities like badge printing and lead retrieval",
    image:
      "https://images.unsplash.com/photo-1542125387-c71274d94f0a?auto=format&fit=crop&w=560&q=80",
    link: "/dashboard/account",
  },
  {
    title:
      "Cerrar Sección",
    description: "",
    image:
      "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=560&q=80",
    link: "#",
    isBackgroundCard: true,
  },
];

const Card = ({ title, description, image, link, isBackgroundCard }: CardData) => {
  if (isBackgroundCard) {
    return (
    <form action={logoutAction}
        className="group relative flex flex-col w-full min-h-60 bg-center bg-cover rounded-xl hover:shadow-lg transition overflow-hidden"
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
    <Link href={link} className="group flex flex-col focus:outline-hidden">
      <div className="relative pt-[50%] sm:pt-[70%] rounded-xl overflow-hidden">
        <img
          src={image}
          alt={title}
          className="size-full absolute top-0 start-0 object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
        />
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

const Navs = ({ userData }: Props) => {
  return (
    <div className="max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      {/* Title */}
      <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
        <h2 className="text-2xl font-bold md:text-4xl md:leading-tight">
          Bienvenido {userData?.username}
        </h2>
        {/*<p className="mt-1 text-gray-600">descripcion</p>*/}
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>
    </div>
  );
};

export default Navs;