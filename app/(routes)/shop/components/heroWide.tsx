import { useGetDoctors } from "@/api/getDoctor";
import { useGetProducts } from "@/api/getProducts";
import { SearchGeneral } from "@/components/searchGeneral";
import Image from "next/image";

const HeroWide = () => {
    const { products } = useGetProducts();
    const { doctors } = useGetDoctors();

    return ( 
        <div className="w-full">
            <div className="relative">
                <div className="absolute inset-0">
                    <Image
                    src="/images/pharmacy.jpg"
                    alt="Background Hero"
                    fill
                    className="object-cover"
                    priority
                    />
                    <div className="absolute inset-0 bg-black/20" /> {/* Capa oscura encima para mejor contraste */}
                </div>
                <div className="relative z-1">
                    <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col text-background">
                        <div className="flex gap-4 flex-col">
                            <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-bold">
                                Farmacia Online
                            </h1>
                            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted max-w-2xl text-center">
                                Tu salud empieza aquí: busca, compara y recoge tu medicina fácil y rápido.
                            </p>
                        </div>
                        <div className="flex w-full lg:w-1/3 text-black px-8">
                            <SearchGeneral allProducts={products} allDoctors={doctors} allServices={[]} allSurgeries={[]} allCategories={[]}/>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default HeroWide;