const API_URL = "http://127.0.0.1:8000";

export async function getSignVideo(word) {
  const response = await fetch(
    `${API_URL}/videos/${encodeURIComponent(word)}`
  );

  if (!response.ok) {
    throw new Error(
      response.status === 404
        ? "Bu kelimeye ait video bulunamadı."
        : "Video bilgisi alınamadı."
    );
  }

  return await response.json();
}