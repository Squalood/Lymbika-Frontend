interface Stat {
  value: string;
  title: string;
  subtitle: string;
}

interface StatsSectionProps {
  stats: Stat[];
}

const StatsSection = ({ stats }: StatsSectionProps) => {
  return (
    <section className="py-16 bg-primary/90 text-primary-foreground">
      <div className="max-w-5xl mx-auto px-6">
        <div className="bg-white text-primary rounded-xl shadow-lg p-8 sm:p-12">
          <h2 className="text-center text-2xl sm:text-3xl font-bold mb-12">
            Resultados Reales, Crecimiento Comprobado
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <h3 className="text-5xl sm:text-6xl font-extrabold text-primary mb-3">
                  {stat.value}
                </h3>
                <p className="text-lg font-semibold mb-1">{stat.title}</p>
                <p className="text-sm text-muted-foreground">
                  {stat.subtitle}
                </p>
              </div>
            ))}
          </div>

          <blockquote className="mt-10 border-l-4 border-blue-300 pl-4 text-sm sm:text-base text-muted-foreground italic">
            "El Dr. José Orlando Guinto Nava, neurocirujano, aumentó su
            práctica de un mes a otro 150% con Lymbika. Una transformación
            real para profesionales comprometidos."
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;