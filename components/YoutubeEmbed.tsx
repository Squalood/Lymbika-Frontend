interface YoutubeEmbedProps {
  videoId: string; // Solo el ID del video (no la URL completa)
}

const YoutubeEmbed = ({ videoId }: YoutubeEmbedProps) => {
    return ( 
        <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg">
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