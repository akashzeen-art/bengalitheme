import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowLeft } from "lucide-react";

const SECTIONS = [
  { num: "1", title: "Acceptance of Terms", content: "By accessing Bangla Plus you agree to these Terms & Conditions and our Privacy Policy." },
  { num: "2", title: "Subscription", content: "Paid plans grant access for the billing period selected. Features and pricing may change with notice on the site." },
  { num: "3", title: "Content Use", content: "All content is for personal, non-commercial entertainment. Unauthorized copying or redistribution is prohibited." },
  { num: "4", title: "Account Responsibility", content: "You are responsible for keeping your login credentials secure and for activity under your account." },
  { num: "5", title: "Governing Law", content: "These Terms are governed by the laws of India. Disputes are subject to courts in Gurgaon, Haryana." },
];

export default function Terms() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-24 pb-16 px-4 sm:px-6 max-w-3xl mx-auto">
        <button type="button" onClick={() => navigate("/")} className="flex items-center gap-2 text-white/40 hover:text-white text-sm mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>
        <h1 className="text-3xl font-black text-white mb-8">Terms &amp; Conditions</h1>
        <div className="space-y-5">
          {SECTIONS.map((s) => (
            <div key={s.num} className="rounded-2xl border border-white/10 bg-[#1a0a0c]/80 p-5">
              <h2 className="text-sm text-gold font-bold mb-2">
                {s.num}. {s.title}
              </h2>
              <p className="text-white/65 text-sm leading-relaxed">{s.content}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
