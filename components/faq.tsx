import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FaqType } from "@/types/faq";

type FaqProps = {
  faqGroup: FaqType;
  /** Por defecto, el título del faq-group. */
  title?: string;
  /** Por defecto, la descripción del faq-group. */
  description?: string;
};

/**
 * FAQ de diseño simple: título centrado y acordeón. Lo usan la home y
 * /membership. Para el diseño de tarjeta (encabezado oscuro y preguntas
 * numeradas) está FaqCard.
 *
 * Es server component: las preguntas salen en el HTML y Google las lee.
 */
const Faq = ({ faqGroup, title, description }: FaqProps) => {
  const preguntas = faqGroup.faq ?? [];
  if (preguntas.length === 0) return null;

  const encabezado = title ?? faqGroup.title;
  const descripcion = description ?? faqGroup.descripction;

  return (
    <section className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
      {(encabezado || descripcion) && (
        <div className="flex text-center justify-center items-center gap-4 flex-col px-4">
          {encabezado && (
            <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl text-center font-semibold">
              {encabezado}
            </h2>
          )}
          {descripcion && (
            <p className="text-muted-foreground text-lg max-w-2xl">{descripcion}</p>
          )}
        </div>
      )}
      <div className="w-full py-8 px-4">
        <div className="max-w-3xl w-full mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {preguntas.map((faq) => (
              <AccordionItem key={faq.id} value={`faq-${faq.id}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent className="text-gray-500">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default Faq;
