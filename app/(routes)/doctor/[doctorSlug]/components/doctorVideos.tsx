import React from "react";

interface DoctorVideo {
  id: number;
  videoID: string;
}

interface DoctorVideosProps {
  videos: DoctorVideo[];
  doctorName?: string;
}

const DoctorVideos = ({ videos, doctorName }: DoctorVideosProps) => {
  if (!videos || videos.length === 0) return null;

  return (
    <div className="grid gap-6 sm:grid-cols-3">
      {videos.map((video) => (
        <div key={video.id} className="aspect-square w-full">
          <iframe
            src={`https://www.youtube.com/embed/${video.videoID}`}
            title={`Video del doctor ${doctorName || "Médico"}`}
            className="w-full h-full rounded-xl"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ))}
    </div>
  );
};

export default DoctorVideos;