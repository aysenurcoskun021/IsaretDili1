import { BookOpen, Heart, Search, Video, X } from "lucide-react"; import { useMemo, useState } from "react"; import SiteLayout from "../components/SiteLayout.jsx"; import { useApp } from "../context/AppContext.jsx"; import { dictionary } from "../data/dictionary.js";
import { getSignVideo } from "../services/videoService.js";
export default function DictionaryPage(){const [query,setQuery]=useState("");const [letter,setLetter]=useState("Tümü");const [selectedVideo, setSelectedVideo] = useState(null);
const [videoLoading, setVideoLoading] = useState(false);
const [videoError, setVideoError] = useState("");const {favorites,toggleFavorite}=useApp();const letters=["Tümü",...new Set(dictionary.map(item=>item.word.charAt(0).toLocaleUpperCase("tr")))].sort((a,b)=>a==="Tümü"?-1:b==="Tümü"?1:a.localeCompare(b,"tr"));const filtered=useMemo(()=>dictionary.filter(item=>item.word.toLocaleLowerCase("tr").includes(query.toLocaleLowerCase("tr"))&&(letter==="Tümü"||item.word.charAt(0).toLocaleUpperCase("tr")==letter)),[query,letter]);
async function handleVideoClick(word) {
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
}
return <SiteLayout className="content-page"><main className="page-content"><div className="page-heading"><span className="eyebrow"><span/> KELİME KÜTÜPHANESİ</span><h1>İşaret dili <span>sözlüğü</span></h1><p>Kelimeyi ara, anlamını keşfet ve öğrenmek istediklerini favorilerine ekle.</p><div className="dictionary-stat"><BookOpen size={17}/><strong>{dictionary.length} demo kelime</strong><span>·</span><span>Alfabetik sıralama</span></div></div><label className="search-box"><Search size={19}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Kelime ara... ör. merhaba" aria-label="Sözlükte kelime ara"/>{query&&<button type="button" aria-label="Aramayı temizle" onClick={()=>setQuery("")}><X size={16}/></button>}</label><div className="letter-filter" aria-label="Harf seçimi">{letters.map(item=><button type="button" key={item} className={letter===item?"active":""} onClick={()=>setLetter(item)}>{item}</button>)}</div><div className="results-caption">{filtered.length} kelime gösteriliyor <span>· Alfabetik</span></div>{filtered.length?<div className="dictionary-grid">{filtered.map(item=><article className="word-card" key={item.id}><div className="word-card__top"><span className="word-letter">{item.word.charAt(0).toLocaleUpperCase("tr")}</span><button className={`icon-button ${favorites.includes(item.word)?"is-favorite":""}`} aria-label={favorites.includes(item.word)?`${item.word} favorilerden çıkar`:`${item.word} favorilere ekle`} onClick={()=>toggleFavorite(item.word)}><Heart size={18} fill={favorites.includes(item.word)?"currentColor":"none"}/></button></div><h2>{item.word}</h2><p>{item.meaning}</p><div className="word-card__bottom"><span className="word-category">{item.category}</span><button
  type="button"
  className="video-badge"
  onClick={() => handleVideoClick(item.word)}
>
  <Video size={14} />
  Video İzle
</button></div></article>)}</div>:<div className="empty-state"><div className="empty-state__icon"><Search size={28}/></div><h2>Kelime bulunamadı</h2><p>Farklı bir yazım veya başka bir harf deneyebilirsin.</p><button className="secondary-button" onClick={()=>{setQuery("");setLetter("Tümü");}}>Filtreleri temizle</button></div>}{videoLoading && (
  <p>Video yükleniyor...</p>
)}

{videoError && (
  <p style={{ color: "red" }}>{videoError}</p>
)}

{selectedVideo && (
  <div className="video-player">
    <h2>{selectedVideo.word} - İşaret Dili Videosu</h2>

    <video
      key={selectedVideo.video_url}
      controls
      autoPlay
      playsInline
      style={{
        width: "100%",
        maxWidth: "600px",
        borderRadius: "12px"
      }}
    >
      <source
        src={selectedVideo.video_url}
        type="video/mp4"
      />
      Tarayıcınız video oynatmayı desteklemiyor.
    </video>
  </div>
)}</main></SiteLayout>}
