import { Link } from "react-router-dom";
import { Clapperboard, Smartphone, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 pt-14 pb-8 px-4 sm:px-6 lg:px-8 bg-[#0a0406] overflow-hidden">
      <div className="absolute inset-0 alpana opacity-40 pointer-events-none" />
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[70%] h-48 bg-primary/10 blur-[80px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          {[
            { icon: Clapperboard, title: "Exclusive Bangla", text: "Originals, drama & festivals vibes" },
            { icon: Smartphone, title: "Watch Anywhere", text: "Phone, tablet & smart TV ready" },
            { icon: ShieldCheck, title: "Secure Streaming", text: "Protected playback & flexible plans" },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="text-center sm:text-left px-2">
              <div className="inline-flex w-10 h-10 items-center justify-center rounded-xl bg-primary/15 border border-primary/25 text-primary mb-3">
                <Icon className="w-5 h-5" />
              </div>
              <p className="text-white font-bold text-sm mb-1">{title}</p>
              <p className="text-white/40 text-xs leading-relaxed">{text}</p>
            </div>
          ))}
        </div>

        <div className="section-rail mb-10" />

        <div className="flex flex-col items-center text-center gap-4">
          <Link to="/">
            <img src="/logo.svg" alt="Bangla Plus" className="h-12 w-auto" />
          </Link>
          <p className="font-bangla text-white/55 text-base">বাংলা সিনেমা ও সিরিজ — এক জায়গায়</p>
          <p className="text-white/30 text-sm">Copyright © 2026, Zeen Digital Solutions LLP. All Rights Reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-white/40 text-sm">
            <Link to="/terms" className="hover:text-primary transition-colors">
              Terms of Services
            </Link>
            <span className="text-white/20">|</span>
            <Link to="/refund" className="hover:text-primary transition-colors">
              Refund Policy
            </Link>
            <span className="text-white/20">|</span>
            <Link to="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
