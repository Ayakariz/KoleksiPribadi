# ✧ Koleksi Aya — Fanart & Cosplay Gallery

Koleksi pribadi fanart dan cosplay yang di-retweet/like.

## 🌐 Live Site
- **URL**: [ayakariz.my.id](https://ayakariz.my.id)

## 📁 Struktur
```
├── index.html          # Homepage (gallery)
├── style.css           # Styles
├── app.js              # Gallery logic
├── CNAME               # Custom domain
├── data/
│   └── gallery.json    # Metadata foto
├── images/
│   ├── cosplay/        # Foto cosplay
│   └── fanart/         # Foto fanart
└── admin/
    └── index.html      # Admin panel
```

## 🔧 Admin Panel
Akses admin di: `https://ayakariz.my.id/admin/`

Untuk menggunakan admin panel:
1. Buat GitHub Personal Access Token (PAT) dengan scope `repo`
2. Masukkan token dan nama repo di admin panel
3. Token disimpan di localStorage browser

## 🚀 Deploy
Repository ini otomatis deploy ke GitHub Pages setiap push ke `main`.

## 📝 Cara Upload
1. Buka admin panel
2. Masukkan GitHub token
3. Pilih kategori (Cosplay/Fanart)
4. Drag & drop foto (bisa bulk)
5. Isi source URL dan caption (opsional)
6. Klik Upload

---
*Dibuat dengan ♥ untuk komunitas fanart & cosplay*
