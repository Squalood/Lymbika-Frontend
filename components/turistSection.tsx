import YoutubeEmbed from "./YoutubeEmbed";

interface TuristSectionProps {
    label?: string;
    title?: string;
    videoId?: string;
    videoLabel?: string;
    quote?: string;
    description?: string;
    ceoName?: string;
    ceoRole?: string;
    ctaText?: string;
    ctaHref?: string;
}

const TuristSection = ({
    label = "¿Vienes de EE.UU. o del extranjero?",
    title,
    videoId,
    videoLabel = "Lymbika — Acerca de nosotros",
    quote = "Atención médica de clase mundial en Juárez, coordinada para ti desde el primer día",
    description = "Lymbika nació para resolver lo que el sistema de salud tradicional no puede: encontrar al especialista correcto, al precio correcto, en el hospital correcto — sin que tú tengas que hacer el trabajo de coordinación.",
    ceoName = "Dr. Gabriel Omar Parra Pizarro",
    ceoRole = "Director General & CEO · Lymbika Healthcare",
    ctaText = "📅 Agendar desde El Paso →",
    ctaHref = "https://wa.me/526561100446",
}: TuristSectionProps) => {
    if (!title || !videoId) return null;

    return (
        <section className="max-w-6xl mx-auto px-6 py-16 mb-8">
            {/* Header */}
            <div className="mb-10">
                <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-2">
                    {label}
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                    {title}
                </h2>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                {/* Video column */}
                <div className="flex flex-col gap-2">
                    <YoutubeEmbed videoId={videoId} />
                    <p className="text-center text-sm text-gray-500 mt-1">{videoLabel}</p>
                </div>

                {/* Info column */}
                <div className="flex flex-col gap-6">
                    <blockquote className="text-xl font-medium italic text-gray-800 border-l-4 border-primary pl-5">
                        "{quote}"
                    </blockquote>

                    <p className="text-gray-600 leading-relaxed">
                        {description}
                    </p>

                    {/* CEO Profile */}
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-2xl shrink-0">
                            👨‍⚕️
                        </div>
                        <div>
                            <p className="font-semibold text-gray-900">{ceoName}</p>
                            <p className="text-sm text-gray-500">{ceoRole}</p>
                        </div>
                    </div>

                    <a
                        href={ctaHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block w-fit bg-primary hover:bg-blue-700 transition-colors text-white text-sm font-medium py-3 px-6 rounded-lg"
                    >
                        {ctaText}
                    </a>
                </div>
            </div>
        </section>
    );
};

export default TuristSection;
