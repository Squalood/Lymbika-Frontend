"use client";

import { TriangleAlert } from "lucide-react";
import { useGetFaqGroups } from "@/api/getFaqGroups";
import { LandingPageJson } from "@/types/landingPageJson";

type Props = { data?: LandingPageJson["doctoresFaqSection"] };

const FaqSection = ({ data }: Props) => {
  const { faqGroups, loading } = useGetFaqGroups();

  const group = faqGroups.find((g) => g.slug === "plan-doctores");
  const questions = group?.faq ?? [];

  return (
    <section className="w-full py-12 px-4 md:px-8 max-w-6xl mx-auto space-y-6">
      <div className="space-y-3">
        {data?.badge && (
          <span className="text-xs font-bold tracking-widest uppercase text-primary">{data.badge}</span>
        )}
        {data?.title && (
          <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-snug">{data.title}</h2>
        )}
      </div>

      <div className="rounded-2xl border overflow-hidden">
        <div className="bg-[#0b1630] px-6 py-5">
          {data?.cardTitle && <h3 className="text-white font-bold text-base">{data.cardTitle}</h3>}
          {data?.cardSubtitle && <p className="text-white/60 text-sm mt-1">{data.cardSubtitle}</p>}
        </div>

        <div className="divide-y bg-card">
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex gap-4 px-6 py-5 animate-pulse">
                <div className="w-6 h-6 rounded-full bg-muted shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 bg-muted rounded w-3/4" />
                  <div className="h-3 bg-muted rounded w-full" />
                </div>
              </div>
            ))
          ) : (
            questions.map((item, i) => (
              <div key={item.id} className="flex gap-4 px-6 py-5">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <div className="space-y-1">
                  <p className="font-semibold text-foreground text-sm">{item.question}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {data?.notice && (
          <div className="px-6 py-4 bg-amber-50 border-t border-amber-100 flex gap-3 items-start">
            <TriangleAlert className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-700 leading-relaxed">{data.notice}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FaqSection;
