import { Handshake } from "lucide-react";
import { Link } from "react-router-dom";

export default function BrandMark({ compact = false }) {
  return (
    <Link className={`brand-mark ${compact ? "brand-mark--compact" : ""}`} to="/home" aria-label="SignBridge ana sayfa">
      <span className="brand-mark__icon" aria-hidden="true"><Handshake size={27} strokeWidth={1.8} /></span>
      <span className="brand-mark__word">Sign<span>Bridge</span></span>
    </Link>
  );
}