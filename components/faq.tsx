import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FaqType } from "@/types/faq";

interface FaqProps {
  faqGroup: FaqType;
}

const FaqComponent = ({ faqGroup }: FaqProps) => {
    return ( 
        <div className="w-full py-8 px-4">
            <div className="container mx-auto">
                <div className="flex flex-col gap-10">
                    <div className="max-w-3xl w-full mx-auto">
                        <Accordion type="single" collapsible className="w-full">
                        {faqGroup.faq.map((faq) => ( 
                            <AccordionItem key={faq.id} value={`faq-${faq.id}`}>
                            <AccordionTrigger>{faq.question}</AccordionTrigger>
                            <AccordionContent className="text-gray-500">{faq.answer}</AccordionContent>
                            </AccordionItem>
                        ))}
                        </Accordion>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default FaqComponent;