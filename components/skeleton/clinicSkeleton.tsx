"use client"

import { Skeleton } from "@/components/ui/skeleton"

export default function ClinicSkeleton() {
  return (
    <div className="space-y-16 mx-4 sm:mx-0">
      {/* Hero Section */}
      <section className="bg-accent/30 py-16">
        <div className="container-xl space-y-4">
          <Skeleton className="h-10 w-1/2" />
          <Skeleton className="h-6 w-2/3" />
          <Skeleton className="h-[300px] w-full rounded-xl" />
        </div>
      </section>

      {/* Servicios */}
      <section className="max-w-4xl space-y-6 mx-auto">
        <Skeleton className="h-8 w-1/3" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-[200px] w-full rounded-lg" />
          ))}
        </div>
      </section>

      {/* Why Us */}
      <section className="bg-muted py-16 max-w-4xl mx-auto">
        <div className="container-xl space-y-6">
          <Skeleton className="h-8 w-1/3 mx-auto" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-[150px] w-full rounded-lg" />
            ))}
          </div>
        </div>
      </section>

      {/* Doctor */}
      <section className="max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-6 items-center mx-auto">
        <Skeleton className="h-[400px] w-full rounded-xl" />
        <div className="space-y-4">
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-32 w-full rounded-md" />
        </div>
      </section>

      {/* Testimonios */}
      <section className="bg-muted py-16 max-w-4xl mx-auto">
        <div className="container-xl space-y-6">
          <Skeleton className="h-8 w-1/3 mx-auto" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-[180px] w-full rounded-lg" />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}