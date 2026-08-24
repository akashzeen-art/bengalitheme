import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "@/pages/Index";
import Watch from "@/pages/Watch";
import Account from "@/pages/Account";
import About from "@/pages/About";
import Terms from "@/pages/Terms";
import Refund from "@/pages/Refund";
import Privacy from "@/pages/Privacy";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Preloader({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<"in" | "hold" | "out">("in");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("hold"), 400);
    const t2 = setTimeout(() => setPhase("out"), 2200);
    const t3 = setTimeout(onDone, 2900);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        overflow: "hidden",
        background: "#120608",
        clipPath: phase === "out" ? "circle(0% at 50% 50%)" : "circle(150% at 50% 50%)",
        transition: phase === "out" ? "clip-path 0.7s cubic-bezier(0.7,0,0.84,0)" : "none",
        pointerEvents: phase === "out" ? "none" : "all",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 70% 55% at 50% 50%, rgba(196,30,30,0.2) 0%, rgba(18,6,8,1) 70%)",
        }}
      />
      <div style={{ position: "relative", textAlign: "center" }}>
        <img
          src="/logo.svg"
          alt="Bangla Plus"
          style={{
            height: 56,
            margin: "0 auto 16px",
            opacity: phase === "in" ? 0 : 1,
            transform: phase === "in" ? "scale(0.9)" : "scale(1)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        />
        <p
          className="font-bangla"
          style={{
            color: "rgba(245,215,110,0.85)",
            fontSize: 18,
            letterSpacing: "0.08em",
            opacity: phase === "hold" || phase === "out" ? 1 : 0,
            transition: "opacity 0.5s ease 0.2s",
          }}
        >
          বাংলা প্লাস
        </p>
      </div>
    </div>
  );
}

export default function App() {
  const [ready, setReady] = useState(false);

  return (
    <>
      {!ready && <Preloader onDone={() => setReady(true)} />}
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/watch/:id" element={<Watch />} />
          <Route path="/account" element={<Account />} />
          <Route path="/about" element={<About />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/refund" element={<Refund />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
