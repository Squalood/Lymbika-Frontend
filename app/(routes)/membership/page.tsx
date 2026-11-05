import { getMembershipPage, getMemberships } from "@/lib/strapi/pages";
import PlansMemberPage from "@/components/features/membership/plans";
import { clean } from "@/lib/utils";
import Faq from "@/components/faq";

export async function generateMetadata() {
  const membershipPage = await getMembershipPage();
  const title = clean(membershipPage?.seoTitle);
  const canonical = { alternates: { canonical: "/membership" } };
  if (!title) return canonical;
  return {
    title,
    description: clean(membershipPage?.seoDescription),
    ...canonical,
  };
}

export default async function Page() {
  const [membershipPage, plans] = await Promise.all([
    getMembershipPage(),
    getMemberships(),
  ]);

  // Si Strapi falla, la página sigue mostrando las cards con los textos por
  // defecto en lugar de romperse.
  const { title, description, badge, texts, faq_group } = membershipPage ?? {};

  // Los planes elegidos a mano en el admin mandan, en el orden en que estén ahí.
  // Sin relación configurada se usan todos los publicados, por campo `order`.
  const selected = membershipPage?.memberships ?? [];
  const plansToRender = selected.length > 0 ? selected : plans;

  return (
    <div>
      <PlansMemberPage
        plans={plansToRender}
        title={clean(title)}
        description={clean(description)}
        badge={
          badge
            ? {
                boldText: clean(badge.boldText) ?? "",
                text: clean(badge.text) ?? "",
                tag: clean(badge.tag),
              }
            : undefined
        }
        togglePersonalLabel={clean(texts?.toggle_personal)}
        toggleFamilyLabel={clean(texts?.toggle_family)}
        featuredLabel={clean(texts?.featured_label)}
        pricePeriod={clean(texts?.price_period)}
      />
      {faq_group && <Faq faqGroup={faq_group} />}
    </div>
  );
}
