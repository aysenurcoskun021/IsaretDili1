# SignBridge – İşaret Dili Sözlük ve Çeviri Platformu

## Proje Hakkında

SignBridge, işaret dili kullanan bireyler ile işaret dili bilmeyen bireyler arasındaki iletişimi kolaylaştırmayı amaçlayan web tabanlı bir sözlük ve çeviri platformudur.

Proje; işaret dili öğrenimini desteklemeyi, iletişim engellerini azaltmayı ve erişilebilir bir dijital ortam oluşturmayı hedeflemektedir.

## Temel Özellikler

- **İşaret Dili Sözlüğü:** Kelimelerin aranması ve kategorilere göre incelenmesi.
- **Metinden İşarete Çeviri:** Girilen kelimelerin veritabanında aranarak ilgili işaret dili videolarıyla eşleştirilmesi.
- **Kullanıcı Sistemi:** Kayıt olma, giriş yapma ve şifre doğrulama işlemleri.
- **Video Entegrasyonu:** İşaret dili videolarının Cloudinary üzerinde depolanması ve bağlantılarının veritabanından alınması.

**Geliştirilmesi planlanan özellikler:** İşaretten metne çeviri, favoriler ve kullanıcıların iletişim kurabileceği sosyal etkileşim alanı.

## Kullanılan Teknolojiler

- **Frontend:** React, JavaScript, Vite, CSS, Tailwind CSS
- **Backend:** Python, FastAPI
- **Veritabanı:** Neon PostgreSQL
- **Veritabanı bağlantısı:** SQLAlchemy
- **Video depolama:** Cloudinary
- **API testleri:** Swagger UI
- **Versiyon kontrolü:** Git ve GitHub

## Sistem Mimarisi

SignBridge, frontend ve backend katmanlarının REST API üzerinden haberleştiği bir mimariyle geliştirilmiştir.

Kullanıcının girdiği metin React üzerinden FastAPI'ye gönderilir. Backend, metni kelimelere ayırarak Neon PostgreSQL veritabanındaki `sign_videos` tablosunda arama yapar. Bulunan videoların Cloudinary bağlantıları JSON formatında frontend'e iletilir.

Kullanıcı kayıt ve giriş işlemleri backend üzerinden gerçekleştirilir. Parolalar Argon2 algoritmasıyla hash'lenerek saklanır.

## Projenin Geliştirme Durumu

Neon PostgreSQL bağlantısı, kullanıcı kayıt ve giriş API'leri ve metinden işarete çeviri için video sorgulama işlemleri geliştirilmiş ve Swagger üzerinden test edilmiştir.

Frontend video oynatma entegrasyonu, içeriklerin genişletilmesi ve çift yönlü çeviri özellikleri üzerindeki çalışmalar devam etmektedir.

## Proje Ekibi

**Trakya Üniversitesi – Yönetim Bilişim Sistemleri Bölümü**

- **Seray Sert:** Backend geliştirme ve API entegrasyonu
- **Ayşenur Coşkun:** Frontend geliştirme ve kullanıcı arayüzü
- **Esra Genç:** Veritabanı tasarımı ve yönetimi

## Projenin Hedefi

SignBridge'in uzun vadeli hedefi, işaret dili sözlüğü, çeviri araçları ve sosyal etkileşim özelliklerini tek bir platformda birleştirerek daha erişilebilir ve kapsayıcı bir dijital iletişim ortamı oluşturmaktır.
