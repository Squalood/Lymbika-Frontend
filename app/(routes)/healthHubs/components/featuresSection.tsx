import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import * as LucideIcons from "lucide-react";
import { LucideIcon } from "lucide-react";

interface Feature {
  id: number;
  icon: string;
  title: string;
  description: string;
}

interface FeaturesSectionProps {
  features: Feature[];
}

const FeaturesSection = ({ features }: FeaturesSectionProps) => {
  if (!features || features.length === 0) {
    return null;
  }

  const getIcon = (iconName: string): LucideIcon => {
    const iconsMap = LucideIcons as unknown as Record<string, LucideIcon>;
    return iconsMap[iconName] || LucideIcons.HelpCircle;
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-primary-light w-full">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Un Ecosistema Completo Para Tu Éxito Profesional
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {features.map((feature) => {
            const IconComponent = getIcon(feature.icon);
            return (
              <Card
                key={feature.id}
                className="group hover:shadow-xl transition-all duration-300 border border-primary/20 bg-card/90 backdrop-blur-sm hover:border-primary/40"
              >
                <CardHeader className="text-center space-y-4">
                  <div className="mx-auto p-4 bg-primary/10 rounded-2xl w-fit group-hover:scale-110 transition-transform duration-300 border border-primary/20">
                    <IconComponent className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-foreground">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-base leading-relaxed text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;