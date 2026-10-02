# Fıstıközü Baklavaları

Türkçe statik web sitesi ve kalıcı `/menu/` QR menüsü. Mevcut HTML, CSS, JavaScript ve Node.js yapısı korunur; uygulama için ek paket kurulumu gerekmez.

## Çalıştırma

```sh
npm start
```

Ana sayfa: `http://localhost:4173/` · Menü: `http://localhost:4173/menu/`
Port doluysa `PORT` ortam değişkeni ile farklı port seçilir.

```sh
npm run check
npm test
npm run build
```

Build, `public/` içine sayfaları, görselleri, veri dosyalarını, robots.txt ve sitemap.xml dosyalarını çıkarır. Yapılandırılmış veriler HTML içine build sırasında yazılır. Yerel sunucu `scripts/dev-server.mjs` içinde kalmalıdır; köke `server.mjs` koymak Vercel'in projeyi Node uygulaması olarak algılamasına yol açabilir.

## İçerik Yönetimi

Şubeler, ana sayfa içeriği, iletişim ve sosyal bağlantılar `data/site-data.js` dosyasından yönetilir. QR menünün ürün ve kategorileri bağımsız `menu/data/catalog.js` dosyasındadır; ayrıntılar [menü dokümanında](menu/README.md). Sadece firma tarafından doğrulanmış gerçek bilgiler eklenmelidir. Boş alanlar ziyaretçiye gösterilmez.

### Menü

Kalıcı adres `/menu/` değişmez. QR menü, `menu/data/catalog.js` içindeki müşteri onaylı ürünleri, fiyatları ve içerik açıklamalarını kullanır; doğrulanmayan alanlar boş kalır. Eski `?demo=1` bağlantısı da gerçek kataloğu açar. Aşağıdaki eski tekil `category` şeması ana sayfa ürün bölümü içindir; QR içerik girişi için [menü dokümanını](menu/README.md) kullanın.

Kategori şeması (yalnızca dokümantasyon):

```js
{ id: "kategori-kimligi", name: "Firmanın verdiği kategori adı" }
```

Ürün şeması (yalnızca dokümantasyon):

```js
{
  id: "urun-kimligi",
  name: "Firmanın verdiği ürün adı",
  description: "",
  price: null,
  image: "",
  category: "kategori-kimligi",
  available: true,
  featured: false
}
```

- `category`, mevcut bir kategorinin `id` değeriyle eşleşmelidir.
- `price` zorunlu değildir. `null` veya boş metin olduğunda fiyat gösterilmez. Sayısal fiyatlar `menu.currency` para birimine göre Türkçe biçimlendirilir; onaylanmış metin fiyatları da desteklenir.
- `available: false` ürünü hem ana sayfadan hem menüden gizler. Ürünü olmayan kategoriler gösterilmez.
- `image` yoksa boş görsel kutusu oluşturulmaz. Yerel görsel yolu önerilir.
- `featured: true` ürünler ana sayfada öne çıkar. İşaretli ürün yoksa ilk altı görünür ürün kullanılır. Ürün yokken ana sayfa markanın görsel anlatımını korur.

### Şubeler

Her şube `id`, `slug`, `name`, `label`, `type`, `description`, `image`, `imageAlt`, `images`, `address`, `phone`, `phones`, `mapsUrl`, `mapEmbed`, `coordinates`, `workingHours`, `workingHoursText` ve `menuUrl` alanlarını destekler. `label` kısa şube adı; `type`, `bakery` veya `cafe` olabilir. Cafe / Pastane için `menuUrl: "/menu/"` ve mevcut `qrMenu: true` menü bağlantısını açar.

Ana sayfadaki kartlar `/subeler/[slug]/` adresine gider. Build sırasında aynı `subeler/index.html` şablonundan dört statik detay sayfası üretilir. Yeni bir şube eklemek için veri listesine benzersiz bir `slug` ile yeni kayıt eklemek yeterlidir.

- `phone` tek ana numarayı, `phones` birden fazla aranabilir numarayı destekler. Doğrulanmış `mapsUrl` girildiğinde **Yol Tarifi Al** otomatik görünür.
- Harita bağlantısı adres veya koordinatlardan tahmin edilmez.
- `mapEmbed`, doğrulanmış Google Maps gömme bağlantısıdır. Boşsa harita alanı gösterilmez.
- `images`, `{ src, alt }` nesnelerinden veya yerel görsel yollarından oluşabilir. Boşsa galeri bölümü gösterilmez.
- `address` boşsa `null` bırakılır. Gerçek bilgiler geldiğinde aşağıdaki nesne doldurulur. Görüntüleme için düz metin de desteklenir; LocalBusiness şeması için yapılandırılmış adres gerekir.

```js
address: {
  streetAddress: "",
  addressLocality: "",
  addressRegion: "",
  postalCode: "",
  addressCountry: ""
},
coordinates: null,
workingHours: []
```

Koordinat şeması: `{ latitude: sayi, longitude: sayi }`.
Çalışma saati şeması: `{ days: [], opens: "", closes: "" }`.
`days`, `Monday` ile `Sunday` arasındaki gün adlarını; saatler `HH:MM` biçimini kullanır. Arayüz günleri Türkçe gösterir.
Gün bilgisi henüz doğrulanmadıysa `workingHoursText` alanında yalnızca onaylanmış saat aralığı gösterilebilir; bu değer yapılandırılmış veriye çalışma günü olarak eklenmez.

Yeni Sanayi fotoğrafı sadece ilgili şubede kullanılır. Diğer şubelere fotoğraf veya boş fotoğraf alanı atanmaz. Logo orijinal JPEG dosyasıdır. Mevcut temsili baklava görseli hero ve lezzetler bölümünde kullanılır; gerçek Fıstıközü ürün fotoğrafı olarak etiketlenmez. WebP sürümleri aynı görselin optimize edilmiş kopyalarıdır; PNG kaynakları korunur.

### İletişim

`contact.email`, `contact.phone`, `contact.address` ve `socialLinks: [{ name, url }]` alanları gerçek bilgilerle doldurulur. Boş iletişim bilgileri veya sosyal hesaplar için yer tutucu gösterilmez.

## SEO ve Yayın

Canonical adresler ve `canonicalBase`, gelecekteki `https://www.fıstıközü.com.tr` alan adına hazırlanmıştır. HTML, alan adının standart ASCII/Punycode karşılığını kullanır. Bu ayarlar alan adını bağlamaz; mevcut yayın Vercel adresinde çalışır.

Organization ve WebSite şemaları hazırdır. Şubelere gerçek `streetAddress`, `addressLocality` ve `addressCountry` girildiğinde LocalBusiness alt türü eklenir; bilinmeyen telefon, koordinat veya saatler şemaya yazılmaz. Menü sayfasında yalnızca ilgili Cafe / Pastane şubesi için yerel işletme verisi eklenir.

Vercel ayarları: **Other**, Root Directory depo kökü, Build Command `npm run build`, Output Directory `public`. GitHub deposu `Azer0438/FISTIKOZU`, üretim dalı `main`.

Yeni veri veya görseller eklendikten sonra kontrolleri ve build'i çalıştırın. GitHub'a push yapılınca Vercel otomatik yayınlar. `/menu/` adresi korunur; menü güncellemeleri QR kodunun yeniden basılmasını gerektirmez.

## Görsel Kaynakları

Arayüz ikonları Lucide'dan alınmıştır; lisansı `assets/icons/LICENSE.txt` dosyasındadır. Harici font veya tarayıcıda çalışan yeni bir kütüphane eklenmemiştir.
