import { useEffect, useRef, useState, type ReactNode, Fragment } from "react";
import { useLocation } from "react-router-dom";
import { Play, Flame, Home, Smile, TrendingUp, Star, Info } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { VideoModal } from "@/components/VideoModal";
import { VideoThumbnail } from "@/components/VideoThumbnail";
import { RssCarousel } from "@/components/RssCarousel";
import {
  VIDEOS,
  TOP10,
  TRENDING,
  POPULAR_LANDSCAPE,
  getAllCategories,
  getVideosByCategory,
  findVideoById,
  type Video,
} from "@/data/videos";

const HERO_IDS = ["1", "2", "3", "4", "5", "6"];

const heroVideos = HERO_IDS.map((id) => VIDEOS.find((item) => item.id === id)!).filter(Boolean);
const trendingVideos = TRENDING;
const popularVideos = POPULAR_LANDSCAPE;

interface SectionTheme {
  sectionClass: string;
  titleClass: string;
  badgeClass: string;
  icon: ReactNode;
  tagline: string;
}

const THEMES: Record<string, SectionTheme> = {
  "Featured Originals": {
    sectionClass: "relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#2a0a0c] via-[#120608] to-[#1a1208]",
    titleClass: "text-3xl sm:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#f5d76e] via-[#f8e7a8] to-[#e8a317]",
    badgeClass: "inline-flex items-center gap-1.5 bg-gradient-to-r from-primary to-[#a01818] text-white text-xs font-black px-3 py-1.5 uppercase tracking-widest",
    icon: <Flame className="w-4 h-4" />,
    tagline: "বাংলার সেরা অরিজিনাল",
  },
  "Family Stories": {
    sectionClass: "relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#141008] via-[#120608] to-[#141008]",
    titleClass: "text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-[#f5d76e] to-orange-300",
    badgeClass: "inline-flex items-center gap-1.5 bg-[#f5d76e]/15 border border-[#f5d76e]/40 text-[#f5d76e] text-xs font-bold px-3 py-1.5 uppercase tracking-widest",
    icon: <Home className="w-4 h-4" />,
    tagline: "ঘর · পরিবার · উৎসব",
  },
  "Comedy & Light": {
    sectionClass: "relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#1a1408] via-[#120a06] to-[#0e0806]",
    titleClass: "text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-amber-300 to-orange-200",
    badgeClass: "inline-flex items-center gap-1.5 bg-amber-500/15 border border-amber-400/40 text-amber-200 text-xs font-bold px-3 py-1.5 uppercase tracking-widest",
    icon: <Smile className="w-4 h-4" />,
    tagline: "হাসি · মেলা · আড্ডা",
  },
};

function dispatch(id: string) {
  window.dispatchEvent(new CustomEvent("openVideoModal", { detail: { videoId: id } }));
}

function AnimatedSection({ children, sectionClass }: { children: ReactNode; sectionClass: string }) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <section
      ref={ref}
      className={sectionClass}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(36px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}
    >
      {children}
    </section>
  );
}

function SectionHeader({ theme, title }: { theme: SectionTheme; title: string }) {
  return (
    <div className="max-w-7xl mx-auto mb-10">
      <div className="flex flex-wrap items-center gap-3 mb-2">
        <h2 className={theme.titleClass}>{title}</h2>
        <span className={theme.badgeClass}>{theme.icon}</span>
      </div>
      <p className="text-sm font-bangla tracking-wide text-white/50 mt-1">{theme.tagline}</p>
    </div>
  );
}

function VideoGrid({
  videos,
  cols,
  aspect,
}: {
  videos: Video[];
  cols: 4 | 5 | 6;
  aspect: "portrait" | "landscape";
}) {
  const colClass =
    cols === 4
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      : cols === 5
        ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
        : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6";
  const aspectClass = aspect === "landscape" ? "aspect-[1350/760]" : "aspect-[1080/1350]";

  return (
    <div className={`max-w-7xl mx-auto grid ${colClass} gap-3 sm:gap-4`}>
      {videos.map((video) => (
        <div key={video.id}>
          <VideoThumbnail video={video} aspect={aspect} />
        </div>
      ))}
    </div>
  );
}

