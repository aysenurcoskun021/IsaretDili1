const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
console.log("BACKEND ADRESİ:", API_BASE_URL);
async function request(path, payload) {
  const response = await fetch(`${API_BASE_URL.replace(/\/$/, "")}${path}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || "İşlem tamamlanamadı. Lütfen tekrar deneyin.");
  return data;
}

export const authService = {
  async register(payload) {
    if (!API_BASE_URL) return { mode: "demo", message: "Demo hesap oluşturuldu." };
    return request("/auth/register", payload);
  },
  async login(payload) {
    if (!API_BASE_URL) return { mode: "demo", message: "Demo giriş başarılı." };
    return request("/auth/login", payload);
  },
  async requestPasswordReset({ method, value }) {
    if (!API_BASE_URL) return { mode: "demo", message: "Demo sıfırlama isteği hazırlandı." };
    return request("/auth/forgot-password", method === "email" ? { email: value } : { phone: value });
  },
  async changePassword(payload) {
    if (!API_BASE_URL) return { mode: "demo", message: "Demo: Şifre değişikliği formu doğrulandı. Kalıcı değişiklik için backend bağlantısı gerekir." };
    return request("/auth/change-password", payload);
  }
};