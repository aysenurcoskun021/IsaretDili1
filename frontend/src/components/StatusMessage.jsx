import { CheckCircle2, AlertCircle } from "lucide-react";

export default function StatusMessage({ type = "success", children }) {
  if (!children) return null;
  const Icon = type === "error" ? AlertCircle : CheckCircle2;
  return <div className={`status-message status-message--${type}`} role={type === "error" ? "alert" : "status"}><Icon size={18} /> <span>{children}</span></div>;
}