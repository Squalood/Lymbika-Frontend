import { MedicalServiceType } from "@/types/medicalService";
import FaqCard from "@/components/faq-card";

export default function Faq({ service }: { service: MedicalServiceType }) {
  const faqGroup = service.faq_group;
  if (!faqGroup) return null;
  const t = service.landingTexts;

  return (
    <FaqCard
      faqGroup={faqGroup}
      label={t?.faq_label ?? "Preguntas frecuentes"}
      title={faqGroup.title}
      description={faqGroup.descripction}
      cardTitle={t?.faq_header_title ?? "Resolvemos tus dudas"}
      cardSubtitle={t?.faq_header_subtitle ?? "Todo lo que necesitas saber antes de tu consulta"}
    />
  );
}
