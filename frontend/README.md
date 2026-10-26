# SignBridge v11

SignBridge; Türk İşaret Dili (TİD) kullanan bireyler ile işaret dili bilmeyen bireyler arasındaki iletişimi kolaylaştırmayı amaçlayan, erişilebilirlik odaklı bir web uygulaması projesidir. Arayüz React, Vite ve Tailwind CSS temeli üzerinde geliştirilmiştir. Projenin hedefi iki yönlü bir iletişim deneyimi sunmaktır: metinden işaret diline ve kamera üzerinden işaret dilinden anlamlı Türkçe metne dönüşüm.

> **Sürüm notu:** v11 bir frontend/prototip sürümüdür. Kamera tabanlı gerçek işaret algılama, yapay zekâ çeviri modeli, gerçek kullanıcı hesabı, kalıcı veritabanı işlemleri ve gerçek video üretimi/oynatımı için backend ve harici servis entegrasyonları gereklidir. Arayüz, bu servisler bağlıymış gibi sahte başarı üretmez.

## 1. Projenin amacı

SignBridge'in temel amacı iletişim engellerini azaltmak ve farklı kullanıcı ihtiyaçlarına uyarlanabilen bir deneyim oluşturmaktır. Uygulama aşağıdaki kullanım senaryolarını hedefler:

- Kullanıcının yazdığı Türkçe metnin TİD yapısına uygun biçimde işaret dili çıktısına dönüştürülmesi
- Kamera görüntüsündeki el ve vücut hareketlerinin yapay zekâ modeliyle yorumlanarak yalnızca kelime dizisi değil, bağlamı mümkün olduğunca koruyan anlamlı Türkçe cümleler oluşturulması
- Sözlük üzerinden temel TİD kelimelerinin görüntülenmesi ve favorilere eklenmesi
- Kayıt olmadan sınırlı biçimde kullanılabilen hızlı iletişim ifadeleri
- Tema, yazı tipi, metin boyutu ve oynatma hızı gibi erişilebilirlik tercihlerinin kişiselleştirilmesi
- Gelecekte Eğitim ve Blog alanlarıyla öğrenme, içerik paylaşımı ve topluluk etkileşiminin desteklenmesi

## 2. Kullanılan teknolojiler

- **React 18:** Bileşen tabanlı kullanıcı arayüzü
- **Vite 6:** Geliştirme sunucusu ve production build süreci
- **React Router:** Sayfalar ve uygulama rotaları
- **Tailwind CSS:** Yardımcı stil altyapısı
- **Lucide React:** Arayüz ikonları
- **CSS Custom Properties:** Tema ve erişilebilirlik değişkenleri
- **localStorage:** Backend bağlı değilken kullanıcı tercihlerini cihazda korumak için geçici yerel saklama

Planlanan veritabanı/backend tarafı PostgreSQL/Supabase şemasına göre hazırlanmıştır; ancak bu ZIP içinde gerçek Supabase bağlantısı zorunlu değildir.

## 3. Kurulum

Bilgisayarınızda Node.js ve npm kurulu olmalıdır.

```bash
npm install
npm run dev
```

Vite geliştirme sunucusunun verdiği yerel adres tarayıcıda açılarak proje çalıştırılabilir.

Production build için:

```bash
npm run build
```

Build çıktısını yerel olarak önizlemek için:

```bash
npm run preview
```

## 4. Klasör yapısı

```text
src/
├── components/      Ortak ve tekrar kullanılabilir arayüz bileşenleri
├── context/         Uygulama genelindeki kullanıcı ve tercih state yönetimi
├── data/            Sözlük, hızlı iletişim ve veritabanı şema referansları
├── pages/           Route bazlı uygulama sayfaları
├── services/        Auth ve gelecekteki API/backend servis katmanı
├── styles/          Genel, sayfa, auth ve illüstrasyon stilleri
├── utils/           Dokunsal geri bildirim gibi yardımcı fonksiyonlar
├── App.jsx          Uygulama route yapısı
└── main.jsx         React başlangıç noktası
```

Kod organizasyonunda ortak davranışların tekrar edilmemesi ve sayfa sorumluluklarının ayrılması hedeflenir.

## 5. v11 ile gelen temel güncellemeler

### Tema sistemi

Uygulamadaki tema değişimi yalnızca arka planı değil; butonları, vurguları, kartları, Aurora animasyonunu, geçiş efektlerini ve uygun arayüz renklerini de etkiler. Siyah - Gri temada renk paleti monokrom olacak şekilde siyah, beyaz ve gri tonlarla sınırlandırılmıştır.

