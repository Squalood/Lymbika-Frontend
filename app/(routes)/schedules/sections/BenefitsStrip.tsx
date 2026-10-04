const ITEMS = ["Consulta médica", "Medicamentos", "Estudios", "Especialistas", "Seguimiento"];

export function BenefitsStrip() {
  return (
    <nav aria-label="Qué puedes resolver en Farmacia+" className="border-b border-border">
      <ul className="mx-auto flex max-w-6xl flex-wrap gap-x-5 gap-y-2 px-5 py-4 text-sm font-medium text-primary md:justify-between md:px-8 md:text-base">
        {ITEMS.map((item, i) => (
          <li key={item} className={`flex items-center gap-2 whitespace-nowrap ${i === 0 ? "font-bold" : ""}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${i === 0 ? "bg-green-500" : "bg-primary/60"}`} aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </nav>
  );
}
