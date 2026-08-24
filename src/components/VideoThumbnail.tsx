import { Play, Plus } from "lucide-react";
import type { Video } from "@/data/videos";

interface VideoThumbnailProps {
  video: Video;
  badge?: string;
  rank?: number;
  aspect?: "portrait" | "landscape";
}

export function VideoThumbnail({ video, badge, rank, aspect }: VideoThumbnailProps) {
  const handleClick = () => {
    window.dispatchEvent(new CustomEvent("openVideoModal", { detail: { videoId: video.id } }));
  };

  const aspectStyle = aspect === "landscape"
    ? { aspectRatio: "1350/760" }
    : aspect === "portrait"
      ? { aspectRatio: "1080/1350" }
      : {};

  return (
    <div className="flex flex-col w-full">
      <button
        type="button"
        onClick={handleClick}
        className="group relative w-full overflow-hidden rounded-xl border-none p-0 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-12px_rgba(196,30,30,0.45)]"
        style={aspectStyle}
      >
        <img
          src={video.thumbnail}
          alt={video.name}
          className="w-full h-full object-cover block group-hover:scale-110 transition-transform duration-700 ease-out"
        />

        <div className="ott-shine absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100" />

        {(badge || typeof rank === "number") && (
          <div className="absolute top-2 left-2 flex items-center gap-1.5 z-10">
            {typeof rank === "number" && (
              <span className="font-headline text-lg leading-none text-gold drop-shadow-md">{rank}</span>
            )}
            {badge && (
              <span className="text-[9px] font-black uppercase tracking-wider bg-primary text-white px-1.5 py-0.5 shadow-md">
                {badge}
              </span>
            )}
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-primary text-white p-3 rounded-full scale-90 group-hover:scale-100 transition-transform duration-300 shadow-lg shadow-primary/40 ring-4 ring-white/10">
            <Play className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" />
          </div>
        </div>

        <div className="absolute inset-0 rounded-xl border border-white/0 group-hover:border-primary/50 transition-colors duration-300 pointer-events-none" />

        <span className="absolute bottom-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-7 h-7 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white">
          <Plus className="w-3.5 h-3.5" />
        </span>
      </button>

      <p className="text-white/85 font-semibold text-xs font-bangla line-clamp-1 mt-1.5 px-0.5">{video.name}</p>
    </div>
  );
}
