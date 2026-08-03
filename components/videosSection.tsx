import VideoCarousel, { Video } from "@/components/VideoCarousel";

type VideosSectionProps = {
  title?: string;
  videos: Video[];
};

const VideosSection = ({ title, videos }: VideosSectionProps) => {
  return (
    <div className="sm:max-w-6xl lg:mx-auto">
      {title && <h1 className="px-6 text-3xl mb-8">{title}</h1>}
      <VideoCarousel videos={videos} />
    </div>
  );
};

export default VideosSection;
