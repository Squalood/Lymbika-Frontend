import { MembershipType } from "@/types/membership";
import { FaqType } from "@/types/faq";
import { PageType } from "@/types/pages";
import PlansMemberPage from "./components/plans";
import FaqComponent from "@/components/faq";

const BASE = process.env.NEXT_PUBLIC_BACKEND_URL;
const SLUG = "lymbika-membership";

async function getMembershipData() {
  const [membershipsRes, heroRes, faqRes] = await Promise.all([
    fetch(`${BASE}/api/memberships?populate=*`, { next: { revalidate: 3600 } }),
    fetch(
      `${BASE}/api/pages?filters[slug][$eq]=${SLUG}&populate[hero][populate]=image&populate[badge]=*`,
      { next: { revalidate: 3600 } }
    ),
    fetch(`${BASE}/api/faq-groups?populate=*`, { next: { revalidate: 3600 } }),
  ]);

  const [membershipsJson, heroJson, faqJson] = await Promise.all([
    membershipsRes.json(),
    heroRes.json(),
    faqRes.json(),
  ]);

  const memberships: MembershipType[] = Array.isArray(membershipsJson.data)
    ? membershipsJson.data
        .map((item: any) => ({ ...item, order: item.order ?? 0, featured: item.featured ?? false }))
        .sort((a: any, b: any) => a.order - b.order || a.id - b.id)
    : [];

  const heroPage: PageType | null = heroJson.data?.[0] ?? null;
  const faqGroups: FaqType[] = Array.isArray(faqJson.data) ? faqJson.data : [];

  return { memberships, heroPage, faqGroups };
}

export default async function Page() {
  const { memberships, heroPage, faqGroups } = await getMembershipData();

  const pageHero = heroPage?.hero;
  const badge = heroPage?.badge?.[0];
  const membershipFaqGroup = faqGroups.find((g) => g.slug === "memberships");

  return (
    <div>
      <PlansMemberPage
        plans={memberships}
        title={pageHero?.title}
        description={pageHero?.description}
        badge={badge ? { boldText: badge.boldText, text: badge.text, tag: badge.tag } : undefined}
      />
      {membershipFaqGroup && (
        <div className="w-full py-8 px-4">
          <div className="container mx-auto">
            <div className="flex flex-col">
              <div className="flex text-center justify-center items-center gap-4 flex-col">
                <h4 className="text-3xl md:text-5xl tracking-tighter max-w-xl text-center font-semibold">
                  {membershipFaqGroup.title}
                </h4>
                <p className="text-muted-foreground text-lg max-w-2xl">
                  {membershipFaqGroup.descripction}
                </p>
              </div>
              <div className="w-full mx-auto">
                <FaqComponent faqGroup={membershipFaqGroup} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
