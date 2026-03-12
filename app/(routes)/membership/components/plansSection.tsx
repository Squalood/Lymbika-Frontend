"use client";

import { useGetMembership } from "@/api/getMembership";
import { useGetPageHero } from "@/api/getPageHeroBySlug";
import PlansMemberPage from "./plans";
import PlansSkeleton from "@/components/skeleton/plansSkeleton";

const SLUG = "lymbika-membership";

const PlanSection = () => {
  const { loading, Memberships, error } = useGetMembership();
  const { hero, loading: heroLoading, error: heroError } = useGetPageHero(SLUG);

  const pageHero = hero?.[0]?.hero;

  if (loading || heroLoading) return <PlansSkeleton />;
  if (error || heroError) return <p className="text-center text-red-500">{error || heroError}</p>;

  return (
    <PlansMemberPage
      plans={Memberships}
      title={pageHero?.title}
      description={pageHero?.description}
    />
  );
}
 
export default PlanSection;