"use client";

import VideoCarousel from "@/components/VideoCarousel";
import { Badge } from "@/components/ui/badge";
import { ClinicType } from "@/types/clinic";
import { useInView } from "react-intersection-observer";
type VideoTexts = {
  badge: string;
  title: string;
};

export type InfoclinicProps = {
  clinic: ClinicType;
  texts: VideoTexts;
};

const VideoSection = ({ clinic, texts }: InfoclinicProps) => {
  const videos = clinic.videos || [];
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  if (videos.length === 0) return null;

  return (
    <section className="section bg-background">
      <div ref={ref} className="max-w-5xl mx-auto px-4">
        {/* Section header */}
        <div
          className={`text-center mb-8 space-y-3 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Badge
            variant="secondary"
            className="text-xs font-bold tracking-widest uppercase"
          >
            {texts.badge}
          </Badge>
          <h2 className="text-2xl md:text-3xl font-bold">
            {texts.title}
          </h2>
        </div>

        <div
          className={`transition-all duration-700 delay-200 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <VideoCarousel videos={videos} />
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
