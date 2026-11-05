import PlansMemberPage from "@/components/features/membership/plans";
import { getMemberships, getPage } from "@/lib/strapi/pages";

const SLUG = "lymbika-membership";

/**
 * Planes de membresía de la home y la tienda, con el título, la descripción y
 * el badge de la página "lymbika-membership". Se arma en el servidor: llega
 * pintada, sin skeleton ni pedidos desde el navegador.
 */
export default async function PlanSection() {
  const [plans, page] = await Promise.all([getMemberships(), getPage(SLUG)]);
  if (plans.length === 0) return null;

  const badge = page?.badge?.[0];
  return (
    <PlansMemberPage
      plans={plans}
      title={page?.hero?.title}
      description={page?.hero?.description}
      badge={badge ? { boldText: badge.boldText, text: badge.text, tag: badge.tag } : undefined}
    />
  );
}
