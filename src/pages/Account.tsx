import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AuthModal } from "@/components/AuthModal";

export default function Account() {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ phone: string; plan: string } | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(auth);
    if (auth) {
      setUser({
        phone: localStorage.getItem("userPhone") || "",
        plan: localStorage.getItem("userPlan") || "basic",
      });
    }
  }, []);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setAuthModalOpen(false);
    setUser({
      phone: localStorage.getItem("userPhone") || "",
      plan: localStorage.getItem("userPlan") || "basic",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userPhone");
    localStorage.removeItem("userPlan");
    localStorage.removeItem("joinDate");
    navigate("/");
  };

  const isPremium = user?.plan === "premium";

  return (
    <div className="min-h-screen">
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} onSuccess={handleAuthSuccess} />
      <Header />
      <div className="pt-24 pb-16 px-4 max-w-lg mx-auto">
        {!isAuthenticated ? (
          <div className="rounded-2xl border border-white/10 bg-[#1a0a0c] p-8 text-center">
            <h1 className="text-2xl font-black text-white mb-1">My Account</h1>
            <p className="text-primary text-sm font-bold mb-6">Sign In</p>
            <p className="text-white/70 text-base font-semibold mb-2">Access your account</p>
            <p className="text-white/40 text-sm mb-8">
              Sign in with your registered mobile number to access your subscription.
            </p>
            <button
              type="button"
              onClick={() => setAuthModalOpen(true)}
              className="w-full bg-primary text-white py-3 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-primary/90 transition-colors mb-3"
            >
              Sign In / Subscribe
            </button>
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-[#1a0a0c] p-8">
            <h1 className="text-2xl font-black text-white mb-1">Dashboard</h1>
            <p className="text-primary text-sm font-bold mb-6">Subscriber</p>
            <div className="space-y-4 mb-8">
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Mobile</p>
                <p className="text-white font-bold">+91 {user?.phone}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Active Plan</p>
                <p className="text-white font-bold">{isPremium ? "Monthly Plan — ₹179/mo" : "Weekly Plan — ₹79/week"}</p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="w-full bg-primary text-white py-3 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-primary/90 transition-colors"
              >
                Continue Watching
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="w-full border border-white/15 text-white/70 py-3 rounded-xl font-bold text-sm hover:bg-white/5 transition-colors"
              >
                Log Out
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
