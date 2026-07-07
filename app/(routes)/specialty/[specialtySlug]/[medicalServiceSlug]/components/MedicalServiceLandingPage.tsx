"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Stethoscope, Activity, Heart, Brain, Hospital, Ribbon, Venus, Baby,
  Sparkles, Shell, ClipboardPlus, Syringe, Dumbbell, BriefcaseMedical,
  Ambulance, Bandage, Pill, Percent, CalendarPlus, UserRoundPlus,
  Waypoints, Presentation, ChartNoAxesCombined, Handshake, Globe,
  ScanHeart, HeartPulse, HeartHandshake, Home, Leaf, ShieldCheck,
  UserCheck, PillBottle, ClipboardCheck,
  Check, MoveRight, ArrowRight, LucideIcon,
} from "lucide-react";
import { MedicalServiceType } from "@/types/medicalService";
import { Button } from "@/components/ui/button";
import { ContactButton } from "@/components/contact-button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ICON_MAP: Record<string, LucideIcon> = {
  icon1: Stethoscope, icon2: Heart, icon3: Activity,
  icon4: ClipboardPlus, icon5: Syringe, icon6: BriefcaseMedical,
  Stethoscope, Activity, Heart, "HeartPulse,": HeartPulse, HeartPulse,
  Brain, ScanHeart, Hospital, Ribbon, Venus, Baby, Sparkles, Shell,
  ClipboardPlus, Syringe, Dumbbell, BriefcaseMedical, Ambulance,
  Bandage, Pill, Percent, CalendarPlus, UserRoundPlus, Waypoints,
  Presentation, ChartNoAxesCombined, Handshake, Globe,
  HeartHandshake, Home, Leaf, ShieldCheck, UserCheck, PillBottle, ClipboardCheck,
};

function imgUrl(url: string) {
  if (!url) return "";
  return url.startsWith("http") ? url : `${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`;
}

