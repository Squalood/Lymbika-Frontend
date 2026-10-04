export type CategoryKey =
  | "consulta"
  | "estudios"
  | "especialista"
  | "medicamentos"
  | "segunda_opinion"
  | "cirugia"
  | "familiar"
  | "nose";

type Category = {
  label: string;
  placeholder: string;
};

export const CATEGORIES: Record<CategoryKey, Category> = {
  consulta: {
    label: "Consulta",
    placeholder: "Por ejemplo: tengo tos desde hace una semana y quiero que me revisen.",
  },
  estudios: {
    label: "Estudios",
    placeholder: "Por ejemplo: me pidieron unos análisis y no sé dónde hacerlos.",
  },
  especialista: {
    label: "Especialista",
    placeholder: "Por ejemplo: me duele la rodilla al caminar desde hace dos semanas.",
  },
  medicamentos: {
    label: "Medicamentos",
    placeholder: "Por ejemplo: necesito surtir esta receta o no la entiendo.",
  },
  segunda_opinion: {
    label: "Segunda opinión",
    placeholder: "Por ejemplo: me recomendaron operarme y quiero otra opinión.",
  },
  cirugia: {
    label: "Cirugía",
    placeholder: "Por ejemplo: me dijeron que necesito operarme de la vesícula.",
  },
  familiar: {
    label: "Ayudar a un familiar",
    placeholder:
      "Por ejemplo: a mi mamá le duele la cadera y le dijeron que quizá necesita cirugía.",
  },
  nose: {
    label: "No sé qué necesito",
    placeholder: "Cuéntanos con tus palabras qué sientes o qué te dijeron.",
  },
};

/** Accesos rápidos del inicio; "No sé qué necesito" va aparte. */
export const QUICK_CATEGORIES: CategoryKey[] = [
  "consulta",
  "estudios",
  "especialista",
  "medicamentos",
  "segunda_opinion",
  "cirugia",
  "familiar",
];

export const FAMILY_OPTIONS = ["Para mí", "Mamá", "Papá", "Pareja", "Hijo/a", "Otro"];