Giriş ve kayıt ekranlarındaki mevcut işaret dili illüstrasyonunun geometrisi ve karakter yapısı korunmuştur. v11'de illüstrasyon renkleri aktif temaya bağlanmıştır. Böylece tema değiştiğinde karakterlerin, konuşma balonlarının, çevresel şekillerin ve vurgu renklerinin paleti de değişir.

### Aurora arka planı

Aurora katmanı lacivert, mavi ve mor temelli ana görünümde statik değildir. Yavaş hareket eden, nefes alma hissi veren gradient/blur katmanları kullanılır. Diğer temalarda Aurora renkleri seçili temanın vurgu değişkenlerinden üretilir.

### Liquid Morphing geçişleri

Sayfalar ve modlar arasında sert bir değişim yerine opacity, blur, scale ve clip-path tabanlı akışkan geçiş uygulanır. `prefers-reduced-motion` kullanan kişiler için hareket miktarı azaltılır.

### Dokunsal geri bildirim

Destekleyen mobil cihaz ve tarayıcılarda `navigator.vibrate()` tabanlı hafif dokunsal geri bildirim kullanılabilir. Çeviri tamamlanma entegrasyonu için `signbridge:translation-complete` olayı hazırlanmıştır. Tarayıcı veya cihaz desteklemiyorsa uygulama titreşim olmadan çalışmaya devam eder.

### Metin boyutu ve yazı tipi

Metin boyutu ayarı sayfayı `zoom` ile büyütmez. Arayüz metinlerinin font boyutları `--font-scale` üzerinden ölçeklenir. SignBridge marka yazısı bu ayardan bağımsız tutulur.

Desteklenen yazı tipi seçenekleri:

- Arial
- Sistem yazı tipi
- Inter
- Lexend
- Atkinson Hyperlegible
- Plus Jakarta Sans
- Cascadia Code / Consolas

### Hızlı iletişim

Hazır iletişim ifadeleri kategori bazlı sunulur. Mevcut kategoriler ulaşım, sağlık, günlük yaşam ve iletişim gibi gündelik kullanım alanlarını kapsar. Kullanıcı seçtiği ifadeyi daha büyük ve kolay gösterilebilir bir kartta görüntüleyebilir.

### Profil

Profil ekranında kullanıcı kimliği ile profil fotoğrafı hizalı biçimde gösterilir. Fotoğraf ekleme/değiştirme ve fotoğrafı kaldırma arayüzleri bulunur. Gerçek Storage/backend bağlı olmadığı için fotoğraf bu prototipte cihazın `localStorage` alanında data URL olarak tutulur.

Hesabı dondurma ve hesabı silme arayüzleri de bulunmaktadır. Bu işlemler gerçek backend endpoint'i olmadan hesabı değiştirmez veya silmiş gibi davranmaz.

### Yakında alanı

Oturum açmış kullanıcılar üst menüdeki **Yakında** alanından Eğitim ve Blog başlıklarını görebilir. Bu sayfalar gelecek özelliklerin kapsamını açıklar; henüz gerçek servis bağlantısı içermez.

## 6. Sözlük yapısı

v11 sözlüğü **50 ayrı kayıt** içerir. Önceki sürümlerde aynı kayıtta `/` ile birleştirilen kavramlar mümkün olduğunca ayrılmıştır. Örneğin `Ne` ve `Neden`, `Nerede` ve `Nereye`, `Var` ve `Yok`, `Zaman` ve `Saat` ayrı sözlük kayıtlarıdır.

Toplamı 50 kayıtta tutmak için anlam tekrarını azaltan seçim yapılmıştır. Her kayıt gelecekteki `sign_videos` tablosuyla uyumlu alanlara hazırlanmıştır:

- `id`
- `word`
- `letter`
- `description`
- `category`
- `is_quick_phrase`
- `video_data`
- `video_mime_type`
- `video_url`
- `created_at`

Gerçek video bağlantısı bulunmadığı için video alanları bu sürümde boş/null değerlerle temsil edilir.

## 7. Veritabanı şemasıyla uyumluluk

Frontend entegrasyonuna hazırlanırken ekipte belirlenen tablo ve sütun adları korunur. Referans şema `src/data/databaseSchema.js` dosyasında bulunur.

### `users`

```text
id
first_name
last_name
phone
email
user_role
password_hash
avatar_data
avatar_url
terms_accepted
created_at
```

### `user_preferences`

```text
id
user_id
theme
font_size
font_family
playback_speed
updated_at
```

### `user_favorites`

```text
id
user_id
video_id
created_at
```

### `sign_videos`

```text
id
word
letter
description
category
is_quick_phrase
video_data
video_mime_type
video_url
created_at
```

### `app_themes`

```text
id
theme_name
description
```

