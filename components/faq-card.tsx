import { TriangleAlert } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { FaqType } from "@/types/faq";

type FaqCardProps = {
  faqGroup: FaqType;
  /** Texto pequeño en mayúsculas sobre el título. */
  label?: string | null;
  title?: string | null;
  description?: string | null;
  /** Encabezado oscuro de la tarjeta; sin título ni subtítulo no se pinta. */
  cardTitle?: string | null;
  cardSubtitle?: string | null;
  /** Aviso ámbar al pie de la tarjeta. */
  notice?: string | null;
  align?: "center" | "left";
};

/**
 * FAQ de diseño tarjeta: encabezado oscuro y preguntas numeradas en acordeón.
 * Lo usan la landing de servicio médico y /healthHubs. Para el diseño simple
 * está Faq. Cada página decide qué textos pasa: no se rellenan solos con los
 * del faq-group.
 */
export default function FaqCard({
  faqGroup,
  label,
  title,
  description,
  cardTitle,
  cardSubtitle,
  notice,
  align = "center",
}: FaqCardProps) {
  const preguntas = faqGroup.faq ?? [];
  if (preguntas.length === 0) return null;

  return (
    <section className="w-full py-4 px-4 md:px-8 max-w-6xl mx-auto space-y-6">
      {(label || title || description) && (
        <div className={cn("space-y-3", align === "center" && "text-center")}>
          {label && (
            <span className="text-xs font-bold tracking-widest uppercase text-primary">{label}</span>
          )}
          {title && (
            <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-snug">{title}</h2>
          )}
          {description && (
            <p
              className={cn(
                "text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl",
                align === "center" && "mx-auto"
              )}
            >
              {description}
            </p>
          )}
        </div>
      )}

      <div className="rounded-2xl border overflow-hidden">
        {(cardTitle || cardSubtitle) && (
          <div className="bg-[#0b1630] px-6 py-5">
            {cardTitle && <h3 className="text-white font-bold text-base">{cardTitle}</h3>}
            {cardSubtitle && <p className="text-white/60 text-sm mt-1">{cardSubtitle}</p>}
          </div>
        )}
        <Accordion type="single" collapsible className="bg-card divide-y">
          {preguntas.map((item, i) => (
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

        {notice && (
          <div className="px-6 py-4 bg-amber-50 border-t border-amber-100 flex gap-3 items-start">
            <TriangleAlert className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-700 leading-relaxed">{notice}</p>
          </div>
        )}
      </div>
    </section>
  );
}
