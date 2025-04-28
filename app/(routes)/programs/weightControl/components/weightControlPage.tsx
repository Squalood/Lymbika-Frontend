import { Button } from "@/components/ui/button";
import es from "@/locals/es.json"

const cards = [
    {
    title: es.WeightControlPage.section2.item1.title,
    description: es.WeightControlPage.section2.item1.description,
    },
    {
    title: es.WeightControlPage.section2.item2.title,
    description: es.WeightControlPage.section2.item2.description,
    },
    {
    title: es.WeightControlPage.section2.item3.title,
    description: es.WeightControlPage.section2.item3.description,
    }
]

const WeightControlPage = () => {
    return ( 
        <div className="w-full">
            <div className="container mx-auto">
                <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
                    <div className="flex gap-4 flex-col">
                    <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular">
                        {es.WeightControlPage.title}
                    </h1>
                    </div>
                </div>
            </div>

            {/* section1 */}
            <div className="max-w-4xl mx-auto mt-40">
                <div className="flex flex-col-reverse lg:flex-row gap-10 lg:items-center">
                    <div className="bg-muted rounded-md w-full aspect-video h-full flex-1"></div>
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
            <div className="max-w-4xl mx-auto mt-20">
                <div className="flex flex-col gap-10">
                    <div className="flex gap-4 flex-col items-start">
                        <div className="flex gap-2 flex-col">
                            <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular text-left">
                            {es.WeightControlPage.section2.title}
                            </h2>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {cards.map((cards, index) => (
                        <div key={index} className="flex flex-col gap-2">
                            <div className="bg-muted rounded-md aspect-video mb-2"></div>
                            <h3 className="text-xl tracking-tight">{cards.title}</h3>
                            <p className="text-muted-foreground text-base">
                            {cards.description}
                            </p>
                        </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* section3 */}
            <div className="max-w-4xl mx-auto mt-40">
                <div className="flex flex-col-reverse lg:flex-row gap-10 lg:items-center">
                    <div className="bg-muted rounded-md w-full aspect-video h-full flex-1"></div>
                    <div className="flex gap-4 pl-0 lg:pl-20 flex-col  flex-1">
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

            {/* section4 */}
            <div className="max-w-4xl mx-auto mt-40">
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
                        <Button className="w-2/4 mx-8">aparta consulta</Button>
                    </div>
                    <div className="bg-muted rounded-md w-full aspect-video h-full flex-1"></div>
                </div>
            </div>
        </div>
     );
}
 
export default WeightControlPage;