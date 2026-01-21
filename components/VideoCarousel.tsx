import YoutubeEmbed from "@/components/YoutubeEmbed";
import TiktokEmbed from "@/components/TiktokEmbed";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export type Video = {
  id: number;
  videoID: string;
};

export type VideoCarouselProps = {
  videos: Video[];
};

// Función para detectar la plataforma del video basándose en el formato del ID
const detectVideoPlatform = (videoId: string): "youtube" | "tiktok" => {
  // TikTok IDs son números largos (típicamente 19 dígitos)
  // YouTube IDs son alfanuméricos cortos (típicamente 11 caracteres)
  return /^\d{15,}$/.test(videoId) ? "tiktok" : "youtube";
};

const VideoCarousel = ({ videos }: VideoCarouselProps) => {
    if (!videos || videos.length === 0) {
        return null;
    }

    const videoCount = videos.length;

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
                    {videos.map((video) => {
                        const platform = detectVideoPlatform(video.videoID);

                        return (
                            <CarouselItem key={video.id} className={getBasisClass()}>
                                <div className="p-2">
                                    {platform === "youtube" ? (
                                        <YoutubeEmbed
                                            videoId={video.videoID}
                                            orientation="vertical"
                                        />
                                    ) : (
                                        <TiktokEmbed
                                            videoId={video.videoID}
                                            orientation="vertical"
                                        />
                                    )}
                                </div>
                            </CarouselItem>
                        );
                    })}
                </CarouselContent>
                {videoCount > 1 && (
                    <>
                        <CarouselPrevious className="left-2" />
                        <CarouselNext className="right-2" />
                    </>
                )}
            </Carousel>
        </div>
    );
}

export default VideoCarousel;
