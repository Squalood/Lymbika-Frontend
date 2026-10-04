import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MedicalServiceType } from "@/types/medicalService";
import { Button } from "@/components/ui/button";
import { imgUrl } from "@/lib/media";

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

      <div className="space-y-6">
        {uniqueDoctorRates.map((rate, i) => {
          const doctor = rate.doctor;
          if (!doctor) return null;
          const doctorImg = doctor.bannerImage?.url ?? doctor.image?.[0]?.url ?? null;
          const MAX_W = 260;
          const srcW = doctor.bannerImage?.width ?? null;
          const srcH = doctor.bannerImage?.height ?? null;
          const imgW = srcW && srcH ? Math.min(MAX_W, srcW) : MAX_W;
          const imgH = srcW && srcH ? Math.round((srcH / srcW) * imgW) : MAX_W;
          return (
            <div key={rate.id ?? i} className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* Izquierda: card del doctor */}
              <div className="rounded-xl border bg-card p-5 flex flex-col sm:flex-row gap-5 items-start overflow-hidden">
                <div className="shrink-0 w-20 h-20 rounded-xl overflow-hidden bg-muted">
                  {doctor.image?.[0]?.url ? (
                    <Image
                      src={imgUrl(doctor.image[0].url)}
                      alt={doctor.doctorName}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                      Foto
                    </div>
                  )}
                </div>
                <div className="flex-1 space-y-2">
                  <h3 className="font-bold text-foreground text-base">{doctor.doctorName}</h3>
                  {doctor.about && (
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                      {doctor.about}
                    </p>
                  )}
                  <Button asChild variant="outline" className="gap-2 mt-1" size="sm">
                    <Link href={`/doctor/${doctor.slug}`}>
                      {t?.doctors_profile_button ?? "Ver perfil"} <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Derecha: imagen */}
              <div className="flex items-center justify-center">
                {doctorImg ? (
                  <div
                    className="rounded-xl overflow-hidden bg-muted shrink-0"
                    style={{ width: imgW, height: imgH }}
                  >
                    <Image
                      src={imgUrl(doctorImg)}
                      alt={doctor.doctorName}
                      width={imgW}
                      height={imgH}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                ) : (
                  <div className="w-24 h-24 rounded-xl bg-muted" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
