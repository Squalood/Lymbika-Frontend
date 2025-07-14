import { FaqType } from "@/types/faq";
import es from "@/locals/es.json";
import FaqComponent from "@/components/faq";

interface FaqProps {
  faqGroup: FaqType;
}

const Faq = ({ faqGroup }: FaqProps) => {

  return (
    <div className="w-full py-8 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col">
          <div className="flex text-center justify-center items-center gap-4 flex-col">
              <h4 className="text-3xl md:text-5xl tracking-tighter max-w-xl text-center font-semibold">
                {es.faq.title}
              </h4>
              <p className="text-muted-foreground text-lg max-w-2xl">
                {es.faq.descripction}
              </p>
          </div>

          <div className="w-full mx-auto">
            {faqGroup ? (
            <FaqComponent faqGroup={faqGroup} />
            ) : (
                <div className="flex justify-center py-20">
                <p>No se encontraron preguntas frecuentes para este grupo.</p>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;