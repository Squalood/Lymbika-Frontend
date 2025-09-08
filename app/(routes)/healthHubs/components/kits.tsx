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
import Link from "next/link";
import { PageType } from "@/types/pages";
import { formatPrice } from "@/lib/formatPrice";

type PlansProps = {
  data: PageType[];
};

const PricingPaquetes = ({ data }: PlansProps) => {
  const planItems = data.flatMap((page) => page.plan ?? []);

  return (
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
            {planItems.map((paquete) => (
              <Card key={paquete.id ?? crypto.randomUUID()} className={`w-full rounded-md ${paquete.prominent ? "shadow-2xl" : ""}`}>
                <CardHeader>
                  <CardTitle>
                    <span className="flex flex-row gap-4 items-center font-normal">
                      {paquete.name ?? "Sin nombre"}
                    </span>
                  </CardTitle>
                  <CardDescription>
                    {paquete.description ?? "Sin descripción"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-8 justify-start">
                    <p className="flex flex-row items-center justify-center gap-2 text-xl">
                      <span className="text-4xl">
                        {formatPrice(paquete.price) ?? "0"}
                      </span>
                      <span className="text-sm text-muted-foreground"> MXN</span>
                    </p>
                    <div className="flex flex-col gap-4 justify-start">
                      {paquete.plus?.map((item) =>
                        item?.text ? (
                          <div key={item.id ?? crypto.randomUUID()} className="flex flex-row gap-4">
                            <Check className="w-4 h-4 mt-1 text-primary" />
                            <p>{item.text}</p>
                          </div>
                        ) : null
                      )}
                      {paquete.less?.map((item) =>
                        item?.text ? (
                          <div key={item.id ?? crypto.randomUUID()} className="flex flex-row gap-4 text-muted-foreground">
                            <X className="w-4 h-4 mt-1 text-destructive" />
                            <p>{item.text}</p>
                          </div>
                        ) : null
                      )}
                    </div>
                    {paquete.link ? (
                      <Button asChild className="gap-4" variant={paquete.prominent ? "default" : "outline"}>
                        <Link href={paquete.link}>
                          Empezar
                          <MoveRight className="w-4 h-4" />
                        </Link>
                      </Button>
                    ) : (
                      <Button disabled className="gap-4" variant="outline">
                        No disponible
                      </Button>
                    )}
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
                  <span className="font-medium text-foreground">$100 MXN</span>{" "}
                  por cada paciente referido a otro médico de nuestra red.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPaquetes;