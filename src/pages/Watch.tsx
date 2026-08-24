import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { findVideoById } from "@/data/videos";

export default function Watch() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    const video = id ? findVideoById(id) : undefined;
    navigate("/", { replace: true });
    setTimeout(() => {
      if (!isAuthenticated) {
        window.dispatchEvent(new CustomEvent("openAuthModal", { detail: { videoId: id } }));
      } else if (video) {
        window.dispatchEvent(new CustomEvent("openVideoModal", { detail: { videoId: id } }));
      }
    }, 100);
  }, [id, navigate]);

  return null;
}
