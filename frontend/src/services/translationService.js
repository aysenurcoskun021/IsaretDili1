
import { API_BASE_URL } from "./apiConfig.js";

export async function translateTextToSign(text) {
  const response = await fetch(
    `${API_BASE_URL}/translate/text-to-sign`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    }
  );

  if (!response.ok) {
    throw new Error("Metin çeviri servisine ulaşılamadı.");
  }

  const result = await response.json();

  if (!result.success) {
    throw new Error(
      result.message || "Metin işlenemedi."
    );
  }

  const videoResults = (result.results || []).map(
    (item) => ({
      word: item.word,
      video: item.video_url
        ? {
            video_url: item.video_url,
            category: item.category,
          }
        : null,
      available: Boolean(item.found && item.video_url),
    })
  );

  return {
    ...result,
    videoResults,
  };
}
