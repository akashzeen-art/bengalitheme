import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowLeft, Check } from "lucide-react";

export default function About() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-24 pb-16 px-4 sm:px-6 max-w-3xl mx-auto">
        <button type="button" onClick={() => navigate("/")} className="flex items-center gap-2 text-white/40 hover:text-white text-sm mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>
        <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">About Us</h1>
        <p className="text-primary font-bold text-lg mb-8">Bangla Plus · Zeen Digital Solutions LLP</p>
        <div className="rounded-2xl border border-white/10 bg-[#1a0a0c]/80 p-6 mb-5">
          <p className="text-white/70 leading-relaxed mb-4">
            Bangla Plus is a classic OTT destination for Bengali cinema and series — romance, family stories, mystery, and comedy streamed with a secure subscription experience.
          </p>
          <p className="font-bangla text-white/55 leading-relaxed">বাংলা সিনেমা ও সিরিজের এক ক্লাসিক অভিজ্ঞতা।</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[#1a0a0c]/80 p-6">
          <h2 className="text-lg font-black text-white mb-4">What We Offer</h2>
          <ul className="space-y-3">
            {["Premium Bangla movies & series", "HD streaming", "Multi-device access", "Flexible subscription plans", "Fresh titles added regularly"].map((item) => (
              <li key={item} className="flex items-center gap-3 text-white/70 text-sm">
                <Check className="w-4 h-4 text-primary flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
}
