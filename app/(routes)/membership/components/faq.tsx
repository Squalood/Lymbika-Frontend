import es from "@/locals/es.json";
import FaqComponent from "@/components/faq";
import { useGetFaqGroups } from "@/api/getFaqGroups";
import FaqSkeleton from "@/components/skeleton/faqSkeleton";


const Faq = () => {
  const { loading, faqGroups, error } = useGetFaqGroups();

  if (loading) {
    return <FaqSkeleton items={14} />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  const membershipFaqGroup = faqGroups.find((group) => group.slug === "memberships");


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
            {membershipFaqGroup ? (
            <FaqComponent faqGroup={membershipFaqGroup} />
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