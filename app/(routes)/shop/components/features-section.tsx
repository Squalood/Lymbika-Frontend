import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ShoppingCart, 
  MapPin, 
  DollarSign, 
  Shield, 
  Stethoscope,
  Zap,
} from "lucide-react";

export const FeaturesSection = () => {
  const features = [
    {
      icon: ShoppingCart,
      title: "Compra Autónoma",
      description: "Sistema inteligente que te permite comprar 24/7 sin esperas, con confirmación instantánea.",
      color: "bg-blue-50 text-blue-600"
    },
    {
      icon: DollarSign,
      title: "Compara Precios",
      description: "Encuentra el mejor precio comparando con las principales farmacias de la región en tiempo real.",
      color: "bg-green-50 text-green-600"
    },
    {
      icon: MapPin,
      title: "Disponible en Sucursal",
      description: "Ubicados estratégicamente en Juárez para que recojas tus productos cuando te convenga.",
      color: "bg-purple-50 text-purple-600"
    },
    {
      icon: Stethoscope,
      title: "Orientación Médica",
      description: "Consulta con profesionales de la salud en tiempo real para hacer la mejor elección.",
      color: "bg-red-50 text-red-600"
    },
    {
      icon: Shield,
      title: "Respaldo Profesional",
      description: "Todos nuestros productos y servicios están avalados por médicos certificados.",
      color: "bg-indigo-50 text-indigo-600"
    },
    {
      icon: Zap,
      title: "Rápido y sin vueltas",
      description: "Desde que compras hasta que lo recoges, hacemos todo más ágil para que tengas tu pedido en el menor tiempo posible.",
      color: "bg-yellow-50 text-yellow-600"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            ¿Por qué elegir Lymbika?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Combinamos tecnología de vanguardia con el cuidado personalizado para ofrecerte 
            una experiencia farmacéutica única en la frontera.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center pb-4">
                <div className={`w-16 h-16 rounded-full ${feature.color} flex items-center justify-center mx-auto mb-4`}>
                  <feature.icon className="w-8 h-8" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-gray-600 text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};