import { useGetDoctors } from "@/api/getDoctor";
import { useGetProducts } from "@/api/getProducts";
import { SearchGeneral } from "@/components/searchGeneral";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, MapPin, Clock, Shield } from "lucide-react";

const HeroSection = () => {
  const { products } = useGetProducts();
  const { doctors } = useGetDoctors();

  return (
    <section className="relative min-h-screen text-white overflow-hidden">
      {/* Imagen de fondo */}
      <div className="absolute inset-0">
        <Image
          src="/images/pharmacy.jpg"
          alt="Background Hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" /> {/* capa oscura */}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Lado izquierdo */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge className="bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20">
                <MapPin className="w-4 h-4 mr-2" />
                Juárez • Chihuahua • Delicias • Frontera
              </Badge>

              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                La Primera
                <span className="block bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                  E-Pharmacy
                </span>
                <span className="block text-white">de la Frontera</span>
              </h1>

              <p className="text-xl text-blue-100 leading-relaxed max-w-xl">
                Revolucionamos el cuidado de tu salud con tecnología avanzada, precios competitivos y la comodidad de comprar desde casa y recoger en sucursal.
              </p>
            </div>

            {/* Barra de búsqueda */}
            <div className="flex w-full text-black">
              <SearchGeneral allProducts={products} allDoctors={doctors} allServices={[]} allSurgeries={[]} allCategories={[]}/>
            </div>

            {/* Beneficios */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-white/10 rounded-lg">
                      <ShoppingCart className="w-5 h-5" />
                    </div>
                    <span className="font-medium">Compra Autónoma 24/7</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-white/10 rounded-lg">
                      <Clock className="w-5 h-5" />
                    </div>
                    <span className="font-medium">Listo para Recoger</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-white/10 rounded-lg">
                      <Shield className="w-5 h-5" />
                    </div>
                    <span className="font-medium">Respaldo Médico</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
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
            <div className="flex items-center space-x-6 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold">5,000+</div>
                <div className="text-blue-100 text-sm">Productos</div>
              </div>
              <Separator orientation="vertical" className="h-12 bg-white/20" />
              <div className="text-center">
                <div className="text-2xl font-bold">98%</div>
                <div className="text-blue-100 text-sm">Satisfacción</div>
              </div>
              <Separator orientation="vertical" className="h-12 bg-white/20" />
              <div className="text-center">
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-blue-100 text-sm">Disponible</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;