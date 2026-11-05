import { MedicalServiceType } from "@/types/medical-service";
import { DoctorBannerCard } from "@/components/doctor-banner-card";

export default function Doctors({ service }: { service: MedicalServiceType }) {
  const serviceRates = service.service_rates ?? [];
  const t = service.landingTexts;
  const uniqueDoctorRates = serviceRates.filter((r, idx, arr) =>
    r.doctor && arr.findIndex((x) => x.doctor?.doctorName === r.doctor?.doctorName) === idx
  );
  if (uniqueDoctorRates.length === 0) return null;

  return (
    <section className="w-full py-4 px-4 md:px-8 max-w-6xl mx-auto space-y-8">
      <div className="space-y-3 text-center">
        <span className="text-xs font-bold tracking-widest uppercase text-primary">
          {uniqueDoctorRates.length === 1 ? (t?.doctors_label ?? "Tu especialista") : (t?.doctors_label_plural ?? "Nuestros especialistas")}
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-snug">
          {uniqueDoctorRates.length === 1 ? (t?.doctors_title ?? "Conoce a tu especialista") : (t?.doctors_title_plural ?? "Conoce a nuestros especialistas")}
        </h2>
      </div>

      {/* Centrado: con uno o dos doctores las tarjetas no se quedan pegadas a la izquierda */}
      <div className="flex flex-wrap justify-center gap-4">
        {uniqueDoctorRates.map((rate, i) => (
          <div key={rate.id ?? i} className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc((100%-2rem)/3)]">
            <DoctorBannerCard doctor={rate.doctor} />
          </div>
        ))}
      </div>
    </section>
  );
}
