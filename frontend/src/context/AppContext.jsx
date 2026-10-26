import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AppContext = createContext(null);
const readStorage = (key, fallback) => {
  try { const value = localStorage.getItem(key); return value ? JSON.parse(value) : fallback; }
  catch { return fallback; }
};

export function AppProvider({ children }) {
  const [user, setUser] = useState(() => readStorage("signbridge-user", null));
  const [favorites, setFavorites] = useState(() => readStorage("signbridge-favorites", []));
  const [settings, setSettings] = useState(() => ({
    theme: "navy", fontSize: 16, fontFamily: "Inter", playbackSpeed: 1,
    ...readStorage("signbridge-settings", {})
  }));

  useEffect(() => { try { user ? localStorage.setItem("signbridge-user", JSON.stringify(user)) : localStorage.removeItem("signbridge-user"); } catch {} }, [user]);
  useEffect(() => { try { localStorage.setItem("signbridge-favorites", JSON.stringify(favorites)); } catch {} }, [favorites]);
  useEffect(() => { try { localStorage.setItem("signbridge-settings", JSON.stringify(settings)); } catch {} }, [settings]);
  useEffect(() => {
    const root = document.documentElement;
    const resolveTheme = () => {
      if (settings.theme === "sunset") {
        const hour = new Date().getHours();
        root.dataset.theme = hour >= 19 || hour < 7 ? "navy" : "amber";
      } else if (settings.theme === "system") {
        root.dataset.theme = window.matchMedia?.("(prefers-color-scheme: light)").matches ? "light" : "navy";
      } else {
        root.dataset.theme = settings.theme;
      }
    };
    resolveTheme();
    const media = window.matchMedia?.("(prefers-color-scheme: light)");
    const onSystemThemeChange = () => { if (settings.theme === "system") resolveTheme(); };
    media?.addEventListener?.("change", onSystemThemeChange);
    const timer = settings.theme === "sunset" ? window.setInterval(resolveTheme, 60000) : null;
    root.style.setProperty("--user-font-size", `${settings.fontSize}px`);
    root.style.setProperty("--font-scale", String(Number(settings.fontSize || 16) / 16));
    const familyMap = { "OpenDyslexic": "Arial, sans-serif", "Atkinson Hyperlegible": "\"Atkinson Hyperlegible\", sans-serif", "Plus Jakarta Sans": "\"Plus Jakarta Sans\", sans-serif", "Cascadia Code": "\"Cascadia Code\", Consolas, \"Courier New\", monospace", "system-ui": "system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif" };
    root.style.setProperty("--user-font-family", familyMap[settings.fontFamily] || `\"${settings.fontFamily || "Inter"}\", sans-serif`);
    return () => { if (timer) window.clearInterval(timer); media?.removeEventListener?.("change", onSystemThemeChange); };
  }, [settings]);

  const value = useMemo(() => ({
    user,
    isAuthenticated: Boolean(user),
    login: (profile) => setUser(profile),
    logout: () => setUser(null),
    favorites,
    toggleFavorite: (word) => setFavorites((current) => current.includes(word) ? current.filter((item) => item !== word) : [...current, word]),
    settings,
    updateSettings: (patch) => setSettings((current) => ({ ...current, ...patch }))
  }), [user, favorites, settings]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
}