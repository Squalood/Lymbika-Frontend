import { MedicalServiceType } from "@/types/medicalService";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Faq({ service }: { service: MedicalServiceType }) {
  const faqGroup = service.faq_group ?? null;
  const t = service.landingTexts;
  if (!faqGroup || faqGroup.faq.length === 0) return null;

  return (
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
  );
}
