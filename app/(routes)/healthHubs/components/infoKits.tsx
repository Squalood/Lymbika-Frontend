import Image from "next/image";

interface MedicalKitsSectionProps {
  imageUrl?: string;
}

const MedicalKitsSection = ({ imageUrl }: MedicalKitsSectionProps) => {
  return (
    <section className="bg-primary py-16 px-4">
      <div className="max-w-6xl mx-auto bg-card text-card-foreground rounded-2xl shadow-sm p-8 md:p-12">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
          Todo para tu consulta —{" "}
          <span className="text-primary">Medicinas y Kits</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="overflow-hidden rounded-lg">
            <Image
              src={imageUrl || "/assets/infoKits.jpeg"}
              alt="Suministro médico"
              width={600}
              height={400}
              className="object-cover w-full h-full rounded-lg"
            />
          </div>

          <div className="space-y-5">
            <h3 className="text-xl md:text-2xl font-bold">
              Suministro Médico Fácil
            </h3>
            <ul className="space-y-4 text-muted-foreground text-sm md:text-base">
              <li>
                <span className="font-semibold text-foreground">
                  • Precios de proveedor y kits reservados —
                </span>{" "}
                Accede a tarifas preferenciales en medicamentos, consumibles y
                equipos.
              </li>
              <li>
                <span className="font-semibold text-foreground">
                  • Nos encargamos de la logística —
                </span>{" "}
                Tú recomiendas; Lymbika gestiona el pedido y la entrega
                sincronizada con la cita del paciente, sin trámites extra para
                ti.
              </li>
              <li>
                <span className="font-semibold text-foreground">
                  • Complementa tu consulta con una farmacia virtual —
                </span>{" "}
                Integra recetas, pedidos recurrentes y descuentos automáticos
                para tus pacientes; mejora la adherencia y la experiencia
                clínica desde un solo lugar.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MedicalKitsSection;