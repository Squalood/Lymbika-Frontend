import { Button } from "@/components/ui/button";
import {CookingPot, FlipHorizontal2, HandHeart, MoonStar, MoveRight, PersonStanding, Trees} from "lucide-react"
import Image from "next/image";
import es from "@/locals/es.json"

const icons = [
    {
    title: es.MenopausePage.section2.item1,
    icon: <CookingPot size={48}/>,
    },
    {
    title: es.MenopausePage.section2.item2,
    icon: <FlipHorizontal2 size={48}/>,
    },
    {
    title: es.MenopausePage.section2.item3,
    icon: <HandHeart size={48}/>,
    },
    {
    title: es.MenopausePage.section2.item4,
    icon: <Trees size={48}/>,
    },
    {
    title: es.MenopausePage.section2.item5,
    icon: <PersonStanding size={48}/>,
    },
    {
    title: es.MenopausePage.section2.item6,
    icon: <MoonStar size={48}/>,
    },
]

const MenopausePage = () => {
    return ( 
        <div className="w-full pt-20 lg:pt-40">
            {/* section1 */}
            <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 gap-8 items-center md:grid-cols-2">
                    <div className="flex gap-4 flex-col">
                        <div className="flex gap-4 flex-col">
                            <h1 className="text-5xl md:text-7xl max-w-lg tracking-tighter text-left font-regular">
                            {es.MenopausePage.hero.title}
                            </h1>
                            <p className="text-xl leading-relaxed tracking-tight text-muted-foreground max-w-md text-left">
                            {es.MenopausePage.hero.description}
                            </p>
                        </div>
                        <div className="flex flex-row gap-4">
                            <Button size="lg" className="gap-4" variant="outline" onClick={() => window.open("https://wa.me/526561100446", "_blank")}>
                            Agendar Cita <MoveRight className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                    <div className="rounded-md aspect-square relative overflow-hidden">
                        <Image
                            src="/images/meno-1.png"
                            alt="imagen"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="rounded-md row-span-2 relative overflow-hidden">
                        <Image
                            src="/images/meno-2.png"
                            alt="imagen"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="rounded-md aspect-square relative overflow-hidden">
                        <Image
                            src="/images/meno-4.png"
                            alt="imagen"
                            fill
                            className="object-cover"
                        />
                    </div>
                    </div>
                </div>
            </div>

            {/* section2 */}
            <div className="relative mt-20 py-20 px-10 sm:px-20">
                <div className="absolute inset-0 bg-lime-300 w-full h-full -z-10" />
                {/* Contenido centrado */}
                <div className="max-w-4xl mx-auto relative">
                    <div className="flex flex-col-reverse lg:flex-row gap-10 lg:items-center">
                        <div className="bg-muted rounded-md w-full aspect-square h-full flex-1 relative overflow-hidden">
                            <Image
                            src="/images/meno-3.png"
                            alt="imagen"
                            fill
                            className="object-cover"
                            />
                        </div>
                        <div className="flex gap-4 pl-0 lg:pl-20 flex-col flex-1">
                            <div className="flex gap-2 flex-col">
                                <h2 className="text-xl sm:text-3xl md:text-5xl tracking-tighter lg:max-w-xl font-regular text-left text-orange-600">
                                    {es.MenopausePage.section1.title}
                                </h2>
                                <p className="text-lg max-w-xl lg:max-w-sm leading-relaxed tracking-tight text-left text-orange-500">
                                    {es.MenopausePage.section1.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* section3 */}
            <div className="relative py-32 px-10 sm:px-20">
                <div className="absolute inset-0 bg-orange-600 w-full h-full -z-10" />
                {/* Contenido centrado */}
                <div className="max-w-4xl mx-auto relative">
                    <div className="mb-12 flex justify-center">
                        <h2 className="text-3xl font-bold lg:text-4xl text-background">
                            {es.MenopausePage.section2.title}
                        </h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-12 ">
                    {icons.map((icons, index) => (
                        <div key={index} className="flex flex-col items-center text-background">
                            {icons.icon}  
                            <p className="text-xl md:text-2xl font-semibold tracking-tight text-left">
                            {icons.title}
                            </p>
                        </div>     
                    ))}
                    </div>
                </div>
            </div>

        </div>
     );
}
 
export default MenopausePage;