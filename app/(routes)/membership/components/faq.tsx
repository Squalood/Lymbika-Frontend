import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import es from "@/locals/es.json";

const Faq = () => {
    return (
        <div className="w-full py-12 px-8">
            <div className="container mx-auto">
                <div className="flex flex-col gap-10">
                    <div className="flex text-center justify-center items-center gap-4 flex-col">
                        <div className="flex gap-2 flex-col">
                            <h4 className="text-3xl md:text-5xl tracking-tighter max-w-xl text-center font-regular">
                                FAQ
                            </h4>
                        </div>
                    </div>

                    <div className="max-w-3xl w-full mx-auto">
                        <Accordion type="single" collapsible className="w-full">
                            {es.faq.map((item, index) => (
                                <AccordionItem key={index} value={`index-${index}`}>
                                    <AccordionTrigger>
                                        {item.question}
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        {item.answer}
                                    </AccordionContent>
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
