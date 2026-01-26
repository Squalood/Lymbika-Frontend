import { useGetDoctors } from "@/api/getDoctor";
import { useGetProducts } from "@/api/getProducts";
import { SearchGeneral } from "@/components/searchGeneral";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, MapPin, Clock, Shield } from "lucide-react";
import { PageType } from "@/types/pages";

type HeroProps = {
  hero: PageType["hero"];
};

const HeroSection = ({ hero }: HeroProps) => {
  const { products } = useGetProducts();
  const { doctors } = useGetDoctors();

  if (!hero) return null;
  
  return (
    <section className="relative h-full md:h-[500px] lg:h-[550px] text-white z-10">
      {/* Imagen de fondo */}
      <div className="absolute inset-0">
        {hero.image?.url && (
          <Image
            src={hero.image.url}
            alt={hero.title}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Lado izquierdo - Contenido principal */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge className="bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20">
                <MapPin className="w-4 h-4 mr-2" />
                Juárez • Chihuahua • Delicias • Frontera
              </Badge>

              <h1 className="text-3xl lg:text-6xl font-bold leading-tight">
                La Primera
                <span className="block bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                  E-Pharmacy
                </span>
                <span className="block text-white">de la Frontera</span>
              </h1>

              <p className="sm:text-xl text-blue-100 leading-relaxed max-w-xl">
                Revolucionamos el cuidado de tu salud con tecnología avanzada, 
                precios competitivos y la comodidad de comprar desde casa y 
                recoger en sucursal.
              </p>
            </div>

            {/* Barra de búsqueda */}
            <div className="flex w-full text-black">
              <SearchGeneral 
                allProducts={products} 
                allDoctors={doctors} 
                allServices={[]} 
                allSurgeries={[]} 
                allCategories={[]}
              />
            </div>
          </div>

          {/* Lado derecho - Beneficios e Indicadores */}
          <div className="hidden lg:block space-y-8">
            {/* Beneficios */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/15 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-white/10 rounded-lg">
                      <ShoppingCart className="w-5 h-5" />
                    </div>
                    <span className="font-medium">Compra Autónoma 24/7</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/15 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-white/10 rounded-lg">
                      <Clock className="w-5 h-5" />
                    </div>
                    <span className="font-medium">Listo para Recoger</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/15 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-white/10 rounded-lg">
                      <Shield className="w-5 h-5" />
                    </div>
                    <span className="font-medium">Respaldo Médico</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/15 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-white/10 rounded-lg">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <span className="font-medium">Frontera MX-USA</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Indicadores */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-around">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">5,000+</div>
                    <div className="text-blue-100 text-sm mt-1">Productos</div>
                  </div>
                  
                  <Separator orientation="vertical" className="h-16 bg-white/20" />
                  
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">98%</div>
                    <div className="text-blue-100 text-sm mt-1">Satisfacción</div>
                  </div>
                  
                  <Separator orientation="vertical" className="h-16 bg-white/20" />
                  
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">24/7</div>
                    <div className="text-blue-100 text-sm mt-1">Disponible</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;