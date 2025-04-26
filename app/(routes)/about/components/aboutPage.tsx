import es from "@/locals/es.json"
import { Handshake, LifeBuoy, MessageCircleDashed, Ribbon, ShieldCheck, UsersRound } from "lucide-react";

const securities = [
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
const about = [
    {
    title: es.about.mission.title,
    description: es.about.mission.description,
    },
    {
    title: es.about.vision.title,
    description: es.about.vision.description,
    },
]

const AboutPage = () => {
    return ( 
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="max-w-2xl mx-auto">
            <div className="grid gap-12">
                {about.map((about, index) => (
                <div key={index}>
                    <h2 className="text-3xl text-gray-300 font-bold lg:text-4xl">
                    {about.title}
                    </h2>
                    <p className="mt-3 text-gray-800">
                    {about.description}
                    </p>
                </div>
                ))}
                
                <h2 className="text-3xl text-gray-300 font-bold lg:text-4xl">
                    {es.about.Securities.title}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-12">
                {securities.map((securities, index) => (
                    <div key={index} className="flex flex-col items-center">
                        {securities.icon}
                        <p className="text-xl md:text-2xl font-semibold tracking-tight text-left">
                        {securities.title}
                        </p>
                    </div>     
                ))}
                </div>
            </div>
        </div>
    </div>
     );
}
 
export default AboutPage;