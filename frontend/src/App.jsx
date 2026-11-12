import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import IntroSplash from "./components/IntroSplash.jsx";
import RequireAuth from "./components/RequireAuth.jsx";
import ComingSoonPage from "./pages/ComingSoonPage.jsx";
import DictionaryPage from "./pages/DictionaryPage.jsx";
import EmailCheckPage from "./pages/EmailCheckPage.jsx";
import FavoritesPage from "./pages/FavoritesPage.jsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import HowItWorksPage from "./pages/HowItWorksPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import PrivacyPage from "./pages/PrivacyPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import SignToTextPage from "./pages/SignToTextPage.jsx";
import SupportPage from "./pages/SupportPage.jsx";
import TermsPage from "./pages/TermsPage.jsx";
import TextToSignPage from "./pages/TextToSignPage.jsx";

export default function App() {
  const [showIntro, setShowIntro] = useState(() => {
    try {
      return !sessionStorage.getItem("signbridge-intro-seen");
    } catch {
      return false;
    }
  });

  const location = useLocation();

  useEffect(() => {
    if (!showIntro) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setShowIntro(false);

      try {
        sessionStorage.setItem("signbridge-intro-seen", "true");
      } catch {
        // Session storage kullanılamıyorsa giriş animasyonu yine tamamlanır.
      }
    }, 5000);

    return () => window.clearTimeout(timer);
  }, [showIntro]);

  useEffect(() => {
    const titles = {
      "/": "Kayıt Ol",
      "/login": "Giriş Yap",
      "/forgot-password": "Şifremi Unuttum",
      "/check-email": "Şifre Yenileme",
      "/home": "Ana Sayfa",
      "/profile": "Profil ve Ayarlar",
      "/favorites": "Favoriler",
      "/dictionary": "Sözlük",
      "/metinden-isarete": "Metinden İşarete",
      "/isaretten-metne": "İşaretten Metne",
      "/gizlilik": "Gizlilik Politikası",
      "/kullanim": "Kullanım Koşulları",
      "/destek": "Destek",
      "/nasil-calisir": "Nasıl Çalışır?",
      "/egitim": "Eğitim — Yakında",
      "/blog": "Blog — Yakında"
    };

    document.title = `SignBridge | ${
      titles[location.pathname] || "Sayfa bulunamadı"
    }`;
  }, [location.pathname]);

  return (
    <>
      {showIntro && (
        <IntroSplash onFinish={() => setShowIntro(false)} />
      )}

      <Routes>
        <Route path="/" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/check-email" element={<EmailCheckPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/gizlilik" element={<PrivacyPage />} />
        <Route path="/kullanim" element={<TermsPage />} />
        <Route path="/destek" element={<SupportPage />} />
        <Route path="/nasil-calisir" element={<HowItWorksPage />} />

        <Route
          path="/metinden-isarete"
          element={
            <RequireAuth>
              <TextToSignPage />
            </RequireAuth>
          }
        />

        <Route
          path="/isaretten-metne"
          element={
            <RequireAuth>
              <SignToTextPage />
            </RequireAuth>
          }
        />

        <Route
          path="/profile"
          element={
            <RequireAuth>
              <ProfilePage />
            </RequireAuth>
          }
        />

        <Route
          path="/favorites"
          element={
            <RequireAuth>
              <FavoritesPage />
            </RequireAuth>
          }
        />

        <Route
          path="/dictionary"
          element={
            <RequireAuth>
              <DictionaryPage />
            </RequireAuth>
          }
        />

        <Route
          path="/egitim"
          element={
            <RequireAuth>
              <ComingSoonPage type="education" />
            </RequireAuth>
          }
        />

        <Route
          path="/blog"
          element={
            <RequireAuth>
              <ComingSoonPage type="blog" />
            </RequireAuth>
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
