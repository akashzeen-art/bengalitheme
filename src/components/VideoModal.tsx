import { useEffect } from "react";
import { X, Sparkles } from "lucide-react";
import type { Video } from "@/data/videos";

interface VideoModalProps {
  video: Video;
  onClose: () => void;
}

export function VideoModal({ video, onClose }: VideoModalProps) {
  const phone = localStorage.getItem("userPhone") || "";
  const plan = localStorage.getItem("userPlan") || "basic";

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />
      <div className="relative z-10 w-full max-w-3xl rounded-2xl overflow-hidden bg-black border border-white/10 shadow-[0_30px_80px_rgba(196,30,30,0.25)] modal-animate">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent z-20" />
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/70 border border-white/20 text-white hover:bg-white/10 transition-all"
        >
          <X width={18} height={18} />
        </button>

        <div className="relative w-full bg-zinc-950" style={{ aspectRatio: "16 / 9" }}>
          {video.videoPath ? (
            <video
              src={video.videoPath}
              autoPlay
              controls
              playsInline
              poster={video.thumbnail}
              className="w-full h-full object-cover"
              controlsList="nodownload noremoteplayback"
              disablePictureInPicture
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
              <img src={video.thumbnail} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />
              <div className="absolute inset-0 film-vignette" />
              <div className="relative z-10">
                <p className="font-bangla text-2xl text-white font-bold mb-2">{video.name}</p>
                <p className="text-white/50 text-sm">Video API coming soon — placeholder title ready</p>
              </div>
            </div>
          )}
        </div>

        <div className="px-4 py-4 bg-gradient-to-r from-[#1a0a0c] to-black flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-gold bg-gold/10 border border-gold/25 px-1.5 py-0.5">
                <Sparkles className="w-3 h-3" /> Bangla Plus
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-white/50 border border-white/15 px-1.5 py-0.5">
                HD
              </span>
            </div>
            <p className="text-white font-bold text-lg font-bangla">{video.name}</p>
            <p className="text-gray-400 text-xs mt-0.5">
              {phone ? `+91 ${phone}` : "Guest"} · {plan === "premium" ? "Premium Plan" : "Weekly Plan"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
