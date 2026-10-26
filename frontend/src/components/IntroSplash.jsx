import { useEffect } from "react";
import { Hand, MessageCircle } from "lucide-react";
import BrandMark from "./BrandMark.jsx";

export default function IntroSplash({ onFinish }) {
  useEffect(() => {
    const timer = window.setTimeout(onFinish, 5000);
    return () => window.clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="intro-splash" role="status" aria-label="SignBridge açılıyor">
      <div className="intro-splash__glow" />
      <div className="intro-splash__content">
        <div className="intro-splash__symbol"><Hand size={42} strokeWidth={1.5} /><MessageCircle size={34} strokeWidth={1.5} /></div>
        <BrandMark />
        <p>İletişim <span>engel tanımaz.</span></p>
        <div className="intro-splash__loader"><span /></div>
        <small>Herkes için iletişim.</small>
      </div>
    </div>
  );
}