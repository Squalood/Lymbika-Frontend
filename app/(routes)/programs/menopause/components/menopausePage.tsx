import { Button } from "@/components/ui/button";
import { Handshake, LifeBuoy, MessageCircleDashed, MoveRight, PhoneCall, Ribbon, ShieldCheck, UsersRound } from "lucide-react"
import Image from "next/image";
import es from "@/locals/es.json"

const icons = [
    {
    title: es.about.Securities.item1,
    icon: <ShieldCheck size={48}/>,
    },
    {
    title: es.about.Securities.item2,
    icon: <MessageCircleDashed size={48}/>,
    },
    {
    title: es.about.Securities.item3,
    icon: <Ribbon size={48}/>,
    },
    {
    title: es.about.Securities.item4,
    icon: <Handshake size={48}/>,
    },
    {
    title: es.about.Securities.item5,
    icon: <UsersRound size={48}/>,
    },
    {
    title: es.about.Securities.item6,
    icon: <LifeBuoy size={48}/>,
    },
]

const MenopausePage = () => {
    return ( 
        <div className="w-full py-20 lg:py-40">

            {/* section1 */}
            <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 gap-8 items-center md:grid-cols-2">
                    <div className="flex gap-4 flex-col">
                        <div className="flex gap-4 flex-col">
                            <h1 className="text-5xl md:text-7xl max-w-lg tracking-tighter text-left font-regular">
                            This is the start of something!
                            </h1>
                            <p className="text-xl leading-relaxed tracking-tight text-muted-foreground max-w-md text-left">
                            Managing a small business today is already tough. Avoid further
                            complications by ditching outdated, tedious trade methods. Our
                            goal is to streamline SMB trade, making it easier and faster than
                            ever.
                            </p>
                        </div>
                        <div className="flex flex-row gap-4">
                            <Button size="lg" className="gap-4" variant="outline">
                            Jump on a call <PhoneCall className="w-4 h-4" />
                            </Button>
                            <Button size="lg" className="gap-4">
                            Sign up here <MoveRight className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                    <div className="bg-muted rounded-md aspect-square relative overflow-hidden">
                        <Image
                            src="/images/peso-4.jpg"
                            alt="imagen"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="bg-muted rounded-md row-span-2 relative overflow-hidden">
                        <Image
                            src="/images/peso-4.jpg"
                            alt="imagen"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="bg-muted rounded-md aspect-square relative overflow-hidden">
                        <Image
                            src="/images/peso-4.jpg"
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

            {/* section3 */}
            <div className="relative py-20 px-10 sm:px-20">
                <div className="absolute inset-0 bg-muted w-full h-full -z-10" />
                {/* Contenido centrado */}
                <div className="max-w-4xl mx-auto relative">
                        <div className="mb-12 flex justify-center">
                            <h2 className="text-3xl font-bold lg:text-4xl">
                                {es.about.Securities.title}
                            </h2>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-12">
                        {icons.map((icons, index) => (
                            <div key={index} className="flex flex-col items-center text-slate-800">
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