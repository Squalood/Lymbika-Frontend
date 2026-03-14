"use client";

import { useGetMembership } from "@/api/getMembership";
import { useGetPageHero } from "@/api/getPageHeroBySlug";
import { useGetPage } from "@/api/getPageBySlug";
import PlansMemberPage from "./plans";
import PlansSkeleton from "@/components/skeleton/plansSkeleton";

const SLUG = "lymbika-membership";

const PlanSection = () => {
  const { loading, Memberships, error } = useGetMembership();
  const { hero, loading: heroLoading, error: heroError } = useGetPageHero(SLUG);
  const { page, loading: pageLoading } = useGetPage(SLUG);

  const pageHero = hero?.[0]?.hero;
  const badge = page?.[0]?.badge?.[0];

  if (loading || heroLoading || pageLoading) return <PlansSkeleton />;
  if (error || heroError) return <p className="text-center text-red-500">{error || heroError}</p>;

  return (
    <PlansMemberPage
      plans={Memberships}
      title={pageHero?.title}
      description={pageHero?.description}
      badge={badge ? { boldText: badge.boldText, text: badge.text, tag: badge.tag } : undefined}
    />
  );
}
 
export default PlanSection;