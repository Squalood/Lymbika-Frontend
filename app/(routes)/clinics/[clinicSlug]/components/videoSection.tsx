import VideoCarousel from "@/components/VideoCarousel";
import { ClinicType } from "@/types/clinic";

export type InfoclinicProps = {
  clinic: ClinicType;
};

const VideoSection = ({ clinic }: InfoclinicProps) => {
    return <VideoCarousel videos={clinic.videos || []} />;
}

export default VideoSection;