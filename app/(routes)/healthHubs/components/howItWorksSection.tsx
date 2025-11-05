import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface Step {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface HowItWorksSectionProps {
  steps: Step[];
}

const HowItWorksSection = ({ steps }: HowItWorksSectionProps) => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-primary-light w-full">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Cómo Funciona Lymbika
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 border border-primary/20 bg-card/90 backdrop-blur-sm hover:border-primary/40"
            >
              <CardHeader className="text-center space-y-4">
                <div className="mx-auto p-4 bg-primary/10 rounded-2xl w-fit group-hover:scale-110 transition-transform duration-300 border border-primary/20">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl text-foreground">
                  {step.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-base leading-relaxed text-muted-foreground">
                  {step.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;