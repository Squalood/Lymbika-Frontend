import Image from "next/image";
import { MoveRight } from "lucide-react";
import { MedicalServiceType } from "@/types/medicalService";
import { Button } from "@/components/ui/button";
import { urlPoster, imgUrl } from "@/lib/media";

export default function Hero({ service }: { service: MedicalServiceType }) {
  const hero = service.landingHero;
  const t = service.landingTexts;

  return (
    <section
      className="relative w-full flex items-center justify-center overflow-hidden"
      style={{ height: "100vh", minHeight: 700 }}
    >
      {hero?.hero_video?.url ? (
        <video
          className="absolute inset-0 w-full h-full object-cover object-top"
          src={imgUrl(hero.hero_video.url)}
          poster={urlPoster(imgUrl(hero.hero_video.url))}
          autoPlay muted loop playsInline preload="metadata"
        />
      ) : hero?.hero_image?.url ? (
        <Image
          src={imgUrl(hero.hero_image.url)}
          alt={service.name}
          fill sizes="100vw" className="object-cover object-top" priority
        />
      ) : (
        <div className="absolute inset-0 bg-gray-900" />
      )}

      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(160deg, rgba(13,13,12,0.62) 0%, rgba(13,13,12,0.38) 50%, rgba(13,13,12,0.55) 100%)" }}
      />

      <div className="relative z-10 text-center max-w-3xl px-6">
        {hero?.eyebrow && (
          <div className="inline-flex items-center gap-2 mb-7 px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase text-white/85 border border-white/20 bg-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />
            {hero.eyebrow}
          </div>
        )}

        <h1
          className="font-extrabold text-white leading-none tracking-tight mb-5"
          style={{ fontSize: "clamp(42px, 7vw, 80px)", letterSpacing: "-0.03em" }}
        >
          {service.name}
        </h1>

        {hero?.subtitle && (
          <p className="text-white/75 leading-relaxed mx-auto mb-9"
            style={{ fontSize: "clamp(15px, 1.8vw, 18px)", maxWidth: 520 }}
          >
            {hero.subtitle}
          </p>
        )}

        {hero?.price_display && (
          <div className="inline-flex items-baseline gap-2 mb-9 px-7 py-3.5 rounded-2xl border border-white/20 bg-white/10">
            <span className="text-3xl font-extrabold text-white tracking-tight">{hero.price_display}</span>
            <span className="text-xs font-semibold text-white/65 tracking-widest uppercase self-center">{t?.hero_price_label ?? "Todo incluido"}</span>
          </div>
        )}

        <div className="flex gap-3 justify-center flex-wrap mb-10">
          <Button asChild className="rounded-full px-8 gap-2">
            <a href="#package">{t?.hero_primary_button ?? "Ver los paquetes"} <MoveRight className="w-4 h-4" /></a>
          </Button>
          <Button asChild variant="outline" className="rounded-full px-8 border-white/35 text-white hover:bg-white/10 hover:text-white bg-transparent backdrop-blur-sm">
            <a href="#beneficios">{t?.hero_secondary_button ?? "Conocer más"}</a>
          </Button>
        </div>

        {hero?.trust_pills && hero.trust_pills.length > 0 && (
          <div className="flex gap-2 justify-center flex-wrap">
            {hero.trust_pills.map((pill, i) => (
              <span key={i} className="text-xs text-white/60 bg-white/8 border border-white/12 px-3 py-1 rounded-full">
                {pill.text}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 animate-bounce">
        <span className="text-[11px] text-white/40 tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8" style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)" }} />
      </div>
    </section>
  );
}
