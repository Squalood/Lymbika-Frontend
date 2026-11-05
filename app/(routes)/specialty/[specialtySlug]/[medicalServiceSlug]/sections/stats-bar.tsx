import { MedicalServiceType } from "@/types/medical-service";

export default function StatsBar({ service }: { service: MedicalServiceType }) {
  const stats = service.landingStat ?? [];
  if (stats.length === 0) return null;

  return (
    <div className="bg-[#0b1630] py-10 px-10">
      <div
        className="max-w-4xl mx-auto grid gap-px"
        style={{ gridTemplateColumns: `repeat(${stats.length}, 1fr)` }}
      >
        {stats.map((stat, i) => (
          <div
            key={i}
            className="text-center px-6 py-2"
            style={{ borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.15)" : "none" }}
          >
            <div className="text-3xl font-extrabold text-white leading-none mb-1.5" style={{ letterSpacing: "-0.04em" }}>
              {stat.number}
            </div>
            <div className="text-xs text-white/65 leading-snug">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
