import YoutubeEmbed from "@/components/YoutubeEmbed";
import { ClinicType } from "@/types/clinic";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export type InfoclinicProps = {
  clinic: ClinicType;
};

const VideoSection = ({ clinic }: InfoclinicProps) => {
    if (!clinic.videos || clinic.videos.length === 0) {
        return null;
    }

    const videoCount = clinic.videos.length;

    // Determina el basis según la cantidad de videos
    const getBasisClass = () => {
        if (videoCount === 1) return "md:basis-full";
        if (videoCount === 2) return "md:basis-1/2";
        return "md:basis-1/3"; // 3 o más videos
    };

    // Determina el max-width del carousel
    const getMaxWidth = () => {
        if (videoCount === 1) return "max-w-sm";
        if (videoCount === 2) return "max-w-3xl";
        return "max-w-6xl"; // 3 o más videos
    };

    return ( 
        <div className="w-full mx-auto my-16 px-8">
            <Carousel 
                opts={{
                    align: "start",
                    loop: videoCount > 1,
                }}
                className={`w-full ${getMaxWidth()} mx-auto`}
            >
                <CarouselContent>
                    {clinic.videos.map((video) => (
                        <CarouselItem key={video.id} className={getBasisClass()}>
                            <div className="p-2">
                                <YoutubeEmbed 
                                    videoId={video.videoID} 
                                    orientation="vertical"
                                />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                {videoCount > 1 && (
                    <>
                        <CarouselPrevious className="left-2 md:hidden" />
                        <CarouselNext className="right-2 md:hidden" />
                    </>
                )}
            </Carousel>
        </div>
    );
}
 
export default VideoSection;