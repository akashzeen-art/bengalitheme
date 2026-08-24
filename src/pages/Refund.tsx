import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowLeft } from "lucide-react";

const SECTIONS = [
  { num: "1", title: "Free Trial", content: "Zeen Digital Solutions LLP does not offer a free trial. You may cancel anytime from your account page." },
  { num: "2", title: "Cancellation", content: "Cancel anytime; access remains active until the end of the current billing cycle." },
  { num: "3", title: "Refund Eligibility", content: "Refund requests must be submitted within 2 days of subscription start and are reviewed case-by-case." },
  { num: "4", title: "How to Request", content: "Email reetesh.kumar@zeendigital.com with account details and reason for the request." },
  { num: "5", title: "Processing", content: "Approved refunds are processed within 7 working days." },
];

export default function Refund() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-24 pb-16 px-4 sm:px-6 max-w-3xl mx-auto">
        <button type="button" onClick={() => navigate("/")} className="flex items-center gap-2 text-white/40 hover:text-white text-sm mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>
        <h1 className="text-3xl font-black text-white mb-8">Refund Policy</h1>
        <div className="space-y-5">
          {SECTIONS.map((s) => (
            <div key={s.num} className="rounded-2xl border border-white/10 bg-[#1a0a0c]/80 p-5">
              <h2 className="text-sm text-emerald-300 font-bold mb-2">
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
