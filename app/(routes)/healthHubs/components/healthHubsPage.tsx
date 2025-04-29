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
    <div className="">
        {/* Hero Section */}
        <div className="relative bg-cover bg-center h-[500px]">
            <Image
            src="/images/healthhubs.jpg"
            alt="Lymbika Health Hub"
            fill
            className="object-cover"
            priority
            />
            <div className="absolute bottom-10 left-10 z-10">
                <h1 className="text-4xl font-semibold text-white drop-shadow-lg">
                    {es.HealtHub.HeroSection.title}
                </h1>
            </div>
        </div>

        {/* Section1 */}
        <div className="bg-[#A84409] py-20 px-6 text-white">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
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

        {/* section 2 */}
        <div className="py-20 px-6 text-white">
            <div className="flex justify-center">

            </div>
        </div>

        {/* Contact Section */}
        <div className="bg-white py-20 px-6">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="w-full">
                <Image
                src="/images/neuro-2.jpg"
                alt="Contacto"
                width={600}
                height={400}
                className="w-full h-auto object-cover rounded-lg"
                />
            </div>
            <div>
                <h2 className="text-3xl font-semibold text-neutral-900 mb-4">
                ¿Ya eres parte de nuestra red?
                </h2>
                <button className="bg-teal-500 text-white px-6 py-3 rounded-lg mb-6 hover:bg-teal-600 transition">
                Reserva una consulta
                </button>
                <div className="text-neutral-800 space-y-3">
                <div>
                    <h4 className="font-semibold">Dirección</h4>
                    <p>Calle 12 #34-56, Barranquilla</p>
                </div>
                <div>
                    <h4 className="font-semibold">Correo electrónico</h4>
                    <p>hola@sitioincreible.co</p>
                </div>
                <div>
                    <h4 className="font-semibold">Número telefónico</h4>
                    <p>300 123 4567</p>
                </div>
                </div>
            </div>
            </div>
        </div>
    </div>
     );
}
 
export default HealthHubsPage;