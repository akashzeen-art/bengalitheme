import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex flex-col items-center justify-center px-4 text-center pt-20">
        <p className="text-6xl font-black text-primary mb-2">404</p>
        <h1 className="text-2xl font-bold text-white mb-2">Page not found</h1>
        <p className="font-bangla text-white/50 mb-8">এই পৃষ্ঠাটি পাওয়া যায়নি</p>
        <Link to="/" className="bg-primary text-white px-6 py-3 font-bold hover:bg-primary/90 transition-colors">
          Back Home
        </Link>
      </div>
      <Footer />
    </div>
  );
}
