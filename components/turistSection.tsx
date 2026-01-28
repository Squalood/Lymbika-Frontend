import YoutubeEmbed from "./YoutubeEmbed";

interface TuristSectionProps {
    title?: string;
    videoId?: string;
}

const TuristSection = ({ title, videoId }: TuristSectionProps) => {
    if (!title || !videoId) return null;

    return (
        <div className="max-w-4xl mx-auto mb-16 px-8">
            <h1 className="px-6 text-3xl mb-8">{title}</h1>
            <YoutubeEmbed videoId={videoId}/>
        </div>
     );
}

export default TuristSection;