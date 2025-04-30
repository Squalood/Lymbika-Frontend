import Image from "next/image";
import es from "@/locals/es.json"

const items=[
    {
    title: es.HealtHub.Section1.item1.title,
    description: es.HealtHub.Section1.item1.Description,
    },
    {
    title: es.HealtHub.Section1.item2.title,
    description: es.HealtHub.Section1.item2.Description,
    },
    {
    title: es.HealtHub.Section1.item3.title,
    description: es.HealtHub.Section1.item3.Description,
    },
]

const HealthHubsPage = () => {
    return ( 
    <div className="w-full">

        {/* Hero Section */}
        <div className="">
            <div className="relative overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                    src="/images/healthhubs.jpg"
                    alt="Lymbika Health Hub"
                    fill
                    className="object-cover"
                    priority
                    />
                    <div className="absolute inset-0 bg-black/40" /> {/* Capa oscura encima para mejor contraste */}
                </div>
                <div className="py-40 sm:py-72 relative z-1">
                    <div className="absolute bottom-1 left-0 sm:bottom-6 sm:left-6 max-w-2xl text-left text-background">
                        <div className="flex flex-col gap-1 sm:gap-3">
                            <h1 className="text-3xl md:text-5xl tracking-tighter">
                                {es.HealtHub.HeroSection.title}
                            </h1>
                            <h3 className="sm:text-end font-bold text-sm sm:text-2xl">{es.HealtHub.HeroSection.subtitle}</h3>
                            <p className="text-base md:text-xl leading-relaxed tracking-tight text-gray-300">
                            {es.HealtHub.HeroSection.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Section1 */}
        <div className="bg-muted py-20 px-6">
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                <div className="w-full">
                    <Image
                    src="/images/neuro-1.jpg"
                    alt="Funcionamiento"
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover rounded-lg"
                    />
                </div>
                <div>
                    <h2 className="text-3xl font-semibold mb-4">{es.HealtHub.Section1.title}</h2>
                    <p className="mb-6 max-w-md">
                    {es.HealtHub.Section1.Description}
                    </p>
                    <button className="border border-white px-6 py-2 text-white hover:bg-white hover:text-[#A84409] transition">
                    LEARN MORE
                    </button>
                </div>
            </div>
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {items.map((items, index) => (
            <div key={index} className="border border-white p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">{items.title}</h3>
                <p className="text-sm">
                    {items.description}
                </p>
            </div>
            ))}
            </div>
        </div>

    </div>
     );
}
 
export default HealthHubsPage;