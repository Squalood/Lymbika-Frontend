import { MedicalServiceType } from "@/types/medicalService";
import HospitalCardSimple from "@/components/features/hospitals/hospital-card-simple";

export default function Hospitals({ service }: { service: MedicalServiceType }) {
  const hospitals = service.hospitals ?? [];
  if (hospitals.length === 0) return null;

  return (
    <section id="hospitales" className="w-full py-4 px-4 md:px-8 max-w-6xl mx-auto space-y-8">
      <div className="space-y-3 text-center">
        <span className="text-xs font-bold tracking-widest uppercase text-primary">
          {hospitals.length === 1 ? "Tu hospital" : "Nuestros hospitales"}
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-snug">
          {hospitals.length === 1 ? "Dónde se realiza" : "Dónde puedes realizarlo"}
        </h2>
      </div>

      {/* El ancho se acota segun la cantidad para que 1 o 2 cards no queden sueltas
          en una grid de 3 columnas. */}
      <div
        className={`grid gap-4 mx-auto ${
          hospitals.length === 1
            ? "max-w-sm"
            : hospitals.length === 2
              ? "sm:grid-cols-2 max-w-3xl"
              : "sm:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        {hospitals.map((hospital) => (
          <HospitalCardSimple key={hospital.id} hospital={hospital} />
        ))}
      </div>
    </section>
  );
}
