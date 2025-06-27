"use client";

import { useGetMembership } from "@/api/getMembership";
import PlansMemberPage from "./plans";

const PlanSection = () => {
    const { loading, Memberships, error } = useGetMembership();

  if (loading) return loading;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return <PlansMemberPage plans={Memberships} />;
}
 
export default PlanSection;