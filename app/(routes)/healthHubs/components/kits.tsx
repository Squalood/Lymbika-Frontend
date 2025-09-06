import { BarChart3, Check, MoveRight, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const paquetes = [
  {
    nombre: "Presencia Médica",
    descripcion: "Perfil profesional y visibilidad básica en Lymbika.",
    precio: "3,999",
    beneficios: [
      "Perfil profesional en Doctoralia",
      "Video + imágenes para perfil",
      "Landing page en Lymbika",
      "1 publicación mensual en red Lymbika",
      "Dashboard básico (agenda, métricas, seguimiento)",
      "Coordinación quirúrgica/hospitalaria incluida",
    ],
    restricciones: [
      "No incluye publicación cruzada",
      "No incluye membresía Mediclub",
    ],
    destacado: false,
  },
  {
    nombre: "Captación Activa",
    descripcion: "Amplía tu alcance y mide conversiones con más detalle.",
    precio: "7,999",
    beneficios: [
      "Todo lo del paquete anterior",
      "2 publicaciones al mes y 4 menciones en FN#1",
      "Campaña compartida en Google Ads",
      "Dashboard completo (agenda quirúrgica, métricas de conversión, referidos)",
      "Coordinación quirúrgica/hospitalaria incluida",
    ],
    restricciones: ["No incluye membresía Mediclub"],
    destacado: true,
  },
  {
    nombre: "Agenda Llena",
    descripcion: "Crecimiento total, agenda optimizada y beneficios exclusivos.",
    precio: "16,000",
    beneficios: [
      "Todo lo del paquete anterior",
      "2 publicaciones + 1 reel mensual en FN#1",
      "Campaña individual en Google Ads",
      "Landing page personalizada con calendario de agenda",
      "Membresía Mediclub para pacientes incluida (farmacia precio proveedor)",
      "Dashboard extendido (ROI, métricas por especialidad, soporte estratégico)",
      "Coordinación quirúrgica/hospitalaria incluida",
    ],
    restricciones: [],
    destacado: false,
  },
];

export const PricingPaquetes = () => (
  <div className="w-full md:max-w-6xl mx-auto py-20 px-4 lg:py-20">
    <div className="container mx-auto">
      <div className="flex text-center justify-center items-center gap-4 flex-col">
        <Badge>Paquetes</Badge>
        <div className="flex gap-2 flex-col">
          <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl text-center font-regular">
            Activa tu práctica médica con Lymbika
          </h2>
          <p className="text-lg leading-relaxed tracking-tight text-muted-foreground max-w-xl text-center">
            Paquetes comerciales para posicionarte, captar pacientes y escalar tu consulta.
          </p>
        </div>

        <div className="grid pt-20 text-left grid-cols-1 lg:grid-cols-3 w-full gap-8">
          {paquetes.map((paquete) => (
            <Card
              key={paquete.nombre}
              className={`w-full rounded-md ${
                paquete.destacado ? "shadow-2xl" : ""
              }`}
            >
              <CardHeader>
                <CardTitle>
                  <span className="flex flex-row gap-4 items-center font-normal">
                    {paquete.nombre}
                  </span>
                </CardTitle>
                <CardDescription>{paquete.descripcion}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-8 justify-start">
                  <p className="flex flex-row items-center justify-center gap-2 text-xl">
                    <span className="text-4xl">${paquete.precio}</span>
                    <span className="text-sm text-muted-foreground"> MXN</span>
                  </p>

                  <div className="flex flex-col gap-4 justify-start">
                    {paquete.beneficios.map((item) => (
                      <div key={item} className="flex flex-row gap-4">
                        <Check className="w-4 h-4 mt-1 text-primary" />
                        <p>{item}</p>
                      </div>
                    ))}

                    {paquete.restricciones.map((item) => (
                      <div
                        key={item}
                        className="flex flex-row gap-4 text-muted-foreground"
                      >
                        <X className="w-4 h-4 mt-1 text-destructive" />
                        <p>{item}</p>
                      </div>
                    ))}
                  </div>

                  <Button
                    className="gap-4"
                    variant={paquete.destacado ? "default" : "outline"}
                  >
                    Empezar <MoveRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bloque adicional */}
        <div className="mt-16 w-full flex justify-center">
          <div className="flex items-center gap-4 bg-muted/50 border border-muted-foreground/20 rounded-lg px-6 py-6 max-w-2xl text-left">
            <BarChart3 className="w-8 h-8 text-primary shrink-0" />
            <div className="flex flex-col">
              <p className="text-lg font-semibold">
                📊 Modelo de ingresos adicional
              </p>
              <p className="text-muted-foreground">
                <span className="font-medium text-foreground">$100 MXN</span> por
                cada paciente referido a otro médico de nuestra red.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);