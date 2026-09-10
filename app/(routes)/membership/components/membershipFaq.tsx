import FaqComponent from "@/components/faq";
import { FaqType } from "@/types/faq";

/** El título y la descripción salen del propio faq-group, no de la página. */
const MembershipFaq = ({ faqGroup }: { faqGroup: FaqType }) => {
  return (
    <div className="w-full py-8 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col">
          <div className="flex text-center justify-center items-center gap-4 flex-col">
            <h4 className="text-3xl md:text-5xl tracking-tighter max-w-xl text-center font-semibold">
              {faqGroup.title}
            </h4>
            <p className="text-muted-foreground text-lg max-w-2xl">
              {faqGroup.descripction}
            </p>
          </div>
          <div className="w-full mx-auto">
            <FaqComponent faqGroup={faqGroup} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipFaq;
