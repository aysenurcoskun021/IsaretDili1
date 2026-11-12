import { ArrowRight, FileText, PlayCircle, Video } from "lucide-react";
import { useState } from "react";
import PageIntro from "../components/PageIntro.jsx";
import SiteLayout from "../components/SiteLayout.jsx";
import { useApp } from "../context/AppContext.jsx";
import { translateTextToSign } from "../services/translationService.js";

export default function TextToSignPage() {
  const { settings } = useApp();
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const cleanText = text.trim();

    if (!cleanText) {
      setError("Çevirmek istediğin metni yazmalısın.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);
    setActiveIndex(0);

    try {
      const translation = await translateTextToSign(cleanText);
      setResult(translation);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  };

  const videos = result?.videoResults || [];
  const activeVideo = videos[activeIndex];

  return (
    <SiteLayout className="content-page">
      <main className="page-content translation-page">
        <PageIntro
          kicker="METİNDEN İŞARETE"
          title="Metni işaret diliyle"
          accent="buluştur"
        >
          Metnini yaz. SignBridge mevcut backend servisiyle metni kelimelere
          ayırır ve veritabanında videosu bulunan işaretleri sırayla gösterir.
        </PageIntro>

        <section className="translator-layout">
          <form className="translator-panel" onSubmit={handleSubmit}>
            <div className="translator-panel__heading">
              <FileText size={22} />
              <div>
                <h2>Çevrilecek metin</h2>
                <p>Kısa bir kelime veya cümle yazabilirsin</p>
              </div>
            </div>

            <label className="translator-textarea">
              <span>Metin</span>
              <textarea
                value={text}
                onChange={(event) => setText(event.target.value)}
                placeholder="Örneğin: Merhaba bugün nasılsın"
                rows={7}
                maxLength={500}
              />
              <small>{text.length}/500 karakter</small>
            </label>

            {error && (
              <p className="translator-message translator-message--error" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="primary-button translator-submit magnetic"
              disabled={loading}
            >
              {loading ? "Çevriliyor..." : "İşaret diline çevir"}
              <ArrowRight size={18} />
            </button>
          </form>

          <section className="translator-panel translator-result" aria-live="polite">
            <div className="translator-panel__heading">
              <Video size={22} />
              <div>
                <h2>İşaret dili çıktısı</h2>
                <p>Bulunan videolar burada gösterilir</p>
              </div>
            </div>

            {!result && !loading && (
              <div className="translator-placeholder">
                <PlayCircle size={42} />
                <strong>Çeviri için hazır</strong>
                <p>Metni gönderdiğinde sonuç bu alanda görüntülenecek.</p>
              </div>
            )}

            {loading && (
              <div className="translator-placeholder" role="status">
                <span className="translation-loader" />
                <strong>Metin işleniyor</strong>
                <p>Backend ve video kayıtları kontrol ediliyor.</p>
              </div>
            )}

            {result && (
              <div className="translation-output">
                <div className="translation-original">
                  <span>Gönderilen metin</span>
                  <p>{result.original_text}</p>
                </div>

                <div className="translation-word-list" aria-label="Çeviri kelimeleri">
                  {videos.map((item, index) => (
                    <button
                      type="button"
                      key={`${item.word}-${index}`}
                      className={activeIndex === index ? "active" : ""}
                      onClick={() => setActiveIndex(index)}
                    >
                      {item.word}
                      {!item.available && <small>video yok</small>}
                    </button>
                  ))}
                </div>

                {activeVideo?.available ? (
                  <video
                    key={activeVideo.video.video_url}
                    className="sign-video-player"
                    controls
                    autoPlay
                    playsInline
                    onLoadedMetadata={(event) => {
                      event.currentTarget.playbackRate = settings.playbackSpeed;
                    }}
                  >
                    <source src={activeVideo.video.video_url} />
                    Tarayıcınız video oynatmayı desteklemiyor.
                  </video>
                ) : (
                  <div className="translator-placeholder translator-placeholder--compact">
                    <Video size={32} />
                    <strong>Bu kelime için video bulunamadı</strong>
                    <p>
                      Veritabanına video eklendiğinde bu alan otomatik olarak
                      kullanılabilir hâle gelir.
                    </p>
                  </div>
                )}
              </div>
            )}
          </section>
        </section>
      </main>
    </SiteLayout>
  );
}
