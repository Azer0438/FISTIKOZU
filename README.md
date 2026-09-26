# Fıstıközü Web Sitesi

Yerel ortamda çalışacak statik web sitesi ve Cafe / Pastane QR menü altyapısı.

## Başlatma

```bash
node server.mjs
```

Ana sayfa:

```text
http://localhost:4173
```

QR menü:

```text
http://localhost:4173/menu/
```

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

Ana sayfa hero görseli `data/site-data.js` içindeki `heroImage` alanından gelir. Yeni Sanayi görseli dosyası eklenene kadar site otomatik demo baklava görseline düşer.

QR kodlar ileride `/menu/` adresine yönlendirildiğinde, ürün ve fiyat değişikliklerinde QR kodu yeniden basmak gerekmez.
