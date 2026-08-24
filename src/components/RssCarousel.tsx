import { useEffect, useRef, useState } from "react";
import { Clapperboard, Radio, ChevronRight, Newspaper, X } from "lucide-react";
import { loadRssFeed, type RssItem } from "@/lib/rss";

interface RssCarouselProps {
  id: string;
  title: string;
  feedUrl: string;
  accent?: string;
  icon?: "clapperboard" | "newspaper";
}

export function RssCarousel({
  id,
  title,
  feedUrl,
  accent = "#f5d76e",
  icon = "newspaper",
}: RssCarouselProps) {
  const [items, setItems] = useState<RssItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [active, setActive] = useState<RssItem | null>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    loadRssFeed(feedUrl)
      .then((data) => {
        if (!cancelled) setItems(data);
      })
      .catch(() => {
        if (!cancelled) setError("Could not load live feed right now.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [feedUrl]);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  const scrollRight = () => {
    scrollerRef.current?.scrollBy({ left: 340, behavior: "smooth" });
  };

  const Icon = icon === "clapperboard" ? Clapperboard : Newspaper;

  return (
    <div
      id={id}
      className="py-12"
      style={{
        background: "linear-gradient(rgb(18, 6, 8) 0%, rgb(28, 10, 12) 50%, rgb(20, 12, 10) 100%)",
      }}
    >
      <div className="px-8 sm:px-16 mb-8 flex items-center gap-3 flex-wrap">
        <Icon className="w-5 h-5" style={{ color: accent }} aria-hidden />
        <h2 className="text-2xl sm:text-3xl text-white font-headline tracking-[0.06em]">{title}</h2>
        <span
          className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded"
          style={{
            background: `${accent}26`,
            color: accent,
            border: `1px solid ${accent}59`,
          }}
        >
          <Radio className="w-3 h-3 animate-pulse" aria-hidden />
          Live
        </span>
        <div
          className="h-px flex-1 min-w-[40px] ml-1"
          style={{ background: `linear-gradient(to right, ${accent}59, transparent)` }}
        />
        <span
          className="text-white text-[10px] tracking-wide font-semibold hidden sm:block px-2 py-1 rounded"
          style={{ background: "rgba(0, 0, 0, 0.55)", border: "1px solid rgba(255, 255, 255, 0.18)" }}
        >
          Live feed not meant for commercial purpose only for entertainment purpose
        </span>
      </div>

      <div className="relative">
        {loading && (
          <div className="px-8 sm:px-16 py-10 text-white/40 text-sm">Loading live feed…</div>
        )}
        {error && !loading && (
          <div className="px-8 sm:px-16 py-10 text-white/50 text-sm">{error}</div>
        )}
        {!loading && !error && (
          <>
            <div
              ref={scrollerRef}
              className="flex gap-3 overflow-x-auto px-8 sm:px-16 pb-2"
              style={{ scrollbarWidth: "none" }}
            >
              {items.map((item) => (
                <button
                  key={`${item.link}-${item.title}`}
                  type="button"
                  onClick={() => setActive(item)}
                  className="group flex-none w-72 sm:w-80 rounded-2xl overflow-hidden text-left cursor-pointer p-0"
                  style={{
                    background: "rgb(26, 10, 12)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                  }}
                >
                  <div className="relative overflow-hidden" style={{ aspectRatio: "16 / 9" }}>
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                    ) : (
                      <div
                        className="w-full h-full"
                        style={{
                          background: `linear-gradient(135deg, ${accent}33, rgb(40,12,14))`,
                        }}
                      />
                    )}
                    <div
                      className="absolute inset-0"
                      style={{ background: "linear-gradient(to top, rgba(0, 0, 0, 0.78) 0%, transparent 50%)" }}
                    />
                    <div className="absolute bottom-0 inset-x-0 p-3">
                      <p className="text-white text-[12px] font-semibold leading-snug line-clamp-2">{item.title}</p>
                      {item.date && <p className="text-white/35 text-[10px] mt-1.5">{item.date}</p>}
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={scrollRight}
              className="absolute right-0 top-0 bottom-0 z-20 w-14 flex items-center justify-center"
              style={{ background: "linear-gradient(to left, rgb(20, 12, 10), transparent)" }}
              aria-label="Scroll feed"
            >
              <div className="w-9 h-9 rounded-full bg-black/70 border border-white/20 flex items-center justify-center">
                <ChevronRight className="w-5 h-5 text-white" />
              </div>
            </button>
          </>
        )}
      </div>

      <p className="sm:hidden px-8 mt-4 text-white/40 text-[10px] tracking-wide">
        Live feed not meant for commercial purpose only for entertainment purpose
      </p>

      {active && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-6">
          <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" onClick={() => setActive(null)} />
          <div
            className="relative z-10 w-full max-w-6xl h-[88vh] flex flex-col overflow-hidden rounded-2xl border border-white/10 shadow-2xl"
            style={{ background: "rgb(12, 6, 8)" }}
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 shrink-0">
              <p className="flex-1 text-white text-sm font-semibold line-clamp-1">{active.title}</p>
              <button
                type="button"
                onClick={() => setActive(null)}
                className="p-2 rounded-full bg-white/5 border border-white/15 text-white hover:bg-white/10 transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <iframe
              title={active.title}
              src={active.link}
              className="flex-1 w-full border-0 bg-white"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      )}
    </div>
  );
}
