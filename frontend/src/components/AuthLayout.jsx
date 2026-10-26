import { Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import AuthIllustrationPanel from "./AuthIllustrationPanel.jsx";
import TopBar from "./TopBar.jsx";

const ILLUSTRATED_VARIANTS = new Set(["signup", "login"]);

/** Shared layout for authentication pages. The illustration is only used on signup/login. */
export default function AuthLayout({ variant = "signup", children }) {
  const showIllustration = ILLUSTRATED_VARIANTS.has(variant);
  const layoutClass = showIllustration
    ? "auth-grid auth-grid--with-illustration"
    : "auth-grid auth-grid--standalone";

  return (
    <div className={`app-shell app-shell--${variant}`}>
      <div className="ambient ambient--one" aria-hidden="true" />
      <div className="ambient ambient--two" aria-hidden="true" />

      <div className="site-container page-wrap">
        <TopBar />

        <main className={layoutClass}>
          {showIllustration && <AuthIllustrationPanel />}
          <section className="form-panel" aria-label="SignBridge hesap işlemleri">
            {children}
          </section>
        </main>

        <footer className="site-footer site-footer--full auth-footer">
          <span>© 2026 SignBridge. Tüm hakları saklıdır.</span>
          <nav className="footer-links" aria-label="Yasal bağlantılar">
            <Link to="/home#privacy">Gizlilik</Link>
            <Link to="/home#terms">Kullanım koşulları</Link>
            <a href="mailto:destek@signbridge.app">Destek</a>
          </nav>
          <strong><ShieldCheck size={14} aria-hidden="true" /> Güvenli ve erişilebilir iletişim</strong>
        </footer>
      </div>
    </div>
  );
}
