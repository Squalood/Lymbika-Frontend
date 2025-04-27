import es from "@/locals/es.json"
import { Separator } from "@/components/ui/separator";

const section3 = [
    {
    title: es.MedicalAgentPage.section3.item1.title,
    description:es.MedicalAgentPage.section3.item1.description,
    },
    {
    title: es.MedicalAgentPage.section3.item2.title,
    description: es.MedicalAgentPage.section3.item2.description,
    },
]

const MedicalAgentPage = () => {
    return ( 
        <div className="w-full py-10 px-20 lg:py-10 lg:px-40">
            {/* section1 */}
            <div className="max-w-4xl mx-auto">
                <h2>{es.MedicalAgentPage.title}</h2>
                <div className="grid grid-cols-1 gap-8 items-center lg:grid-cols-2">
                    <div className="flex gap-4 flex-col">
                        <div className="flex gap-4 flex-col">
                            <h1 className="text-5xl md:text-6xl md:max-w-xs tracking-tighter text-left font-regular">
                                {es.MedicalAgentPage.section1.title}
                            </h1>
                        </div>
                    </div>
                    <div className="bg-muted rounded-md aspect-square"></div>
                </div>
            </div>
            {/* section2 */}
            <div className="max-w-4xl mx-auto mt-40">
                <div className="flex flex-col-reverse lg:flex-row gap-10 lg:items-center">
                    <div className="bg-muted rounded-md w-full aspect-video h-full flex-1"></div>
                    <div className="flex gap-4 pl-0 lg:pl-20 flex-col  flex-1">
                        <div className="flex gap-2 flex-col">
                            <h2 className="text-xl sm:text-3xl md:text-5xl tracking-tighter lg:max-w-xl font-regular text-left">
                                {es.MedicalAgentPage.section2.title}
                            </h2>
                            <p className="text-lg max-w-xl lg:max-w-sm leading-relaxed tracking-tight text-muted-foreground text-left">
                                {es.MedicalAgentPage.section2.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/* section3 */}
            <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto mt-32">
                <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
                    <h2 className="text-2xl font-bold md:text-3xl md:leading-tight text-gray-800">
                        {es.MedicalAgentPage.section3.title}
                    </h2>
                </div>
                <div className="max-w-5xl mx-auto">
                    <div className="grid sm:grid-cols-2 gap-6 md:gap-12">
                        {section3.map((section3, index) => (
                        <div key={index}>
                            <h3 className="text-lg font-semibold text-gray-800">
                            {section3.title}
                            </h3>
                            <Separator/>
                            <p className="mt-2 text-gray-600">
                            {section3.description}
                            </p>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default MedicalAgentPage;