# EcoPulse | Haberler ve Eylem

Sürdürülebilirlik odaklı haber ve eylem uygulaması.

---

## Netlify ile Canlı Yayın

### 1. GitHub'a Yükle

Projeyi bir GitHub reposuna yükle (henüz yüklemediysen):

```bash
git init
git add .
git commit -m "EcoPulse ilk commit"
git branch -M main
git remote add origin https://github.com/KULLANICI_ADIN/repo-adı.git
git push -u origin main
```

### 2. Netlify'da Site Oluştur

1. [netlify.com](https://www.netlify.com) adresine git ve giriş yap
2. **Add new site** → **Import an existing project**
3. **GitHub** ile bağlan ve bu repoyu seç
4. **Build settings** otomatik algılanacak (netlify.toml sayesinde)
5. **Deploy site** tıkla

### 3. API Anahtarını Ekle

1. Netlify dashboard → **Site settings** → **Environment variables**
2. **Add a variable** → **Add a single variable**
3. **Key:** `NEWSDATA_API_KEY`
4. **Value:** NewsData.io'dan aldığın API anahtarı ([newsdata.io](https://newsdata.io/) üzerinden ücretsiz alabilirsin)
5. **Save**
6. **Deploys** sekmesine git → **Trigger deploy** → **Deploy site** (yeni değişkenlerin etkili olması için)

---

## Yerel Geliştirme

Node.js kuruluysa:

```bash
# Bağımlılıkları yükle
npm install

# .env oluştur ve API anahtarını ekle
copy .env.example .env
# .env içinde NEWSDATA_API_KEY=... yaz

# Sunucuyu başlat
npm start
```

Tarayıcıda `http://localhost:3000` aç.

---

## Proje Yapısı

| Dosya / Klasör | Açıklama |
|----------------|----------|
| `index.html` | Ana sayfa |
| `netlify/functions/get-news.js` | Haber API proxy (Netlify Function) |
| `netlify.toml` | Netlify yapılandırması |
| `server.js` | Yerel geliştirme sunucusu (opsiyonel) |
