import { Megaphone, Settings, LayoutDashboard, ArrowRight, TriangleAlert, LucideIcon } from "lucide-react";
import { LandingPageJson } from "@/types/landingPageJson";

const iconMap: Record<string, LucideIcon> = { Megaphone, Settings, LayoutDashboard };

type Props = { data?: LandingPageJson["doctoresSection3"] };

const Section3 = ({ data }: Props) => {
  if (!data) return null;
  const { badge, title, description, departments, notice } = data;

  return (
    <section className="w-full py-12 px-4 md:px-8 max-w-6xl mx-auto space-y-8">
      <div className="space-y-3">
        {badge && <span className="text-xs font-bold tracking-widest uppercase text-primary">{badge}</span>}
        {title && <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-snug">{title}</h2>}
        {description && <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-3xl">{description}</p>}
      </div>

      {departments && departments.length > 0 && (
        <div className="grid sm:grid-cols-3 gap-4">
          {departments.map((dept, i) => {
            const Icon = iconMap[dept.icon];
            return (
              <div key={i} className="rounded-xl border bg-card p-6 space-y-4">
                {Icon && (
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                )}
                <h3 className="font-bold text-foreground text-base">{dept.name}</h3>
                <ul className="space-y-2">
                  {dept.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <ArrowRight className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      )}

      {notice && (
        <div className="flex gap-3 rounded-xl border border-primary/20 bg-primary/5 px-5 py-4">
          <TriangleAlert className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Tu parte en el sistema:</strong>{" "}
            {notice.replace("Tu parte en el sistema: ", "")}
          </p>
        </div>
      )}
    </section>
  );
};

export default Section3;
