import { Camera, CameraOff, MessageSquareText, ShieldCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import PageIntro from "../components/PageIntro.jsx";
import SiteLayout from "../components/SiteLayout.jsx";

export default function SignToTextPage() {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState("");

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setCameraActive(false);
  };

  const startCamera = async () => {
    setCameraError("");

    if (!navigator.mediaDevices?.getUserMedia) {
      setCameraError("Bu tarayıcı kamera erişimini desteklemiyor.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user"
        },
        audio: false
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      setCameraActive(true);
    } catch {
      setCameraError(
        "Kamera açılamadı. Tarayıcı kamera iznini ve cihaz ayarlarını kontrol et."
      );
    }
  };

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  return (
    <SiteLayout className="content-page">
      <main className="page-content translation-page">
        <PageIntro
          kicker="İŞARETTEN METNE"
          title="İşaretleri kameradan"
          accent="metne dönüştür"
        >
          Kamera görüntüsü yapay zekâ modeline aktarılacak ve algılanan Türk
          İşaret Dili ifadelerinin anlamlı Türkçe cümlelere dönüştürülmesi
          hedeflenecek.
        </PageIntro>

        <section className="translator-layout sign-camera-layout">
          <section className="translator-panel">
            <div className="translator-panel__heading">
              <Camera size={22} />
              <div>
                <h2>Kamera</h2>
                <p>Ellerinin ve üst bedeninin kadrajda kalmasına dikkat et</p>
              </div>
            </div>

            <div className={`camera-stage ${cameraActive ? "is-active" : ""}`}>
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                aria-label="Canlı kamera önizlemesi"
              />

              {!cameraActive && (
                <div className="camera-stage__placeholder">
                  <Camera size={42} />
                  <strong>Kamera kapalı</strong>
                  <p>Kamera yalnızca sen izin verdiğinde açılır.</p>
                </div>
              )}
            </div>

            {cameraError && (
              <p className="translator-message translator-message--error" role="alert">
                {cameraError}
              </p>
            )}

            <div className="camera-actions">
              {!cameraActive ? (
                <button
                  type="button"
                  className="primary-button magnetic"
                  onClick={startCamera}
                >
                  <Camera size={18} />
                  Kamerayı başlat
                </button>
              ) : (
                <button
                  type="button"
                  className="secondary-button magnetic"
                  onClick={stopCamera}
                >
                  <CameraOff size={18} />
                  Kamerayı kapat
                </button>
              )}
            </div>
          </section>

          <section className="translator-panel translator-result">
            <div className="translator-panel__heading">
              <MessageSquareText size={22} />
              <div>
                <h2>Algılanan metin</h2>
                <p>Yapay zekâ sonucu bu alanda gösterilecek</p>
              </div>
            </div>

            <div className="integration-notice">
              <ShieldCheck size={34} />
              <h3>Kamera önizlemesi hazır</h3>
              <p>
                Güncel backend projesinde işaretten metne tahmin endpoint'i
                henüz bulunmuyor. Bu nedenle SignBridge sahte bir çeviri sonucu
                göstermiyor. Yapay zekâ endpoint'i eklendiğinde kamera akışından
                çıkarılan veri bu sonuç alanına bağlanabilir.
              </p>
            </div>
          </section>
        </section>
      </main>
    </SiteLayout>
  );
}
