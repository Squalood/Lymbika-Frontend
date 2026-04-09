import { UserPlus, Settings, Bot, LineChart, LucideIcon } from "lucide-react";
import { LandingPageJson } from "@/types/landingPageJson";

const iconMap: Record<string, LucideIcon> = { UserPlus, Settings, Bot, LineChart };

type Props = { data?: LandingPageJson["doctoresSection4"] };

const Section4 = ({ data }: Props) => {
  if (!data) return null;
  const { badge, title, steps, testimonial } = data;

  return (
    <section className="w-full py-12 px-4 md:px-8 max-w-6xl mx-auto space-y-8">
      <div className="space-y-3">
        {badge && <span className="text-xs font-bold tracking-widest uppercase text-primary">{badge}</span>}
        {title && <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-snug">{title}</h2>}
      </div>

      {steps && steps.length > 0 && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, i) => {
            const Icon = iconMap[step.icon];
            return (
              <div key={i} className="rounded-xl border bg-card p-5 space-y-4 flex flex-col items-center text-center">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold shrink-0">
                  {i + 1}
                </div>
                {Icon && <Icon className="w-5 h-5 text-muted-foreground" />}
                <div className="space-y-1">
                  <h3 className="font-bold text-foreground text-sm">{step.title}</h3>
                  <p className="text-xs text-primary/80 leading-relaxed">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {testimonial && (
        <div className="border-l-4 border-primary bg-primary/5 rounded-r-xl px-6 py-5 space-y-3">
          <p className="text-sm md:text-base text-foreground leading-relaxed italic">
            "{testimonial.quote}"
          </p>
          <p className="text-sm text-primary font-medium">{testimonial.author}</p>
        </div>
      )}
    </section>
  );
};

export default Section4;
