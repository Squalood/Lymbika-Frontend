"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function AboutSkeleton() {
  return (
    <div className="space-y-16 mx-4 sm:mx-0">
      {/* Hero Section */}
      <Skeleton className="h-[150px] sm:h-[300px] mt-5 w-full rounded-xl" />

      {/* about body */}
      <div className="max-w-4xl px-6 py-4 lg:px-8 lg:py-4 mx-auto">
        <div className="grid gap-10 mb-8">
            <Skeleton className="h-12 w-1/3" />
            <Skeleton className="h-[200px] w-full rounded-lg" />    
        </div>
        <div className="grid gap-10 mb-8">
            <Skeleton className="h-12 w-1/3" />
            <Skeleton className="h-[200px] w-full rounded-lg" />    
        </div>
        <Skeleton className="h-12 w-1/3 mb-8" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-18">
            {[...Array(6)].map((_, i) => (
                <div className="flex flex-col items-center">
                  <Skeleton key={i} className="w-[100px] h-[100px] rounded-full" />  
                </div>
            ))}
          </div>
      </div>

      {/* LymbikaLocation */}
      <section className="max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-6 items-center mx-auto">
        <div className="space-y-4">
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-32 w-full rounded-md" />
        </div>
        <Skeleton className="h-[400px] w-full rounded-xl" />
      </section>

    </div>
  );
}
