"use client";

import { useGetMembership } from "@/api/getMembership";
import { useGetPageHero } from "@/api/getPageHeroBySlug";
import PlansMemberPageAlt from "./plansAlt";
import PlansSkeleton from "@/components/skeleton/plansSkeleton";

const SLUG = "lymbika-membership";

const PlanSectionAlt = () => {
  const { loading, Memberships, error } = useGetMembership();
  const { hero, loading: heroLoading, error: heroError } = useGetPageHero(SLUG);

  const pageHero = hero?.[0]?.hero;

  if (loading || heroLoading) return <PlansSkeleton />;
  if (error || heroError) return <p className="text-center text-red-500">{error || heroError}</p>;

  return (
    <PlansMemberPageAlt
      plans={Memberships}
      title={pageHero?.title}
      description={pageHero?.description}
    />
  );
}

export default PlanSectionAlt;
