import { useState, type FormEvent } from "react";
import { X, Check, Phone, CreditCard } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [step, setStep] = useState<"phone" | "plan">("phone");
  const [phone, setPhone] = useState("");
  const [selectedPlan, setSelectedPlan] = useState<"weekly" | "monthly" | null>(null);

  const handleClose = () => {
    setStep("phone");
    setPhone("");
    setSelectedPlan(null);
    onClose();
  };

  const handlePhoneSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (phone.length >= 10) setStep("plan");
  };

  const handlePlanSubmit = () => {
    if (!selectedPlan) return;
    localStorage.setItem("userPhone", phone);
    localStorage.setItem("userPlan", selectedPlan === "monthly" ? "premium" : "basic");
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("joinDate", new Date().toISOString());
    onSuccess();
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={handleClose} />
      <div className="relative bg-[#1a0a0c] border border-white/10 rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl modal-animate">
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center px-8 pt-8 mb-6">
          <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest ${step === "phone" ? "text-primary" : "text-white/30"}`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${step === "phone" ? "bg-primary text-white" : "bg-white/10 text-white/30"}`}>
              1
            </div>
            Phone
          </div>
          <div className="flex-1 h-px bg-white/10 mx-3" />
          <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest ${step === "plan" ? "text-primary" : "text-white/30"}`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${step === "plan" ? "bg-primary text-white" : "bg-white/10 text-white/30"}`}>
              2
            </div>
            Plan
          </div>
        </div>

        <div className="px-8 pb-8">
          {step === "phone" ? (
            <div className="space-y-6">
              <div>
                <div className="w-12 h-12 rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center mb-4">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-black text-white mb-1">Start Watching</h2>
                <p className="text-white/40 text-sm font-bangla">ফোন নম্বর দিয়ে শুরু করুন</p>
              </div>
              <form onSubmit={handlePhoneSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-white/50 uppercase tracking-widest mb-2">Phone Number</label>
                  <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus-within:border-primary/50 transition-colors">
                    <span className="text-white/40 text-sm font-bold">+91</span>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                      placeholder="10-digit number"
                      maxLength={10}
                      autoFocus
                      className="flex-1 bg-transparent text-white placeholder:text-white/20 focus:outline-none text-sm"
                    />
                    <span className="text-xs text-white/20">{phone.length}/10</span>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={phone.length < 10}
                  className="w-full bg-primary text-white py-3.5 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-primary/90 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  Continue →
                </button>
              </form>
            </div>
          ) : (
            <div className="space-y-5">
              <div>
                <div className="w-12 h-12 rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center mb-4">
                  <CreditCard className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-black text-white mb-1">Choose Plan</h2>
                <p className="text-white/40 text-sm">For +91 {phone}</p>
              </div>

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => setSelectedPlan("weekly")}
                  className={`w-full text-left rounded-xl p-4 border-2 cursor-pointer transition-all ${
                    selectedPlan === "weekly" ? "border-primary bg-primary/10" : "border-white/10 bg-white/5 hover:border-white/20"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-white font-black">Weekly</span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-white/30 text-xs line-through">₹158</span>
                        <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-black px-1.5 py-0.5 rounded">50% OFF</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-primary font-black">
                        ₹79<span className="text-white/30 text-xs font-normal">/week</span>
                      </span>
                      {selectedPlan === "weekly" && <Check className="w-4 h-4 text-primary" />}
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedPlan("monthly")}
                  className={`w-full text-left rounded-xl p-4 border-2 cursor-pointer transition-all relative ${
                    selectedPlan === "monthly" ? "border-primary bg-primary/10" : "border-white/10 bg-white/5 hover:border-white/20"
                  }`}
                >
                  <span className="absolute -top-2.5 right-3 bg-gold text-black text-[10px] font-black px-2 py-0.5 rounded uppercase">
                    Popular
                  </span>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-white font-black">Monthly</span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-white/30 text-xs line-through">₹358</span>
                        <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-black px-1.5 py-0.5 rounded">50% OFF</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-primary font-black">
                        ₹179<span className="text-white/30 text-xs font-normal">/month</span>
                      </span>
                      {selectedPlan === "monthly" && <Check className="w-4 h-4 text-primary" />}
                    </div>
                  </div>
                </button>
              </div>

              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setStep("phone");
                    setSelectedPlan(null);
                  }}
                  className="px-5 py-3 border border-white/10 text-white/60 rounded-xl font-bold text-sm hover:bg-white/5 transition-colors"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handlePlanSubmit}
                  disabled={!selectedPlan}
                  className="flex-1 bg-primary text-white py-3 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-primary/90 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  Start Watching →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
