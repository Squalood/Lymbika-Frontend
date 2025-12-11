import YoutubeEmbed from "@/components/YoutubeEmbed";
import { ClinicType } from "@/types/clinic";

export type InfoclinicProps = {
  clinic: ClinicType;
};

const VideoSection = ({ clinic }: InfoclinicProps) => {
    if (!clinic.videos || clinic.videos.length === 0) {
        return null;
    }

    return ( 
        <div className="max-w-4xl mx-auto my-8 px-8">
            <YoutubeEmbed videoId={clinic.videos[0].videoID} orientation={"vertical"}/>
        </div>
    );
}
 
export default VideoSection;