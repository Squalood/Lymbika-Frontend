"use client"

import { useGetFaqGroups } from "@/api/getFaqGroups";
import FaqComponent from "@/components/faq";
import FaqSkeleton from "@/components/skeleton/faqSkeleton";
import { FaqType } from "@/types/faq";

type SurgeryFaqProps = {
  title?: string
  faqGroup?: FaqType | null
}

const SurgeryFaq = ({ title, faqGroup: faqGroupProp }: SurgeryFaqProps) => {
    const { loading, faqGroups, error } = useGetFaqGroups();

    const resolvedGroup: FaqType | undefined =
      faqGroupProp ?? faqGroups.find((g) => g.slug === "cirugias");

    if (!faqGroupProp && loading) return <FaqSkeleton items={9} />;

    if (!faqGroupProp && error) return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );

    return (
        <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
            <div className="flex text-center justify-center items-center gap-4 flex-col">
              <h4 className="text-3xl md:text-5xl tracking-tighter max-w-xl text-center font-semibold">
                  {title ?? "FAQ"} {resolvedGroup?.title}
              </h4>
            </div>
            {resolvedGroup ? (
              <FaqComponent faqGroup={resolvedGroup} />
            ) : (
              <div className="flex justify-center py-20">
                <p>No se encontraron preguntas frecuentes para este grupo.</p>
              </div>
            )}
        </div>
    );
}

export default SurgeryFaq;
