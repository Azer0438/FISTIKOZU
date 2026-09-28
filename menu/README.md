# Fıstıközü QR Menü

Ana siteden bağımsız HTML/CSS/JavaScript modülü. Yeni çalışma zamanı bağımlılığı yoktur. Ana sayfanın HTML, CSS, JavaScript ve verileri bu revizyonda değiştirilmez.

## Adresler

- Gerçek menü: `/menu/`
- Açıkça etiketli örnek önizleme: `/menu/?demo=1`
- Şube bağlamı: `/menu/?branch=organize` (diğerleri: `sehir-hastanesi`, `yeni-sanayi`, `cafe-pastane`; `cafe` takma adı desteklenir)
- Masa bağlamı: `/menu/?branch=organize&table=12`
- Kategori: `/menu/#kategori/kategori-kimligi`

Kategori geçişleri query parametrelerini korur. Yenileme, tarayıcı geri/ileri ve bağlantıyla kategori açma desteklenir. Fiziksel QR için temel adres `/menu/` olarak kalır. Şube bazlı alt yollar henüz oluşturulmaz; şimdilik query parametresi yeterlidir. Masa parametresi yalnızca doğrulanıp okunur; sipariş, sepet veya takip işlemi yapılmaz.

## Gerçek İçeriği Ekleme

Tek içerik kaynağı: **`data/site-data.js` dosyasındaki `menu.categories` ve `menu.products`**.
Mevcut boş diziler korunmuştur. Örnek veriler ayrı `menu/data/demo-data.js` dosyasında bulunur, sadece `demo=1` seçildiğinde yüklenir. Normal menüde ve ana sayfada demo ürün/fiyat görünmez.

Kategori şeması (gerçek veri değildir):

```js
{
  id: "kategori-kimligi",
  name: "Firmanın verdiği kategori adı",
  slug: "kategori-kimligi",
  image: "/menu/images/gercek-kategori.webp",
  order: 1,
  active: true
}
```

Ürün şeması (gerçek veri değildir):

```js
{
  id: "urun-kimligi",
  name: "Firmanın verdiği ürün adı",
  slug: "urun-kimligi",
  categories: ["kategori-kimligi"],
  category: "kategori-kimligi",
  description: "",
  price: null,
  image: "",
  ingredients: [],
  available: true,
  featured: false,
  order: 1
}
```

- `categories` birden fazla kategori kimliği alabilir. Global aramada ürün yalnızca bir kez görünür.
- Eski `category` tekil alanı da desteklenir. Ana sitenin mevcut ürün bölümünü beslemek için `category` alanına ana kategori kimliği yazılır; QR menü çoklu kategori için `categories` alanını tercih eder.
- Kategori URL'si değişmez `id` ile üretilir. İsim/slug değişimi kayıtlı bağlantıyı bozmaz.
- Küçük `order` önce gelir. Sıra verilmezse mevcut dizi sırası korunur.
- `active: false` kategoriyi gizler. Görünür ürünü olmayan kategoriler gösterilmez.
- `price: null` fiyatı gizler, `0` geçerli fiyattır. Formatlama ortak `assets/content.js` yardımcısını kullanır.
- `description` isteğe bağlıdır. Listede iki satır, detay penceresinde tam metin gösterilir.
- `ingredients` isteğe bağlı metin veya metin dizisidir; yalnızca doğrulanmış bilgi girilir.
- Ürün ve kategori görseli yoksa veya yüklenemezse orijinal logo gösterilir. Görseller sabit oranlıdır; ürün görselleri lazy load edilir.
- `id` alanları kendi dizilerinde benzersiz olmalıdır.

## Menü ve Şube Ayarları

**`menu/data/menu-data.js`** içindeki `settings.unavailableMode`:

- `"hide"`: `available: false` olan ürünü gizler (varsayılan).
- `"show"`: ürünü "Geçici olarak mevcut değil" bilgisiyle gösterir; detayları incelenebilir.

Ürün/kategoride isteğe bağlı `branchIds: ["organize"]` yalnızca bu şubede gösterir. Alan yoksa tüm şubelerde ortak kullanılır. Boş dizi hiçbir şubede göstermez.

Şube ayarı örneği (gerçek veri değildir):

```js
branchOverrides: {
  organize: {
    products: {
      "urun-kimligi": { price: null, available: true, hidden: false }
    },
    categories: {
      "kategori-kimligi": { active: false }
    }
  }
}
```

Fiyat geçersiz kılınmazsa ortak fiyat kullanılır. `null` o şubede fiyatı gizler. `hidden: true`, bulunabilirlik ayarından bağımsız kesin gizlemedir. Bilinmeyen şube parametresi varsayılan Cafe / Pastane'ye döner.

## Dosyalar ve Kontroller

- `index.html`: semantik kabuk, meta bilgileri ve native dialog'lar.
- `menu.css`: yalnızca QR sayfasının bağımsız stilleri.
- `app.js`: arama, gezinme, detay, odak yönetimi ve parametreler.
- `components.js`: kategori kartı, ürün kartı, görsel yedeği, detay.
- `utils/catalog.js`: saf veri filtreleme, sıralama, şube ve kategori çözümleme.
- `data/menu-data.js`: gerçek veri kaynağını kullanan menü ayarları.
- `data/demo-data.js`: gerçek menüye karışmayan örnek veri.
- `../tests/qr-menu.test.mjs`: veri, route, bağımsızlık ve syntax testleri.

`npm start` ile `http://localhost:4173/menu/?demo=1` açılır. `npm test` mevcut ve yeni testleri çalıştırır; `npm run build` menü klasörünü mevcut statik yayın yapısına dahil eder.

Demo için yerleşik image_gen aracıyla üretilen görseller: `menu/images/demo-coffee.webp` ve `menu/images/demo-cake.webp`. Tam üretim istemleri ve kaynak notları `images/README.md` içindedir. Baklava önizlemesi projedeki mevcut temsili görseldir. Hiçbiri gerçek ürün fotoğrafı olduğu iddiasıyla etiketlenmez.
