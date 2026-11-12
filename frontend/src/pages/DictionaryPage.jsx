import { BookOpen, Heart, Search, Video, X } from "lucide-react";
import { useMemo, useState } from "react";
import SignVideoModal from "../components/SignVideoModal.jsx";
import SiteLayout from "../components/SiteLayout.jsx";
import { useApp } from "../context/AppContext.jsx";
import { dictionary } from "../data/dictionary.js";
import { getSignVideo } from "../services/videoService.js";

const isNumberWord = (word) => /^\d+$/.test(word);

const getDictionaryGroup = (word) => {
  if (isNumberWord(word)) {
    return "Sayılar";
  }

  return word.charAt(0).toLocaleUpperCase("tr-TR");
};

const buildFilters = () => {
  const letters = [
    ...new Set(
      dictionary
        .filter((item) => !isNumberWord(item.word))
        .map((item) => getDictionaryGroup(item.word))
    )
  ].sort((a, b) =>
    a.localeCompare(b, "tr-TR", {
      sensitivity: "base"
    })
  );

  const insertionIndex = letters.findIndex((item) => item === "Ş");

  if (insertionIndex === -1) {
    return ["Tümü", ...letters, "Sayılar"];
  }

  return [
    "Tümü",
    ...letters.slice(0, insertionIndex),
    "Sayılar",
    ...letters.slice(insertionIndex)
  ];
};

const filters = buildFilters();

export default function DictionaryPage() {
  const { favorites, toggleFavorite, settings } = useApp();
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("Tümü");
  const [modalWord, setModalWord] = useState("");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoLoading, setVideoLoading] = useState(false);
  const [videoError, setVideoError] = useState("");

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("tr-TR");

    return dictionary.filter((item) => {
      const matchesSearch = item.word
        .toLocaleLowerCase("tr-TR")
        .includes(normalizedQuery);

      const matchesFilter =
        activeFilter === "Tümü" ||
        getDictionaryGroup(item.word) === activeFilter;

      return matchesSearch && matchesFilter;
    });
  }, [query, activeFilter]);

  const closeVideoModal = () => {
    setModalWord("");
    setSelectedVideo(null);
    setVideoError("");
    setVideoLoading(false);
  };

  const handleVideoClick = async (word) => {
    setModalWord(word);
    setSelectedVideo(null);
    setVideoError("");
    setVideoLoading(true);

    try {
      const video = await getSignVideo(word);
      setSelectedVideo(video);
    } catch (error) {
      setVideoError(error.message);
    } finally {
      setVideoLoading(false);
    }
  };

  return (
    <SiteLayout className="content-page">
      <main className="page-content">
        <div className="page-heading">
          <span className="eyebrow">
            <span /> KELİME KÜTÜPHANESİ
          </span>
          <h1>
            İşaret dili <span>sözlüğü</span>
          </h1>
          <p>
            Kelimeyi ara, anlamını keşfet ve öğrenmek istediklerini
            favorilerine ekle.
          </p>

          <div className="dictionary-stat">
            <BookOpen size={17} />
            <strong>{dictionary.length} kelime</strong>
            <span>·</span>
            <span>Alfabetik sıralama</span>
          </div>
        </div>

        <label className="search-box">
          <Search size={19} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Kelime ara... ör. merhaba"
            aria-label="Sözlükte kelime ara"
          />

          {query && (
            <button
              type="button"
              aria-label="Aramayı temizle"
              onClick={() => setQuery("")}
            >
              <X size={16} />
            </button>
          )}
        </label>

        <div className="letter-filter" aria-label="Harf seçimi">
          {filters.map((item) => (
            <button
              type="button"
              key={item}
              className={activeFilter === item ? "active" : ""}
              onClick={() => setActiveFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="results-caption">
          {filtered.length} kelime gösteriliyor <span>· Alfabetik</span>
        </div>

        {filtered.length ? (
          <div className="dictionary-grid">
            {filtered.map((item) => (
              <article className="word-card" key={item.id}>
                <div className="word-card__top">
                  <span className="word-letter">
                    {getDictionaryGroup(item.word) === "Sayılar"
                      ? "#"
                      : getDictionaryGroup(item.word)}
                  </span>

                  <button
                    type="button"
                    className={`icon-button ${
                      favorites.includes(item.word) ? "is-favorite" : ""
                    }`}
                    aria-label={
                      favorites.includes(item.word)
                        ? `${item.word} favorilerden çıkar`
                        : `${item.word} favorilere ekle`
                    }
                    onClick={() => toggleFavorite(item.word)}
                  >
                    <Heart
                      size={18}
                      fill={favorites.includes(item.word) ? "currentColor" : "none"}
                    />
                  </button>
                </div>

                <h2>{item.word}</h2>
                <p>{item.meaning}</p>

                <div className="word-card__bottom">
                  <span className="word-category">{item.category}</span>

                  <button
                    type="button"
                    className="video-badge"
                    onClick={() => handleVideoClick(item.word)}
                  >
                    <Video size={14} />
                    Video İzle
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state__icon">
              <Search size={28} />
            </div>
            <h2>Kelime bulunamadı</h2>
            <p>Farklı bir yazım veya başka bir harf deneyebilirsin.</p>
            <button
              type="button"
              className="secondary-button"
              onClick={() => {
                setQuery("");
                setActiveFilter("Tümü");
              }}
            >
              Filtreleri temizle
            </button>
          </div>
        )}
      </main>

      {modalWord && (
        <SignVideoModal
          word={modalWord}
          video={selectedVideo}
          loading={videoLoading}
          error={videoError}
          playbackSpeed={settings.playbackSpeed}
          onClose={closeVideoModal}
        />
      )}
    </SiteLayout>
  );
}
