import { AboutPageType } from "@/types/single-types/about";
import es from "@/locals/es.json";
import {
  Handshake,
  LifeBuoy,
  MessageCircleDashed,
  Ribbon,
  ShieldCheck,
  UsersRound,
  LucideIcon,
  Heart,
  Star,
  CheckCircle,
  Eye,
  Award,
  Lightbulb,
  Globe,
  Zap,
  Shield,
  Clock,
  X,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  ShieldCheck,
  MessageCircleDashed,
  Ribbon,
  Handshake,
  UsersRound,
  LifeBuoy,
  Heart,
  Star,
  CheckCircle,
  Eye,
  Award,
  Lightbulb,
  Globe,
  Zap,
  Shield,
  Clock,
};

const fallbackIcons: LucideIcon[] = [
  ShieldCheck,
  MessageCircleDashed,
  Ribbon,
  Handshake,
  UsersRound,
  LifeBuoy,
];

type Props = {
  about?: AboutPageType;
};

const AboutPage = ({ about }: Props) => {
  const sections = [
    {
      title: about?.mission_title ?? es.about.mission.title,
      description: about?.mission_description ?? es.about.mission.description,
    },
    {
      title: about?.vision_title ?? es.about.vision.title,
      description: about?.vision_description ?? es.about.vision.description,
    },
  ];

  const valuesTitle = about?.values_title ?? es.about.Securities.title;

  const values =
    about?.value?.length
      ? about.value.map((v) => v.label)
      : [
          es.about.Securities.item1,
          es.about.Securities.item2,
          es.about.Securities.item3,
          es.about.Securities.item4,
          es.about.Securities.item5,
          es.about.Securities.item6,
        ];

  const icons: LucideIcon[] = about?.value?.length
    ? about.value.map((v, i) => {
        if (!v.icon) return fallbackIcons[i % fallbackIcons.length];
        return iconMap[v.icon] ?? X;
      })
    : fallbackIcons;

  return (
    <div className="max-w-4xl px-6 py-10 lg:px-8 lg:py-14 mx-auto">
      <div className="max-w-2xl mx-auto">
        <div className="grid gap-12">
          {sections.map((section, index) => (
            <div key={index}>
              <h2 className="text-3xl text-gray-300 font-bold lg:text-4xl">{section.title}</h2>
              <p className="mt-3 text-gray-800">{section.description}</p>
            </div>
          ))}
          <h2 className="text-3xl text-gray-300 font-bold lg:text-4xl">{valuesTitle}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-12">
            {values.map((label, index) => {
              const Icon = icons[index];
              return (
                <div key={index} className="flex flex-col items-center text-slate-800">
                  <Icon size={48} />
                  <p className="text-xl md:text-2xl font-semibold tracking-tight text-left">{label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
