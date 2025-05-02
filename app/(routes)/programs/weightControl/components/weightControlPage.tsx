import { Button } from "@/components/ui/button";
import es from "@/locals/es.json"
import Image from "next/image";

const cards = [
    {
    title: es.WeightControlPage.section2.item1.title,
    description: es.WeightControlPage.section2.item1.description,
    image: "/svg/stethoscope.svg",
    },
    {
    title: es.WeightControlPage.section2.item2.title,
    description: es.WeightControlPage.section2.item2.description,
    image: "/svg/healthy-food.svg",
    },
    {
    title: es.WeightControlPage.section2.item3.title,
    description: es.WeightControlPage.section2.item3.description,
    image: "/svg/psychology.svg",
    }
]

const WeightControlPage = () => {
    return ( 
        <div className="w-full">
            <div className="relative overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                    src="/images/peso-hero.png"
                    alt="Background Hero"
                    fill
                    className="object-cover"
                    priority
                    />
                    <div className="absolute inset-0 bg-black/10" /> {/* Capa oscura encima para mejor contraste */}
                </div>

                <div className="relative z-1">
                    <div className="container mx-auto px-4">
                        <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
                            <div className="flex gap-4 flex-col">
                            <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular text-white">
                                {es.WeightControlPage.title}
                            </h1>
                            </div>
                            <Button size={"lg"} variant={"secondary"} className="mt-4" onClick={() => window.open("https://calendly.com/lymbikagroup/30min", "_blank")}>Agendar Cita</Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* section1 */}
            <div className="max-w-4xl mx-auto mt-40 px-10">
                <div className="flex flex-col-reverse lg:flex-row gap-10 lg:items-center">
                    <div className="relative bg-muted rounded-md w-full aspect-square h-full flex-1 overflow-hidden">
                    <Image
                        src="/images/peso-6.png"
                        alt="imagen"
                        fill
                        className="object-cover"
                    />
                    </div>
                    <div className="flex gap-4 pl-0 lg:pl-20 flex-col  flex-1">
                        <div className="flex gap-2 flex-col">
                            <h2 className="text-xl sm:text-3xl md:text-5xl tracking-tighter lg:max-w-xl font-regular text-left">
                            {es.WeightControlPage.section1.title}
                            </h2>
                            <p className="text-lg max-w-xl lg:max-w-sm leading-relaxed tracking-tight text-muted-foreground text-left">
                            {es.WeightControlPage.section1.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* section2 */}
            <div className="max-w-4xl mx-auto mt-20 px-10">
                <div className="flex flex-col gap-10">
                    <div className="flex gap-4 flex-col">
                        <div className="flex justify-center sm:justify-start">
                            <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular">
                            {es.WeightControlPage.section2.title}
                            </h2>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {cards.map((cards, index) => (
                        <div key={index} className="flex flex-col gap-2">
                            <div className="relative h-32 rounded-md aspect-auto mb-2 overflow-hidden">
                            <Image
                                src={cards.image}
                                alt="imagen"
                                fill
                            />
                            </div>
                            <div className="text-center">
                                <h3 className="text-xl tracking-tight">{cards.title}</h3>
                                <p className="text-muted-foreground text-base">
                                {cards.description}
                                </p>    
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* section3 */}
            <div className="relative mt-20 py-20 px-10 sm:px-20">
                <div className="absolute inset-0 bg-purple-200 w-full h-full -z-10" />
                {/* Contenido centrado */}
                <div className="max-w-4xl mx-auto relative">
                    <div className="flex flex-col-reverse lg:flex-row gap-10 lg:items-center">
                        <div className="bg-muted rounded-md w-full aspect-square h-full flex-1 relative overflow-hidden">
                            <Image
                            src="/images/peso-4.jpg"
                            alt="imagen"
                            fill
                            className="object-cover"
                            />
                        </div>
                        <div className="flex gap-4 pl-0 lg:pl-20 flex-col flex-1">
                            <div className="flex gap-2 flex-col">
                                <h2 className="text-xl sm:text-3xl md:text-5xl tracking-tighter lg:max-w-xl font-regular text-left">
                                    {es.WeightControlPage.section3.title}
                                </h2>
                                <p className="text-lg max-w-xl lg:max-w-sm leading-relaxed tracking-tight text-muted-foreground text-left">
                                    {es.WeightControlPage.section3.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* section4 */}
            <div className="relative py-20 md:py-32 px-10 sm:px-20">
                <div className="absolute inset-0 bg-violet-300 w-full h-full -z-10" />

                <div className="max-w-4xl mx-auto relative">
                    <div className="flex flex-col-reverse lg:flex-row gap-10 lg:items-center">
                        <div className="flex gap-4 pl-0 lg:pl-20 flex-col  flex-1">
                            <div className="flex gap-2 flex-col">
                                <h2 className="text-xl sm:text-3xl md:text-5xl tracking-tighter lg:max-w-xl font-regular text-left">
                                {es.WeightControlPage.section4.title}
                                </h2>
                                <p className="text-lg max-w-xl lg:max-w-sm leading-relaxed tracking-tight text-muted-foreground text-left">
                                {es.WeightControlPage.section4.description}
                                </p>
                            </div>
                        </div>
                        <div className="bg-muted rounded-md w-full aspect-video h-full flex-1 relative overflow-hidden">
                            <Image
                                src="/images/peso-5.png"
                                alt="imagen"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default WeightControlPage;