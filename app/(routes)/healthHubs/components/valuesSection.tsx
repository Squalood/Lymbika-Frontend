interface Value {
  title: string;
  description: string;
}

interface ValuesSectionProps {
  values: Value[];
}

const ValuesSection = ({ values }: ValuesSectionProps) => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-primary-light w-full">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Un Ecosistema Completo Para Tu Éxito Profesional
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div key={index} className="">
              <div className="text-left pb-4">
                <h2 className="text-2xl font-bold">{value.title}</h2>
              </div>
              <div>
                <p className="text-left text-base leading-relaxed text-muted-foreground">
                  {value.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;