function HeroSection({
  slides,
  onWatch,
  onBrowse,
}: {
  slides: Video[];
  onWatch: () => void;
  onBrowse: () => void;
}) {
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => setActive((p) => (p + 1) % slides.length), 4500);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [slides.length]);

  const current = slides[active];
  if (!current) return null;

  const restart = (i: number) => {
    setActive(i);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setActive((p) => (p + 1) % slides.length), 4500);
  };

  return (
    <section className="relative w-full min-h-[100svh] overflow-hidden">
      <div className="absolute inset-0">
        {slides.map((v, i) => (
          <img
            key={v.id}
            src={v.thumbnail}
            alt=""
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${i === active ? "hero-ken opacity-100" : "opacity-0"}`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-[#120608]/95 via-[#120608]/70 to-[#120608]/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#120608] via-transparent to-[#120608]/55" />
        <div className="absolute inset-0 film-vignette" />
        <div className="absolute inset-0 alpana opacity-30" />
      </div>

      <div className="relative z-10 flex flex-col justify-end min-h-[100svh] pt-28 pb-16 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
        <div className="hero-fade flex flex-wrap items-center gap-2 mb-4">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] bg-primary text-white px-2.5 py-1">Exclusive</span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-gold border border-gold/40 px-2.5 py-1">HD</span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-white/70 border border-white/20 px-2.5 py-1">{current.category}</span>
        </div>

        <p className="hero-brand font-headline text-5xl sm:text-7xl lg:text-8xl text-white tracking-[0.04em] mb-4 pt-2">
          Bangla <span className="text-gold">Plus</span>
        </p>
        <p className="hero-fade font-bangla text-xl sm:text-2xl text-white/90 mb-2">{current.name}</p>
        <p className="hero-fade text-white/55 text-base sm:text-lg max-w-md mb-8 leading-relaxed">
          Classic Bangla cinema &amp; series — drama, romance, family, and mystery in one place.
        </p>
        <div className="hero-cta flex flex-wrap gap-4 mb-10">
          <button
            type="button"
            onClick={onWatch}
            className="hero-cta-primary flex items-center gap-2 bg-primary text-white px-8 py-4 font-bold text-lg hover:bg-primary/90 transition-all"
          >
            <Play className="w-5 h-5 fill-current" /> Watch Now
          </button>
          <button
            type="button"
            onClick={onBrowse}
            className="flex items-center gap-2 border border-white/25 bg-white/5 backdrop-blur-sm text-white px-8 py-4 font-bold text-lg hover:bg-white/10 transition-all"
          >
            <Info className="w-5 h-5" /> Browse Catalog
          </button>
        </div>
        <div className="flex gap-2 items-center">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Slide ${i + 1}`}
              onClick={() => restart(i)}
              className={`h-1 rounded-full transition-all duration-300 border-none p-0 ${i === active ? "bg-primary w-10" : "bg-white/30 w-4 hover:bg-white/50"}`}
            />
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#120608] to-transparent pointer-events-none" />
    </section>
  );
}

function GenreMarquee() {
  const tags = [
    "Romance", "Drama", "Family", "Mystery", "Comedy", "Festival Specials",
    "Kolkata Stories", "Thriller", "Classic Bangla", "Romance", "Drama", "Family", "Mystery", "Comedy",
  ];
  return (
    <div className="relative overflow-hidden border-y border-white/5 bg-black/40 py-3">
      <div className="marquee-track gap-8 px-4">
        {tags.map((t, i) => (
          <span key={`${t}-${i}`} className="font-headline text-lg tracking-[0.15em] text-white/25 whitespace-nowrap">
            {t} <span className="text-primary/50 mx-2">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function TopTenSection() {
  return (
    <div
      id="top10"
      className="py-14"
      style={{ background: "linear-gradient(180deg, #0e0608 0%, #1a0a0c 50%, #120608 100%)" }}
    >
      <div className="px-8 sm:px-16 mb-8 flex items-end gap-3 flex-wrap">
        <div>
          <p className="text-primary text-xs font-black uppercase tracking-[0.25em] mb-1">This Week</p>
          <h2 className="font-headline text-4xl sm:text-5xl text-white tracking-[0.06em]">
            Top 10 <span className="text-gold">on Bangla Plus</span>
          </h2>
        </div>
        <div className="h-px flex-1 min-w-[40px] section-rail mb-2" />
      </div>
      <div className="flex gap-2 sm:gap-4 overflow-x-auto px-6 sm:px-12 pb-4" style={{ scrollbarWidth: "none" }}>
        {TOP10.map((video, i) => (
          <div key={video.id} className="flex-none flex items-end gap-0" style={{ width: "9.5rem" }}>
            <span className="rank-num select-none -mr-3 relative z-0 leading-none" style={{ animationDelay: `${i * 0.05}s` }}>
              {i + 1}
            </span>
            <div className="relative z-10 shrink-0" style={{ width: "7rem", aspectRatio: "1080/1350" }}>
              <VideoThumbnail video={video} aspect="portrait" badge={i < 3 ? "HOT" : undefined} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Index() {
  const location = useLocation();
  const [categories, setCategories] = useState<string[]>([]);
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);

  useEffect(() => {
    setCategories(getAllCategories());
  }, [location.state]);

  useEffect(() => {
    const handleVideo = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      const v = findVideoById(detail?.videoId);
      if (v) setActiveVideo(v);
    };
    window.addEventListener("openVideoModal", handleVideo);
    return () => window.removeEventListener("openVideoModal", handleVideo);
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      {activeVideo && <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />}

      <HeroSection
        slides={heroVideos}
        onWatch={() => dispatch(heroVideos[0]?.id)}
        onBrowse={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
      />

      <GenreMarquee />

      {/* Trending */}
      <AnimatedSection sectionClass="relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8 bg-[#0e0608]">
        <div id="trending" className="max-w-7xl mx-auto mb-10 text-center">
          <TrendingUp className="w-8 h-8 text-primary mx-auto mb-3" />
          <h2 className="font-headline text-4xl sm:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-red-300 via-amber-200 to-red-200 tracking-[0.08em] mb-2">
            Trending Now
          </h2>
          <p className="font-bangla text-white/45">এখন সবাই যা দেখছে</p>
          <div className="section-rail max-w-md mx-auto mt-6" />
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[200px]">
          {trendingVideos.slice(0, 5).map((video, i) => (
            <button
              key={video.id}
              type="button"
              onClick={() => dispatch(video.id)}
              className={[
                "group relative overflow-hidden border border-white/10 hover:border-primary/60 transition-all cursor-pointer text-left p-0 hover:-translate-y-0.5",
                i === 0 ? "md:col-span-2 md:row-span-2" : "",
              ].join(" ")}
            >
              <img src={video.thumbnail} alt={video.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="ott-shine absolute inset-0 opacity-0 group-hover:opacity-100" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              {i === 0 && (
                <span className="absolute top-3 left-3 text-[10px] font-black uppercase tracking-wider bg-primary text-white px-2 py-1">
                  #1 Trending
                </span>
              )}
              <div className="absolute inset-x-0 bottom-0 p-4">
                <h3 className={`font-bangla text-white font-bold leading-tight ${i === 0 ? "text-2xl" : "text-sm"}`}>{video.name}</h3>
                <div className="mt-2 h-0.5 w-10 bg-primary rounded-full group-hover:w-24 transition-all duration-500" />
              </div>
            </button>
          ))}
        </div>
      </AnimatedSection>

      <TopTenSection />

      {/* Popular */}
      <AnimatedSection sectionClass="relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8 bg-[#120608]">
        <div className="max-w-7xl mx-auto mb-10 text-center">
          <Star className="w-8 h-8 text-gold fill-[#f5d76e] mx-auto mb-3" />
          <h2 className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#f5d76e] via-amber-100 to-orange-300 uppercase tracking-wide mb-2">
            All Time Popular
          </h2>
          <p className="font-bangla text-white/45">বারবার দেখা জনপ্রিয় শিরোনাম</p>
          <div className="section-rail max-w-md mx-auto mt-6" />
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {popularVideos.map((video, i) => (
            <div key={video.id}>
              <VideoThumbnail video={video} aspect="landscape" badge={i < 2 ? "NEW" : undefined} />
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* Categories */}
      {categories.map((category) => {
        const theme = THEMES[category];
        const videos = getVideosByCategory(category);
        if (!theme) return null;

        const layout: Record<string, { cols: 4 | 5 | 6; aspect: "portrait" | "landscape" }> = {
          "Featured Originals": { cols: 5, aspect: "portrait" },
          "Family Stories":     { cols: 6, aspect: "portrait" },
          "Comedy & Light":     { cols: 6, aspect: "landscape" },
        };
        const cfg = layout[category] ?? { cols: 6 as const, aspect: "portrait" as const };

        return (
          <Fragment key={category}>
            <AnimatedSection sectionClass={theme.sectionClass}>
              <SectionHeader theme={theme} title={category} />
              <VideoGrid videos={videos} cols={cfg.cols} aspect={cfg.aspect} />
            </AnimatedSection>
            {category === "Family Stories" && (
              <RssCarousel
                id="section-bengali-news"
                title="Bengali Entertainment News"
                feedUrl="https://rss.app/feeds/tV2GrlUiHSaXcb6G.xml"
                accent="#f5d76e"
                icon="newspaper"
              />
            )}
          </Fragment>
        );
      })}

      <Footer />
    </div>
  );
}
