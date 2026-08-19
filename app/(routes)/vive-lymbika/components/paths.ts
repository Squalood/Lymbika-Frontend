export type PathKey = "medico" | "estudio" | "medicamento" | "cirugia" | "nose";

export type JourneyStep = {
  title: string;
  description: string;
};

export type JourneyPath = {
  emoji: string;
  label: string;
  hint: string;
  featured?: boolean;
  steps: JourneyStep[];
};

export const PATH_ORDER: PathKey[] = [
  "medico",
  "estudio",
  "medicamento",
  "cirugia",
  "nose",
];

export const PATHS: Record<PathKey, JourneyPath> = {
  medico: {
    emoji: "🩺",
    label: "Consulta médica",
    hint: "Tengo un malestar o una duda de salud",
    steps: [
      {
        title: "Nos dices qué te pasa",
        description:
          "“Me siento mal, pero no sé con qué médico ir.” No importa. Empiezas justo por aquí.",
      },
      {
        title: "Nos contactas",
        description:
          "Nos escribes por WhatsApp o llamas. Del otro lado hay un médico que te escucha, no un robot ni un formulario.",
      },
      {
        title: "Te orientamos",
        description:
          "El médico entiende tu caso y te dice exactamente con qué especialista debes ir.",
      },
      {
        title: "Coordinamos tu cita",
        description:
          "Buscamos al especialista, el horario y el lugar que mejor te queden. Tú no llamas a nadie más.",
      },
      {
        title: "Te atienden",
        description:
          "Llegas a tu consulta con todo listo. Solo te concentras en tu salud.",
      },
      {
        title: "Te damos seguimiento",
        description:
          "Después de la consulta seguimos contigo: estudios, medicamentos o el siguiente paso.",
      },
    ],
  },
  estudio: {
    emoji: "🔬",
    label: "Estudios",
    hint: "Me pidieron análisis o imagen",
    steps: [
      {
        title: "Nos dices qué necesitas",
        description:
          "Te pidieron un análisis o una imagen y no sabes por dónde empezar.",
      },
      {
        title: "Nos contactas",
        description:
          "Nos compartes la orden por WhatsApp. Un médico confirma qué estudio necesitas de verdad.",
      },
      {
        title: "Te orientamos",
        description:
          "Identificamos el estudio correcto y el mejor lugar para hacértelo.",
      },
      {
        title: "Coordinamos todo",
        description: "Agendamos el laboratorio o la imagen por ti. Tú solo llegas.",
      },
      {
        title: "Te realizas el estudio",
        description: "Sin filas confusas ni vueltas de más. Todo queda listo.",
      },
      {
        title: "Te damos seguimiento",
        description:
          "Un médico revisa tus resultados contigo y te dice con claridad qué sigue.",
      },
    ],
  },
  medicamento: {
    emoji: "💊",
    label: "Medicamentos",
    hint: "Tengo una receta o un tratamiento que seguir",
    steps: [
      {
        title: "Nos dices qué necesitas",
        description:
          "Tienes una receta o un tratamiento que continuar, y quieres que salga a tu alcance.",
      },
      {
        title: "Nos contactas",
        description:
          "Nos mandas la foto de tu receta por WhatsApp. Un médico revisa que sea lo correcto para ti.",
      },
      {
        title: "Te orientamos",
        description:
          "Confirmamos tu medicamento y te lo conseguimos a precio de proveedor.",
      },
      {
        title: "Coordinamos la entrega",
        description:
          "Te decimos dónde y cuándo recogerlo, de la forma más sencilla para ti.",
      },
      {
        title: "Recibes tu medicamento",
        description:
          "Con la tranquilidad de que es el correcto y a un precio justo.",
      },
      {
        title: "Te damos seguimiento",
        description:
          "Cuando toque resurtir tu tratamiento, aquí seguimos para ti.",
      },
    ],
  },
  cirugia: {
    emoji: "🏥",
    label: "Cirugías",
    hint: "Tengo un diagnóstico o me indicaron operarme",
    steps: [
      {
        title: "Nos dices tu caso",
        description:
          "“Me dijeron que necesito una cirugía.” Aquí empieza el acompañamiento, con calma y sin presión.",
      },
      {
        title: "Nos contactas",
        description:
          "Nos escribes por WhatsApp. Un médico revisa tu caso desde el primer mensaje.",
      },
      {
        title: "Te orientamos",
        description:
          "Un médico te explica con claridad qué procede y resuelve tus dudas antes de decidir.",
      },
      {
        title: "Coordinamos todo",
        description:
          "Hospital, especialista, fechas y un presupuesto claro. Sin letras chiquitas ni sorpresas.",
      },
      {
        title: "Te operas acompañado",
        description:
          "Llegas con todo listo y con alguien pendiente de ti en cada momento.",
      },
      {
        title: "Te damos seguimiento",
        description:
          "Tu recuperación también nos importa: controles y apoyo después de la cirugía.",
      },
    ],
  },
  nose: {
    emoji: "🤔",
    label: "No sé qué necesito",
    hint: "Solo sé que algo no está bien. Está bien no saber.",
    featured: true,
    steps: [
      {
        title: "Solo nos dices cómo te sientes",
        description:
          "No necesitas saber qué médico, qué estudio ni cómo se llama. Está bien no saber.",
      },
      {
        title: "Nos contactas",
        description:
          "Nos escribes con tus propias palabras. Del otro lado hay un médico que entiende el resto.",
      },
      {
        title: "Te escuchamos",
        description:
          "El médico te hace las preguntas correctas para entender qué necesitas de verdad.",
      },
      {
        title: "Encontramos el camino",
        description:
          "Te decimos con claridad qué sigue: una consulta, un estudio, un medicamento o una cirugía.",
      },
      {
        title: "Coordinamos por ti",
        description:
          "Armamos todo el proceso para que tú solo tengas que llegar.",
      },
      {
        title: "Te acompañamos hasta el final",
        description:
          "No te soltamos a la mitad. Seguimos contigo hasta resolverlo.",
      },
    ],
  },
};