Bu dosya tek başına veritabanına bağlanmaz. Amaç frontend kodunda kullanılan veri isimlerinin backend şemasıyla çelişmesini önlemektir.

## 8. Gizlilik, kullanım ve destek sayfaları

Uygulamada aşağıdaki rotalar bulunur:

- `/gizlilik` — Gizlilik Politikası taslağı
- `/kullanim` — Kullanım Koşulları taslağı
- `/destek` — SSS, sorun giderme ve geri bildirim alanı

Gizlilik metni; kamera akışı, landmark/iskelet verileri, hesap verileri, teknik veriler, saklama/silme yaklaşımı ve KVKK/GDPR kapsamındaki kullanıcı hakları için proje seviyesinde açıklama sunar. Nihai ürün yayına alınmadan önce gerçek veri akışı ve veri sorumlusu bilgileriyle hukuk incelemesi yapılmalıdır.

## 9. Nasıl çalışır sayfası

`Nasıl kullanılır?` / çalışma mantığı sayfası SignBridge'in temel bileşenlerini kısa kartlarla açıklar:

- Metinden işaret diline dönüşüm hedefi
- Kamera ve yapay zekâ ile işaret dilinden metne dönüşüm hedefi
- Kelime kelime çıktı yerine bağlama uygun anlamlı cümle hedefi
- Hızlı iletişim
- Kişiselleştirilmiş tema ve tipografi
- Sözlük ve planlanan Eğitim alanı
- Planlanan Blog ve sosyalleşme özellikleri

## 10. Erişilebilirlik

Projede erişilebilirlik için aşağıdaki noktalar gözetilir:

- Klavye odak durumları
- Anlamlı `aria-label` kullanımı
- Tema bazlı kontrast
- Yüksek kontrast seçeneği
- Disleksi dostu krem tema
- Alternatif font seçenekleri
- Global metin boyutu ayarı
- `prefers-reduced-motion` desteği
- Mobil dokunma hedefleri
- Responsive grid ve kart düzenleri

## 11. Responsive tasarım

Arayüz masaüstü, tablet ve mobil ekranlarda kullanılacak şekilde media query ve esnek grid/flex yapıları içerir. Navigasyon, profil alanı, sözlük kartları, hızlı iletişim, bilgi kartları ve auth ekranları küçük ekranlarda yeniden düzenlenir.

## 12. Gerçek entegrasyon bekleyen özellikler

Aşağıdaki özellikler v11'de arayüz/prototip seviyesindedir:

- Kamera üzerinden gerçek TİD hareket algılama
- MediaPipe veya eşdeğer landmark çıkarımı
- Yapay zekâ/NLP tabanlı TİD ↔ Türkçe anlamlandırma
- Gerçek metinden işaret dili video/animasyon üretimi
- Supabase/PostgreSQL bağlantısı
- Gerçek kullanıcı kayıt/giriş oturumu
- E-posta/SMS doğrulama ve şifre sıfırlama
- Supabase Storage veya eşdeğer dosya depolama
- Profil fotoğrafının sunucuda tutulması
- Hesap dondurma ve kalıcı hesap silme
- Destek formunun gerçek gönderimi
- Canlı API/sunucu durum göstergesi

Bu alanlarda kullanıcıya sahte bir başarılı işlem sonucu verilmemesi proje kuralıdır.

## 13. Güvenlik notları

- `.env` içinde tutulacak gizli anahtarlar Git deposuna eklenmemelidir.
- Frontend'e service-role veya sunucuya özel gizli anahtar konulmamalıdır.
- Gerçek kimlik doğrulama eklendiğinde erişim politikaları backend/veritabanı tarafında uygulanmalıdır.
- Kamera izinleri yalnızca ihtiyaç duyulan anda istenmelidir.
- Gerçek üretim ortamında kullanıcı verilerinin saklama ve silme politikaları açık biçimde tanımlanmalıdır.

## 14. Başlık ve tasarım standardı

Ana sayfanın hero başlığı **“İletişim engel tanımaz!”** biçimindedir. Diğer sayfa ve bölüm başlıklarının sonunda dekoratif nokta veya ünlem kullanılmaz. Bu kural yeni sayfalarda da korunmalıdır.

## 15. Geliştirme notu

Yeni bir özellik eklenirken mevcut klasör yapısına uyulmalı, ortak davranışlar tekrar edilmemeli ve servis gerektiren işlevler doğrudan sayfa bileşenlerinin içine gömülmemelidir. Backend entegrasyonu başladığında API/Supabase işlemlerinin `services/` altında ayrıştırılması önerilir.

---

**Sürüm:** 11.0.0  
**Proje:** SignBridge  
**Arayüz dili:** Türkçe  
**Durum:** Frontend prototipi / entegrasyona hazırlık
