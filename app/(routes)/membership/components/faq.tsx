import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FaqType } from "@/types/faq";
import es from "@/locals/es.json";

interface FaqProps {
  faqGroup: FaqType;
}

const Faq = ({ faqGroup }: FaqProps) => {
  return (
    <div className="w-full py-12">
      <div className="container mx-auto">
        <div className="flex flex-col gap-10">
          <div className="flex text-center justify-center items-center gap-4 flex-col">
              <h4 className="text-3xl md:text-5xl tracking-tighter max-w-xl text-center font-semibold">
                {es.faq.title}
              </h4>
              <p className="text-muted-foreground text-lg max-w-2xl">
                {es.faq.descripction}
              </p>
          </div>

          <div className="max-w-3xl w-full mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqGroup.faq.map((faq) => ( //error en esta linea "Property 'faq' does not exist on type 'FaqType'."
                <AccordionItem key={faq.id} value={`faq-${faq.id}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;