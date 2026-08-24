import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Home, User, Info, FileText, RotateCcw, Shield, PhoneCall, Play } from "lucide-react";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false);
    };
    if (open) document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, [open]);

  const linkClass =
    "flex items-center gap-3 px-5 py-3.5 text-sm font-semibold text-white/80 hover:bg-white/5 hover:text-white transition-colors";

  const openSubscribe = () => {
    setOpen(false);
    if (window.location.pathname === "/") {
      window.dispatchEvent(new CustomEvent("openAuthModal", { detail: {} }));
    } else {
      navigate("/", { state: { openAuth: true } });
    }
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 border-b transition-all duration-300 ${
        scrolled
          ? "bg-[#120608]/90 backdrop-blur-xl border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.45)]"
          : "bg-gradient-to-b from-black/80 via-black/40 to-transparent border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img src="/logo.svg" alt="Bangla Plus" className="h-10 w-auto" />
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-white/70">
          <a href="#trending" className="hover:text-white transition-colors">Trending</a>
          <a href="#top10" className="hover:text-white transition-colors">Top 10</a>
          <Link to="/about" className="hover:text-white transition-colors">About</Link>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={openSubscribe}
            className="hidden sm:inline-flex items-center gap-1.5 bg-primary text-white text-xs font-black uppercase tracking-wider px-3.5 py-2 hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
          >
            <Play className="w-3.5 h-3.5 fill-current" /> Subscribe
          </button>

          <div ref={menuRef} className="relative">
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="p-2 rounded-lg text-foreground hover:text-primary hover:bg-white/5 transition-colors"
              aria-label="Menu"
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {open && (
              <div className="absolute top-full right-0 mt-2 w-52 bg-[#1a0a0c]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden dropdown-animate">
                <Link to="/" onClick={() => setOpen(false)} className={linkClass}>
                  <Home className="w-4 h-4 text-primary" /> Home
                </Link>
                <div className="h-px bg-white/10 mx-4" />
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    navigate("/account");
                  }}
                  className={`${linkClass} w-full text-left`}
                >
                  <User className="w-4 h-4 text-primary" /> My Account
                </button>
                <div className="h-px bg-white/10 mx-4" />
                <Link to="/about" onClick={() => setOpen(false)} className={linkClass}>
                  <Info className="w-4 h-4 text-primary" /> About Us
                </Link>
                <div className="h-px bg-white/10 mx-4" />
                <Link to="/terms" onClick={() => setOpen(false)} className={linkClass}>
                  <FileText className="w-4 h-4 text-primary" /> Terms &amp; Conditions
                </Link>
                <div className="h-px bg-white/10 mx-4" />
                <Link to="/refund" onClick={() => setOpen(false)} className={linkClass}>
                  <RotateCcw className="w-4 h-4 text-primary" /> Refund Policy
                </Link>
                <div className="h-px bg-white/10 mx-4" />
                <Link to="/privacy" onClick={() => setOpen(false)} className={linkClass}>
                  <Shield className="w-4 h-4 text-primary" /> Privacy Policy
                </Link>
                <div className="h-px bg-white/10 mx-4" />
                <Link to="/contact" onClick={() => setOpen(false)} className={linkClass}>
                  <PhoneCall className="w-4 h-4 text-primary" /> Contact Us
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
