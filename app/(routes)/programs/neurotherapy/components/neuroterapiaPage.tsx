import { Button } from "@/components/ui/button";
import Image from "next/image";
import es from "@/locals/es.json";
import { MoveRight } from "lucide-react";

const services = [
    {
    title: es.NeuroterapiaPage.section3.item1.title,
    image: "/images/neuro-4.jpg",
    alt: es.NeuroterapiaPage.section3.item1.title,
    description: es.NeuroterapiaPage.section3.item1.description,
    },
    {
    title: es.NeuroterapiaPage.section3.item2.title,
    image: "/images/neuro-5.jpg",
    alt: es.NeuroterapiaPage.section3.item2.title,
    description: es.NeuroterapiaPage.section3.item3.description,
    },
    {
    title: es.NeuroterapiaPage.section3.item3.title,
    image: "/images/neuro-6.jpg",
    alt: es.NeuroterapiaPage.section3.item3.title,
    description: es.NeuroterapiaPage.section3.item3.description,
    },
];

const science = [
    {
    title: es.NeuroterapiaPage.section4.item1.title,
    description: es.NeuroterapiaPage.section4.item1.description,
    },
    {
    title: es.NeuroterapiaPage.section4.item2.title,
    description: es.NeuroterapiaPage.section4.item2.description,
    },
    {
    title: es.NeuroterapiaPage.section4.item3.title,
    description: es.NeuroterapiaPage.section4.item3.description,
    },
]

const NeuroterapiaPage = () => {
    return ( 
        <div className="w-full">
        {/* section 1 */}
        <div className="relative h-screen overflow-hidden w-full">
            {/* Imagen de fondo */}
            <Image
                src="/images/neurotherapy-front.png" 
                alt="Neuroterapia"
                fill
                className="object-cover grayscale brightness-90"
            />

            {/* Contenido centrado */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 text-white">
                <div className="mb-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        stroke="currentColor"
                        className="w-10 h-10 mx-auto stroke-[2]"
                        viewBox="0 0 24 24"
                    >
                        <path d="M12 3v3m0 12v3m9-9h-3M6 12H3m15.36 6.36l-2.12-2.12M6.76 6.76 4.64 4.64m0 14.72 2.12-2.12m12.72-12.72-2.12 2.12" />
                    </svg>
                </div>

                {/* Título principal */}
                <h1 className="text-5xl md:text-7xl font-light tracking-wider mb-3">
                <span className="font-serif">{es.NeuroterapiaPage.section1.title}</span>
                </h1>

                {/* Subtítulo */}
                <p className="text-xl md:text-2xl tracking-wide font-light mb-10">
                    {es.NeuroterapiaPage.section1.description}
                </p>

                {/* Botón */}
                <Button size="lg" className="gap-4 text-primary" variant="outline" onClick={() => window.open("https://calendly.com/lymbikagroup/30min", "_blank")}>
                    Agendar Cita <MoveRight className="w-4 h-4" />
                </Button>
            </div>
        </div>

        {/* section 2 */}

        <div className="max-w-4xl mx-auto px-6 py-20">
            <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10 py-8">
                {/* Texto */}
                <div className="flex-1 text-left">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                        <span className="text-teal-500">{es.NeuroterapiaPage.section2.title}</span>
                    </h2>
                    <p className="text-lg text-gray-700 leading-relaxed sm:text-left">
                        {es.NeuroterapiaPage.section2.description}
                    </p>
                </div>

                {/* Imagen */}
                <div className="flex-1 flex justify-center">
                    <div className="w-60 h-60 md:w-72 md:h-72 relative rounded-full overflow-hidden shadow-lg">
                        <Image
                            src="/images/neuro-1.jpg"
                            alt="Smiling woman"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>

            {/* section 3 */}

            <div className="py-12 px-6">
                <div className="max-w-4xl mx-auto">
                    {/* Título */}
                    <div className="flex justify-center items-center mb-12">
                        <div className="w-12 h-1 bg-gray-700"></div>
                            <h2 className="text-3xl font-bold mx-4 text-dark-gray">{es.NeuroterapiaPage.section3.title}</h2>
                        <div className="w-12 h-1 bg-gray-700"></div>
                    </div>

                    {/* Tarjetas */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {services.map((service, index) => (
                        <div key={index} className="text-center">
                            <div className="w-48 h-48 mx-auto mb-6 relative rounded-full overflow-hidden shadow-lg">
                                <Image
                                src={service.image}
                                alt={service.alt}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 33vw"
                                />
                            </div>
                            <h3 className="text-xl font-semibold text-dark-gray mb-2">{service.title}</h3>
                            <p className="text-gray-600 mb-4">{service.description}</p>
                        </div>
                    ))}
                    </div>
                </div>
            </div>

            {/* section 4 */}

            <div className="w-full py-20">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-16 lg:items-center">

                        {/* Bloque visual con imagen y título */}
                        <div className="w-full lg:w-1/2">
                            <div className="aspect-video flex flex-col items-center justify-center p-6">
                            <div className="relative w-full h-full max-h-[420px] rounded-lg overflow-hidden">
                                <Image
                                src="/logos/isotipo-lymbika.svg"
                                alt="Neuroterapia"
                                fill
                                className="object-fill text-slate-100"
                                />
                            </div>
                            <h1 className="mt-6 text-4xl font-medium text-center">
                                {es.NeuroterapiaPage.section4.title}
                            </h1>
                            </div>
                        </div>

                        {/* Bloque de texto */}
                        <div className="w-full lg:w-1/2 space-y-8">
                            {science.map((science, index) => (
                            <div key={index} className="space-y-2">
                                <h2 className="text-xl md:text-3xl font-semibold tracking-tight text-left">
                                {science.title}
                                </h2>
                                <p className="text-base md:text-lg leading-relaxed text-muted-foreground max-w-xl text-left">
                                {science.description}
                                </p>
                            </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
     );
}
 
export default NeuroterapiaPage;