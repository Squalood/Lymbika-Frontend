"use client"

import { useGetFaqGroups } from "@/api/getFaqGroups";
import FaqComponent from "@/components/faq";

const SurgeryFaq = () => {
    const { loading, faqGroups, error } = useGetFaqGroups();
    
      if (loading) {
        return (
          <div className="flex justify-center items-center min-h-screen">
            <p>Cargando...</p>
          </div>
        );
      }
    
      if (error) {
        return (
          <div className="flex justify-center items-center min-h-screen">
            <p className="text-red-500">{error}</p>
          </div>
        );
      }

    const Faq = faqGroups.find((group) => group.slug === "cirugias");

    return(  
        <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
            {Faq ? (
            <FaqComponent faqGroup={Faq} />
            ) : (
                <div className="flex justify-center py-20">
                <p>No se encontraron preguntas frecuentes para este grupo.</p>
                </div>
            )}
        </div>
    );
}
 
export default SurgeryFaq;