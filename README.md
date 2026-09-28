# Fıstıközü Web Sitesi

Yerel ortamda çalışacak statik web sitesi ve Cafe / Pastane QR menü altyapısı.

## Başlatma

```bash
npm start
```

Ana sayfa:

```text
http://localhost:4173
```

QR menü:

```text
http://localhost:4173/menu/
```

## Vercel Yayını

GitHub deposu `Azer0438/FISTIKOZU`, üretim dalı `main` olmalıdır.
Root Directory depo kökünde kalmalıdır; `menu` veya `public` seçilmemelidir.
`vercel.json` şu ayarları belirler:

- Framework Preset: Other
- Build Command: `npm run build`
- Output Directory: `public`

Yerel kontrol için `npm run check` ve `npm run build` çalıştırılır.
Yayın çıktısında `public/index.html`, `public/menu/index.html`, `public/assets/`
ve `public/data/` bulunmalıdır. Yayından sonra `/` ve `/menu/` adresleri kontrol edilir.

Yerel sunucu `scripts/dev-server.mjs` içindedir. Dosyayı kökte `server.mjs`
adıyla tutmak, Vercel'in projeyi Node sunucusu olarak algılamasına neden olabilir.
Yayında yalnızca statik `public` çıktısı kullanılır.

## İçerik Güncelleme

Şube, iletişim, ürün grubu ve QR menü ürünleri şu dosyadan güncellenir:

```text
data/site-data.js
```

QR menüdeki ürün satırları demo sunumu için fiyat alanı boş şekilde hazırlanmıştır. Gerçek fiyatlar geldiğinde aynı ürünlerde `price` alanı doldurulabilir veya ürün isimleri değiştirilebilir.

Şube görselleri de aynı dosyada her şubenin `image` alanından yönetilir. Yeni Sanayi için beklenen yol:

```text
assets/images/sube-yeni-sanayi.png
```

Ana sayfa hero görseli `data/site-data.js` içindeki `heroImage` alanından gelir ve `assets/images/baklava-hero.png` dosyasını kullanır. Yeni Sanayi fotoğrafı yalnızca ilgili şubenin görselidir.

QR kodlar ileride `/menu/` adresine yönlendirildiğinde, ürün ve fiyat değişikliklerinde QR kodu yeniden basmak gerekmez.
