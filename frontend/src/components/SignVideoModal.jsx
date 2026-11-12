import { useEffect } from "react";
import { Video, X } from "lucide-react";

export default function SignVideoModal({
  word,
  video,
  loading,
  error,
  playbackSpeed = 1,
  onClose
}) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.classList.add("modal-open");

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("modal-open");
    };
  }, [onClose]);

  const handleVideoLoaded = (event) => {
    event.currentTarget.playbackRate = playbackSpeed;
  };

  return (
    <div
      className="video-modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        className="video-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="sign-video-title"
      >
        <div className="video-modal__header">
          <div>
            <span className="eyebrow">
              <span /> İŞARET VİDEOSU
            </span>
            <h2 id="sign-video-title">{word}</h2>
          </div>

          <button
            type="button"
            className="icon-button video-modal__close"
            onClick={onClose}
            aria-label="Video penceresini kapat"
          >
            <X size={20} />
          </button>
        </div>

        <div className="video-modal__body">
          {loading && (
            <div className="video-modal__state" role="status">
              <Video size={30} />
              <p>Video yükleniyor</p>
            </div>
          )}

          {!loading && error && (
            <div className="video-modal__state video-modal__state--error" role="alert">
              <Video size={30} />
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && video?.video_url && (
            <video
              key={video.video_url}
              className="sign-video-player"
              controls
              autoPlay
              playsInline
              onLoadedMetadata={handleVideoLoaded}
            >
              <source src={video.video_url} />
              Tarayıcınız video oynatmayı desteklemiyor.
            </video>
          )}
        </div>
      </section>
    </div>
  );
}
