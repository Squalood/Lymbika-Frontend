import Link from "next/link"
import ChatDemo from "@/components/chat-demo"
import PlanSectionAlt from "@/app/(routes)/membership/components/plansSectionAlt"
import { HomeFeature, HomeChatMessage } from "@/types/single-types/home"
import {
  Zap, Shield, Brain, Heart, Clock, Star, Globe, Phone, Lock,
  Activity, Stethoscope, Users, Bot, Sparkles, Check, Cpu,
  Smile, Medal, Leaf, FlaskConical, MonitorSmartphone,
  MessageSquare, Calendar, CreditCard, Video, X,
  type LucideIcon,
} from "lucide-react"

const iconMap: Record<string, LucideIcon> = {
  Zap, Shield, Brain, Heart, Clock, Star, Globe, Phone, Lock,
  Activity, Stethoscope, Users, Bot, Sparkles, Check, Cpu,
  Smile, Medal, Leaf, FlaskConical, MonitorSmartphone,
  MessageSquare, Calendar, CreditCard, Video,
}

type AlyusSectionProps = {
  badge?: string
  label?: string
  title?: string
  description?: string
  chatFooter?: string
  ctaText?: string
  ctaHref?: string
  features?: HomeFeature[]
  messages?: HomeChatMessage[]
}

const AlyusSection = ({
  badge,
  label,
  title,
  description,
  chatFooter,
  ctaText,
  ctaHref,
  features = [],
  messages = [],
}: AlyusSectionProps) => {
  if (!title) return (
    <section className="bg-gradient-to-br from-[#0c1a5e] to-[#162d96] py-16 mb-8">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-sm text-white/50">No se pudieron cargar los datos de esta sección.</p>
      </div>
    </section>
  );

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0c1a5e] to-[#162d96] py-16 md:py-20 mb-8">
      <div className="absolute -right-32 -top-32 w-[420px] h-[420px] rounded-full bg-white/[0.03] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_400px] gap-12 md:gap-14 items-center">

          <div>
            <p className="text-xs font-bold uppercase tracking-[2px] text-blue-300 mb-2.5">
              {label}
            </p>

            <h2
              className="text-3xl md:text-[42px] font-black text-white leading-[1.1] tracking-tight mb-4"
              dangerouslySetInnerHTML={{ __html: title }}
            />

            <p className="text-base text-white/70 leading-relaxed mb-6 max-w-md">
              {description}
            </p>

            <div className="flex flex-col gap-3.5">
              {features.map((f) => {
                const Icon: LucideIcon = f.icon ? (iconMap[f.icon] ?? X) : X
                return (
                  <div key={f.id} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon size={16} className="text-white/80" />
                    </div>
                    <div>
                      <p className="font-bold text-white text-sm mb-0.5">{f.title}</p>
                      <p className="text-[13px] text-white/60 leading-snug">{f.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            {false && ctaText && (
              <Link
                href={ctaHref ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-2 bg-white hover:-translate-y-0.5 hover:shadow-xl transition-all text-[#0c1a5e] text-sm font-bold py-3 px-6 rounded-xl mt-6"
              >
                {ctaText}
              </Link>
            )}
          </div>

          <ChatDemo status={badge} messages={messages} footer={chatFooter} />

        </div>

        <PlanSectionAlt />
      </div>
    </section>
  );
};

export default AlyusSection;