export default function MedicalServiceLandingPage({
  service,
}: {
  service: MedicalServiceType;
}) {
  const hero = service.landingHero;
  const stats = service.landingStat ?? [];
  const benefits = service.landingBenefit ?? [];
  // const video = service.landing_video_url;
  const gallery = service.landing_gallery ?? [];
  const faqGroup = service.faq_group ?? null;
  const serviceRates = service.service_rates ?? [];
  const t = service.landingTexts;

  return (
    <div className="min-h-screen bg-background">

      {/* ─── HERO ──────────────────────────────────────────────────── */}
      <section
        className="relative w-full flex items-center justify-center overflow-hidden"
        style={{ height: "100vh", minHeight: 700 }}
      >
        {hero?.hero_video?.url ? (
          <video
            className="absolute inset-0 w-full h-full object-cover object-top"
            src={imgUrl(hero.hero_video.url)}
            autoPlay muted loop playsInline
          />
        ) : hero?.hero_image?.url ? (
          <Image
            src={imgUrl(hero.hero_image.url)}
            alt={service.name}
            fill className="object-cover object-top" priority
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
                  {pill}
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

      {/* ─── STATS BAR ─────────────────────────────────────────────── */}
      {stats.length > 0 && (
        <div className="bg-[#0b1630] py-10 px-10">
          <div
            className="max-w-4xl mx-auto grid gap-px"
            style={{ gridTemplateColumns: `repeat(${stats.length}, 1fr)` }}
          >
            {stats.map((stat, i) => (
              <div
                key={i}
                className="text-center px-6 py-2"
                style={{ borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.15)" : "none" }}
              >
                <div className="text-3xl font-extrabold text-white leading-none mb-1.5" style={{ letterSpacing: "-0.04em" }}>
                  {stat.number}
                </div>
                <div className="text-xs text-white/65 leading-snug">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─── VIDEO TESTIMONIAL (desactivado) ──────────────────────── */}
      {/* {video?.videoID && (
        <section className="w-full py-4 px-4 md:px-8 max-w-6xl mx-auto space-y-6">
          <div className="space-y-3 text-center">
            <span className="text-xs font-bold tracking-widest uppercase text-primary">
              {t?.video_label ?? "Testimonios reales"}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-snug">
              {video.title ?? "Resultados reales, pacientes reales"}
            </h2>
          </div>
          <div className="rounded-2xl overflow-hidden border aspect-video bg-muted max-w-4xl mx-auto">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${video.videoID}`}
              title={video.title ?? "Testimonio"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </section>
      )} */}

      {/* ─── BENEFITS ──────────────────────────────────────────────── */}
      {benefits.length > 0 && (
        <section id="beneficios" className="w-full py-4 px-4 md:px-8 max-w-6xl mx-auto space-y-8">
          <div className="space-y-3 text-center">
            <span className="text-xs font-bold tracking-widest uppercase text-primary">
              {t?.benefits_label ?? "El procedimiento"}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-snug">
              {t?.benefits_title ?? "Por qué elegir este procedimiento"}
            </h2>
          </div>

          {/* Móvil: carousel */}
          <div className="sm:hidden">
            <Carousel opts={{ align: "center", loop: true }}>
              <CarouselContent className="-ml-3">
                {benefits.map((b, i) => {
                  const Icon = b.icon ? ICON_MAP[b.icon] : null;
                  return (
                    <CarouselItem key={i} className="pl-3 basis-3/4">
                      <div className="rounded-xl border bg-card p-4 space-y-3 h-full">
                        {Icon && (
                          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Icon className="w-4 h-4 text-primary" />
                          </div>
                        )}
                        <h3 className="font-bold text-foreground text-sm">{b.title}</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">{b.description}</p>
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <div className="flex justify-center gap-2 mt-4">
                <CarouselPrevious className="static translate-y-0" />
                <CarouselNext className="static translate-y-0" />
              </div>
            </Carousel>
          </div>

          {/* Desktop: grid */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefits.map((b, i) => {
              const Icon = b.icon ? ICON_MAP[b.icon] : null;
              return (
                <div key={i} className="rounded-xl border bg-card p-6 space-y-4">
                  {Icon && (
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                  )}
                  <h3 className="font-bold text-foreground text-base">{b.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{b.description}</p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ─── PACKAGE ───────────────────────────────────────────────── */}
      {(() => {
        const packageRates = serviceRates.filter((r) => r.package_items && r.package_items.length > 0);
        if (packageRates.length === 0) return null;
        return (
        <section id="package" className="w-full py-4 px-4 md:px-8 max-w-6xl mx-auto space-y-8">
          <div className="space-y-3 text-center">
            <span className="text-xs font-bold tracking-widest uppercase text-primary">
              {t?.package_label_section ?? "Inversión"}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-snug">
              {t?.package_title ?? "Todo incluido, sin sorpresas"}
            </h2>
          </div>

          <div className={`grid grid-cols-1 gap-6 ${packageRates.length > 1 ? "md:grid-cols-2" : "max-w-2xl mx-auto"}`}>
            {packageRates.map((rate, i) => (
              <div key={rate.id ?? i} className="rounded-2xl overflow-hidden border bg-white shadow-sm flex flex-col">
                {/* Header oscuro */}
                <div className="bg-[#0b1630] px-6 pt-6 pb-5 space-y-3">
                  {rate.package_label && (
                    <span className="inline-flex text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full bg-white/20 text-white">
                      {rate.package_label}
                    </span>
                  )}
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {rate.doctor?.doctorName ?? service.name}
                    </h3>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-extrabold text-white">
                      ${rate.price.toLocaleString("es-MX")}
                    </span>
                    <span className="text-sm text-white/60">MXN</span>
                  </div>
                </div>

                {/* Items incluidos */}
                {rate.package_items && rate.package_items.length > 0 && (
                  <div className="flex-1 px-6 py-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                      {rate.package_items.map((item: string, j: number) => (
                        <div key={j} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                          <p className="text-sm text-foreground">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Nota y CTA */}
                <div className="px-6 pb-6 pt-2 space-y-3">
                  {rate.package_note && (
                    <p className="text-xs text-muted-foreground border-t pt-3">{rate.package_note}</p>
                  )}
                  {rate.doctor?.contactButton
                    ? <ContactButton contactButton={rate.doctor.contactButton} className="w-full" />
                    : <Button className="w-full gap-2" asChild><a href="#contacto">{t?.package_cta_button ?? "Agendar valoración"} <MoveRight className="w-4 h-4" /></a></Button>
                  }
                </div>
              </div>
            ))}
          </div>
        </section>
        );
      })()}

      {/* ─── GALLERY ───────────────────────────────────────────────── */}
      {gallery.length > 0 && (
        <section id="resultados" className="w-full py-4 px-4 md:px-8 max-w-6xl mx-auto space-y-8">
          <div className="space-y-3 text-center">
            <span className="text-xs font-bold tracking-widest uppercase text-primary">
              {t?.gallery_label ?? "Resultados"}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-snug">
              {t?.gallery_title ?? "Resultados reales"}
            </h2>
          </div>

          <Carousel opts={{ align: "start", loop: false }} className="w-full">
            <CarouselContent>
              {gallery.map((img, i) => (
                <CarouselItem key={i} className="basis-2/3 md:basis-1/3 lg:basis-1/4">
                  <div className="rounded-xl overflow-hidden border" style={{ aspectRatio: "3/4" }}>
                    <Image
                      src={imgUrl(img.url)}
                      alt={`Resultado ${i + 1}`}
                      width={256}
                      height={340}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-4 bg-white/80 hover:bg-white shadow-md" />
            <CarouselNext className="-right-4 bg-white/80 hover:bg-white shadow-md" />
          </Carousel>
        </section>
      )}

      {/* ─── DOCTOR ────────────────────────────────────────────────── */}
      {serviceRates.some((r) => r.doctor) && (
        <section className="w-full py-4 px-4 md:px-8 max-w-6xl mx-auto space-y-8">
          <div className="space-y-3 text-center">
            <span className="text-xs font-bold tracking-widest uppercase text-primary">
              {serviceRates.length === 1 ? (t?.doctors_label ?? "Tu especialista") : (t?.doctors_label_plural ?? "Nuestros especialistas")}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-snug">
              {serviceRates.length === 1 ? (t?.doctors_title ?? "Conoce a tu especialista") : (t?.doctors_title_plural ?? "Conoce a nuestros especialistas")}
            </h2>
          </div>

          <div className="space-y-6">
            {serviceRates.map((rate, i) => {
              const doctor = rate.doctor;
              if (!doctor) return null;
              const doctorImg = doctor.bannerImage?.url ?? doctor.image?.[0]?.url ?? null;
              return (
                <div key={rate.id ?? i} className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  {/* Izquierda: card del doctor */}
                  <div className="rounded-xl border bg-card p-5 flex flex-col sm:flex-row gap-5 items-start max-h-32 overflow-hidden">
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
                      <div className="w-48 rounded-xl overflow-hidden bg-muted shrink-0">
                        <Image
                          src={imgUrl(doctorImg)}
                          alt={doctor.doctorName}
                          width={96}
                          height={96}
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
      )}

      {/* ─── FAQ ───────────────────────────────────────────────────── */}
      {faqGroup && faqGroup.faq.length > 0 && (
        <section className="w-full py-4 px-4 md:px-8 max-w-6xl mx-auto space-y-6">
          <div className="space-y-3 text-center">
            <span className="text-xs font-bold tracking-widest uppercase text-primary">
              {t?.faq_label ?? "Preguntas frecuentes"}
            </span>
            {faqGroup.title && (
              <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-snug">
                {faqGroup.title}
              </h2>
            )}
            {faqGroup.descripction && (
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl">
                {faqGroup.descripction}
              </p>
            )}
          </div>

          <div className="rounded-2xl border overflow-hidden">
            <div className="bg-[#0b1630] px-6 py-5">
              <h3 className="text-white font-bold text-base">{t?.faq_header_title ?? "Resolvemos tus dudas"}</h3>
              <p className="text-white/60 text-sm mt-1">{t?.faq_header_subtitle ?? "Todo lo que necesitas saber antes de tu consulta"}</p>
            </div>
            <Accordion type="single" collapsible className="bg-card divide-y">
              {faqGroup.faq.map((item, i) => (
                <AccordionItem key={item.id} value={`faq-${item.id}`} className="border-0 px-6">
                  <AccordionTrigger className="flex gap-4 py-5 hover:no-underline text-left">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    <span className="font-semibold text-foreground text-sm flex-1">{item.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="pl-10 pb-5 text-sm text-muted-foreground leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      )}

      {/* ─── CTA ───────────────────────────────────────────────────── */}
      <section id="contacto" className="py-10 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="bg-primary rounded-2xl px-8 py-12 flex flex-col items-center text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            {t?.cta_title ?? "¿Listo para dar el siguiente paso?"}
          </h2>
          <p className="text-white/80 text-sm md:text-base max-w-xl">
            {t?.cta_subtitle ?? "Agenda tu valoración sin compromiso. Un especialista te guiará en cada etapa del proceso."}
          </p>
          {serviceRates[0]?.doctor?.contactButton && (
            <ContactButton
              contactButton={serviceRates[0].doctor.contactButton}
              label={t?.cta_button ?? "Agendar mi valoración"}
              className="bg-white text-primary hover:bg-white/90 font-semibold"
            />
          )}
        </div>
      </section>

    </div>
  );
}
