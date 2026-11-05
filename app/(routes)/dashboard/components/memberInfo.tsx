import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserType } from "@/types/user";
import {
  Accessibility,
  AlertTriangle,
  BadgePercent,
  CheckCircle,
  ChevronLeft,
  CircleDollarSign,
  Clock,
  IdCard,
  PersonStanding,
  Phone,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { JSX } from "react";
import { getSiteConfig } from "@/lib/strapi/pages";
import { cn } from "@/lib/utils";
import { formatLongDate } from "@/lib/formatDate";
import {
  resolveMembershipState,
  type MembershipStateKind,
} from "@/lib/membership-state";
import WhatsAppTrigger from "@/components/whatsapp-trigger";
import { PortalButton } from "./portal-button";
import { PortalReturnSync } from "./portal-return-sync";

type Props = {
  user: UserType;
  /** El usuario acaba de volver del Customer Portal (`?portal=1`). */
  cameFromPortal?: boolean;
  /** Firma del estado con el que se renderizó, para detectar el cambio. */
  firmaMembresia?: string;
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

// Los tintes viven junto al JSX, no en lib/membership-state.ts: el resolvedor
// devuelve lógica pura y el componente decide cómo se ve.
const PILL: Record<MembershipStateKind, string> = {
  active: "text-green-700 bg-green-100 border-green-300",
  canceling: "text-amber-700 bg-amber-100 border-amber-300",
  payment_failed: "text-red-700 bg-red-100 border-red-300",
  manual: "text-blue-700 bg-blue-100 border-blue-300",
  none: "",
};

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

const MemberInfo = async ({ user, cameFromPortal, firmaMembresia }: Props) => {
  const { membershipName } = await getSiteConfig();
  const estado = resolveMembershipState(user);
  // Se formatea en el servidor: ni Intl ni la fecha cruda cruzan al cliente,
  // así que no hay desajuste de zona horaria entre servidor y navegador.
  const fechaFin = formatLongDate(estado.periodEnd);

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
            <div className="sm:w-1/2 px-4 py-6">
              <div
                className={cn(
                  "rounded-2xl shadow-lg p-6 flex flex-col justify-between h-full gap-6",
                  // El pago fallido tiñe la tarjeta entera: es la pantalla que
                  // recupera el ingreso, no puede pasar desapercibida.
                  estado.kind === "payment_failed"
                    ? "bg-red-50 border-2 border-red-300"
                    : "bg-muted"
                )}
              >

                {/* Encabezado */}
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <IdCard size={32} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold leading-snug">{membershipName}</h3>
                    <p className="text-sm text-muted-foreground">
                      Accede a productos con precio de proveedor.
                    </p>
                  </div>
                </div>

                {/* Estado de membresía */}
                <div className="flex flex-col gap-3">
                  {estado.kind === "active" && (
                    <>
                      <Badge
                        variant="outline"
                        className={cn("gap-2 py-2 px-4 text-sm w-full justify-center", PILL.active)}
                      >
                        <CheckCircle size={16} />
                        Miembro activo de {membershipName}
                      </Badge>
                      {fechaFin && (
                        <p className="text-sm text-muted-foreground">
                          Tu membresía se renueva el {fechaFin}.
                        </p>
                      )}
                      <PortalButton label="Administrar tu suscripción" />
                    </>
                  )}

                  {estado.kind === "canceling" && (
                    <>
                      <Badge
                        variant="outline"
                        className={cn("gap-2 py-2 px-4 text-sm w-full justify-center", PILL.canceling)}
                      >
                        <Clock size={16} />
                        Cancelada
                      </Badge>
                      <p className="text-sm text-muted-foreground">
                        {fechaFin ? (
                          <>
                            Conservas tus beneficios hasta el <strong>{fechaFin}</strong>.
                            Después de esa fecha no se renovará.
                          </>
                        ) : (
                          <>
                            Conservas tus beneficios hasta el final del periodo que ya
                            pagaste. Después no se renovará.
                          </>
                        )}
                      </p>
                      <PortalButton label="Reactivar mi suscripción" />
                    </>
                  )}

                  {estado.kind === "payment_failed" && (
                    <>
                      <p
                        role="alert"
                        className="flex items-start gap-2 rounded-lg border border-red-300 bg-red-100 p-3 text-sm text-red-800"
                      >
                        <AlertTriangle size={18} className="mt-0.5 shrink-0" />
                        <span>
                          <strong className="block">
                            {estado.firstCharge
                              ? "No pudimos confirmar tu primer pago"
                              : "No pudimos procesar tu último pago"}
                          </strong>
                          Actualiza tu método de pago para no perder el precio de
                          proveedor
                          {fechaFin ? <> ni tus beneficios, que vencen el {fechaFin}</> : null}.
                        </span>
                      </p>
                      <PortalButton label="Actualizar método de pago" variant="destructive" />
                    </>
                  )}

                  {estado.kind === "manual" && (
                    <>
                      <Badge
                        variant="outline"
                        className={cn("gap-2 py-2 px-4 text-sm w-full justify-center", PILL.manual)}
                      >
                        <ShieldCheck size={16} />
                        Miembro activo de {membershipName}
                      </Badge>
                      <p className="text-sm text-muted-foreground">
                        Tu membresía la administra el equipo de Lymbika. Para renovarla,
                        cambiarla o darla de baja, escríbenos.
                      </p>
                      {/* Sin botón de portal a propósito: no hay un customer de
                          Stripe que abrir, y un botón que siempre falla es peor
                          que ninguno. */}
                      <WhatsAppTrigger
                        className={cn(buttonVariants({ variant: "outline" }), "w-full gap-2")}
                      >
                        <Phone className="w-4 h-4" />
                        Escribir por WhatsApp
                      </WhatsAppTrigger>
                    </>
                  )}

                  {estado.kind === "none" && (
                    <Button asChild className="w-full">
                      <Link href="/membership">Ver planes disponibles</Link>
                    </Button>
                  )}

                  {cameFromPortal && firmaMembresia && (
                    <PortalReturnSync firmaInicial={firmaMembresia} />
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
