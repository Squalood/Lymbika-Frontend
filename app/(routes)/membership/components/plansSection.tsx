"use client";

import { useGetMembership } from "@/api/getMembership";
import PlansMemberPage from "./plans";
import PlansSkeleton from "@/components/skeleton/plansSkeleton";

const PlanSection = () => {
    const { loading, Memberships, error } = useGetMembership();

  if (loading) return <PlansSkeleton />;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return <PlansMemberPage plans={Memberships} />;
}
 
export default PlanSection;