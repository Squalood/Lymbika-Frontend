import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const contact = [
    {
    title: "Dirección",
    description: "Av. Paseo de la Victoria 9350, Partido Senecú, Juárez, Chih.",
    link: "https://maps.app.goo.gl/wddxisYk7CM7cGVg6",
    },
    {
    title: "Correo electrónico",
    description: "lymbikagroup@gmail.com​",
    link: "mailto:lymbikagroup@gmail.com"
    },
]

const Contact = () => {
    return ( 
        <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex flex-col-reverse lg:flex-row gap-16 lg:items-center">

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
                    Ya eres parte de nuestra red?
                    </h1>
                    </div>
                </div>

                {/* Bloque de texto */}
                <div className="w-full lg:w-1/2 space-y-8">
                {contact.map((contact, index) => (
                    <div key={index} className="space-y-2">
                    <h2 className="text-xl md:text-3xl font-semibold tracking-tight text-left">
                        {contact.title}
                    </h2>
                    <p className="text-base md:text-lg leading-relaxed text-muted-foreground max-w-xl text-left">
                        <Link href={contact.link} target="_blank" rel="noopener noreferrer">{contact.description}</Link>
                    </p>
                    </div>
                ))}
                <Button
                    variant="outline"
                    onClick={() => window.open("https://wa.me/526561100446", "_blank")}
                    className="w-1/2"
                >
                    <svg
                        className="fill-green-700 w-7 h-7"
                        role="img"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        >
                        <title>WhatsApp</title>
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    Contacto
                </Button>
                </div>
            </div>
        </div>
     );
}
 
export default Contact;