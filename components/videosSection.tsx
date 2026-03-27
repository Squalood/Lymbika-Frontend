import VideoCarousel from "@/components/VideoCarousel";
import { PageType } from "@/types/pages";

export type InfopageProps = {
  data: PageType;
};

const VideosSection = ({ data }: InfopageProps) => {
  const title = data.landingPageJson?.videosSection?.title;

  return (
    <div className="sm:max-w-6xl lg:mx-auto ">
      {title && <h1 className="px-6 text-3xl mb-8">{title}</h1>}
      <VideoCarousel videos={data.videos || []} />
    </div>
  );
};

export default VideosSection;