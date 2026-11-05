interface YoutubeEmbedProps {
  videoId: string; // Solo el ID del video (no la URL completa)
  orientation?: "horizontal" | "vertical"; // Orientación del video
}

const YoutubeEmbed = ({ videoId, orientation = "horizontal" }: YoutubeEmbedProps) => {
    const isVertical = orientation === "vertical";
    
    return ( 
        <div className={`w-full rounded-xl overflow-hidden shadow-lg ${
            isVertical 
                ? "max-w-xs mx-auto aspect-[9/16] rounded-2xl shadow-2xl" 
                : "aspect-video"
        }`}>
            <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen>
            </iframe>
        </div>
    );
}
 
export default YoutubeEmbed;