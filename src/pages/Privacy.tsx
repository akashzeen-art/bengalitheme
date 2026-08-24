import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowLeft } from "lucide-react";

const SECTIONS = [
  { num: "1", title: "Information We Collect", content: "We collect information you provide (name, email, phone, payment info) and usage/device data needed to run the service." },
  { num: "2", title: "How We Use It", content: "To provide streaming, process payments, send notices, support you, and personalise content." },
  { num: "3", title: "Sharing", content: "We may share data with service providers, for legal requests, safety, or business transfers." },
  { num: "4", title: "Cookies", content: "We use cookies and similar technologies. You can refuse cookies in your browser; some features may not work." },
  { num: "5", title: "Children", content: "Not intended for users under 16. Contact reetesh.kumar@zeendigital.com if you believe a child shared personal data." },
  { num: "6", title: "Your Rights", content: "You may request access, correction, or deletion of personal data we hold about you." },
  { num: "7", title: "Governing Law", content: "Governed by Indian law; courts in Gurgaon, Haryana have exclusive jurisdiction." },
];

export default function Privacy() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-24 pb-16 px-4 sm:px-6 max-w-3xl mx-auto">
        <button type="button" onClick={() => navigate("/")} className="flex items-center gap-2 text-white/40 hover:text-white text-sm mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>
        <h1 className="text-3xl font-black text-white mb-8">Privacy Policy</h1>
        <div className="space-y-5">
          {SECTIONS.map((s) => (
            <div key={s.num} className="rounded-2xl border border-white/10 bg-[#1a0a0c]/80 p-5">
              <h2 className="text-sm text-red-300 font-bold mb-2">
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
