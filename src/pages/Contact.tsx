import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowLeft, Mail, Phone } from "lucide-react";

export default function Contact() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-24 pb-16 px-4 sm:px-6 max-w-3xl mx-auto">
        <button type="button" onClick={() => navigate("/")} className="flex items-center gap-2 text-white/40 hover:text-white text-sm mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>
        <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">Contact Us</h1>
        <p className="text-primary font-bold text-lg mb-8">We are here to help</p>
        <div className="rounded-2xl border border-white/10 bg-[#1a0a0c]/80 p-6 space-y-5">
          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Email</p>
              <a href="mailto:reetesh.kumar@zeendigital.com" className="text-white hover:text-primary transition-colors">
                reetesh.kumar@zeendigital.com
              </a>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Support</p>
              <p className="text-white/70 text-sm">Reach us via email for subscription and playback support.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
